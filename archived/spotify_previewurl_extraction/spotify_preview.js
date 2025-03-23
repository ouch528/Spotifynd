const axios = require('axios');
const cheerio = require('cheerio');

// Convert a Spotify URI (spotify:track:...) into a full Spotify URL
function convertSpotifyUriToUrl(track_uri) {
  const match = track_uri.match(/^spotify:track:([a-zA-Z0-9]{22})$/);
  if (match) {
    return `https://open.spotify.com/track/${match[1]}`;
  }
  throw new Error('Invalid Spotify URI format');
}

async function getSpotifyLinks(url, retryCount = 3, delay = 5000) {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const scdnLinks = new Set();

    $('*').each((i, element) => {
      const attrs = element.attribs;
      Object.values(attrs).forEach(value => {
        if (value && value.includes('p.scdn.co')) {
          scdnLinks.add(value);
        }
      });
    });

    return Array.from(scdnLinks);
  } catch (error) {
    if (error.response && error.response.status === 429 && retryCount > 0) {
      console.warn(`Rate limit hit. Retrying in ${delay / 1000} seconds...`);
      await new Promise(res => setTimeout(res, delay));
      return getSpotifyLinks(url, retryCount - 1, delay * 2); // Exponential backoff
    }
    throw new Error(`Failed to fetch preview URLs: ${error.message}`);
  }
}


// For a given track input, return an object with track name, Spotify URL and preview URLs
async function getPreviewLinksFromInput(input) {
  const { track_uri, track_name } = input;
  try {
    if (!track_uri) {
      throw new Error('Track URI is required');
    }
    const trackUrl = convertSpotifyUriToUrl(track_uri);
    const previewUrls = await getSpotifyLinks(trackUrl);
    if (previewUrls.length === 0) {
      return {
        track_name: track_name || null,
        track_uri,
        previewUrls: [],
        error: 'No preview URLs found'
      };
    }
    return {
      track_name: track_name || null,
      track_uri,
      previewUrls
    };
  } catch (error) {
    return {
      track_name: track_name || null,
      track_uri,
      error: error.message,
      previewUrls: []
    };
  }
}

// Process tracks concurrently with a controlled concurrency limit
async function processTracksConcurrently(tracks, concurrencyLimit = 5) {
  const results = [];
  let index = 0;
  const executing = [];

  for (const track of tracks) {
    const p = getPreviewLinksFromInput(track).then(result => {
      results[index] = result; // preserve order if needed
    });
    index++;

    executing.push(p);

    // When the number of executing promises reaches the limit, wait for one to finish.
    if (executing.length >= concurrencyLimit) {
      await Promise.race(executing);
      // Remove resolved promises from the executing array.
      for (let i = executing.length - 1; i >= 0; i--) {
        if (executing[i].isFulfilled || executing[i].isResolved) {
          executing.splice(i, 1);
        }
      }
    }
  }
  await Promise.all(executing);
  return results;
}

// A helper to wrap a promise and mark it when resolved
function markPromise(promise) {
  promise.isResolved = false;
  promise.then(() => {
    promise.isResolved = true;
  }).catch(() => {
    promise.isResolved = true;
  });
  return promise;
}

// Wrap getPreviewLinksFromInput calls using markPromise so we can remove them from the pool
async function processTracksConcurrentlyWithMark(tracks, concurrencyLimit = 5) {
  const results = [];
  let index = 0;
  const executing = [];

  for (const track of tracks) {
    const currentIndex = index; // capture current index for this iteration
    const p = markPromise(
      getPreviewLinksFromInput(track).then(result => {
        results[currentIndex] = result;
      })
    );
    index++;
    executing.push(p);
  
    if (executing.length >= concurrencyLimit) {
      await Promise.race(executing);
      // Filter out finished promises
      for (let i = executing.length - 1; i >= 0; i--) {
        if (executing[i].isResolved) {
          executing.splice(i, 1);
        }
      }
    }
  }
  

  // for (const track of tracks) {
  //   const p = markPromise(
  //     getPreviewLinksFromInput(track).then(result => {
  //       results[index] = result;
  //     })
  //   );
  //   index++;
  //   executing.push(p);

  //   if (executing.length >= concurrencyLimit) {
  //     await Promise.race(executing);
  //     // Filter out the finished promises
  //     for (let i = executing.length - 1; i >= 0; i--) {
  //       if (executing[i].isResolved) {
  //         executing.splice(i, 1);
  //       }
  //     }
  //   }
  // }
  await Promise.all(executing);
  return results;
}

// Read JSON input from stdin and process each track concurrently
function readStdin() {
  return new Promise((resolve, reject) => {
    let input = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', chunk => {
      input += chunk;
    });
    process.stdin.on('end', () => {
      try {
        const data = JSON.parse(input);
        resolve(data);
      } catch (err) {
        reject(new Error('Invalid JSON input'));
      }
    });
    process.stdin.on('error', reject);
  });
}

(async function main() {
  try {
    // Expect input as an array of objects; each should have a "track_uri" and "track_name" property.
    const tracks = await readStdin();
    // Adjust the concurrencyLimit (e.g., 5 or 10) to maximize speed without overloading the server
    const concurrencyLimit = 5;
    const results = await processTracksConcurrentlyWithMark(tracks, concurrencyLimit);
    // Write the result as JSON to stdout
    process.stdout.write(JSON.stringify(results));
  } catch (error) {
    process.stderr.write(error.message);
    process.exit(1);
  }
})();
