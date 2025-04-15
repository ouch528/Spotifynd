# SPOTIFǐnd

Machine Learning-Powered Song Recommendation System to enhance and complete playlists by intelligently recommending tracks that match style, mood, and theme.



# Required Datasets for Each Notebook & Remarks


## Data Collection
`step_1_data_collection.ipynb`
* Description: Data collection through multiple sources
* Required Datasets:
    * (None)
* Output Datasets:
    * track_raw.parquet
    * playlist_raw.parquet
* *<span style="text-decoration:underline;">Remarks: Unable to run; results have been pre-stored into track_raw.parquet and playlist_raw.parquet.</span>*

## Data Cleaning
`step_2a_data_cleaning_tracks.ipynb`
* Description: Data cleaning of the collected data for tracks
* Required Datasets:
    * track_raw.parquet
* Output Datasets:
    * track_cleaned.parquet

`step_2b_data_cleaning_playlists.ipynb`
* Description: Data cleaning of the collected data for playlists
* Required Datasets:
    * playlist_raw.parquet
* Output Datasets:
    * playlist_cleaned.parquet

## Feature Engineering

`step_3a_feature_engineering_tracks.ipynb`
* Description: Feature engineering of tracks data
* Required Datasets:
    * playlist_cleaned.parquet
    * track_cleaned.parquet
    * final_sentiment_scores.csv
    * final_genre_scores.csv
* Output Datasets:
    * track_final.parquet
* *<span style="text-decoration:underline;">Remarks: Do not run audio clustering and sentiment analysis on lyrics. Precomputed results are stored in final_sentiment_scores.csv and final_genre_scores.csv.</span>*

`step_3b_feature_engineering_playlists.ipynb`
* Description: Feature engineering of playlists data
* Required Datasets:
    * track_final.parquet
    * playlist_cleaned.parquet
* Output Datasets:
    * playlist_diversity.parquet
    * playlist_feature_engineering_unweighted.parquet
    * playlist_feature_engineering_weighted.parquet

`step_4_playlist_segmentation.ipynb`
* Description: Playlist segmentation using playlist diversity
* Required Datasets:
    * playlist_diversity.parquet
* Output Datasets:
    * playlist_segmentation.csv

## Model Development

`step_5_data_splitting.ipynb`
* Description: Train-test split for development of model
* Required Datasets:
    * playlist_feature_engineering_unweighted.parquet
    * playlist_feature_engineering_weighted.parquet
    * playlist_segmentation.csv
* Output Datasets:
    * playlist_final_unweighted.csv
    * playlist_final_weighted.csv

`step_6a_base_models_development.ipynb`
* Description: Base model development
* Required Datasets:
    * playlist_final_unweighted.csv
    * playlist_final_weighted.csv
    * track_final.parquet
* Output Datasets:
    * recommendations_for_all_models.csv

`step_6b_base_models_analysis.ipynb`
* Description: Analysis on the base models with explanations
* Required Datasets:
    * recommendations_for_all_models.csv
* Output Datasets:
    * (None)

`step_7a_hybrid_model_basic_development.ipynb`
* Description: Hybrid model development using default weights
* Required Datasets:
    * recommendations_for_all_models.csv
    * playlist_final_unweighted.csv
    * track_final.parquet
* Output Datasets:
    * recommendations_for_all_models_with_hybrid.csv

`step_7b_hybrid_model_basic_analysis.ipynb`
* Description: Analysis on hybrid model with explanations
* Required Datasets:
    * recommendations_for_all_models_with_hybrid.csv
    * track_final.parquet
    * playlist_final_unweighted.csv
* Output Datasets:
    * scores_for_econometrics.csv

`step_7c_hybrid_model_econometrics_analysis.ipynb`
* Description: Econometrics analysis on results to gain deep business insights
* Required Datasets:
    * playlist_final_unweighted.csv
    * scores_for_econometrics.csv
* Output Datasets:
    * (None)

`step_8a_hybrid_model_final_development.ipynb`
* Description: Hybrid model development using cluster-specific weights
* Required Datasets:
    * track_final.parquet
    * playlist_final_unweighted.csv
* Output Datasets:
    * final_recommendations.csv


`step_8b_hybrid_model_final_analysis.ipynb`
* Description: Final interpretation of the results 
* Required Datasets:
    * final_recommendations.csv
* Output Datasets:
    * (None)

# Flow of Notebooks

Elaborations for notebooks from Step 6 onwards:
* `step_6a_base_models_development.ipynb` : Development of the base models (Content-Based Model, Collaborative Filtering)
* `step_6b_base_models_analysis.ipynb`: Level 1, 2, 3 Analysis of the base models, experiments and comparison within clusters
* `step_7a_hybrid_model_basic_development.ipynb`: Development of the hybrid model (Content-Based Model & Collaborative Filtering)
* `step_7b_hybrid_model_basic_analysis.ipynb`: Level 4, 5 Analysis of the hybrid model and comparison within clusters
* `step_7c_hybrid_model_econometrics_analysis.ipynb`: Econometrics analysis of the results
* `step_8a_hybrid_model_final_development.ipynb`: Level 6 Final development of the hybrid model with specific weights for each cluster
* `step_8b_hybrid_model_final_analysis.ipynb`: Final interpretation of the results


# To Run the Notebook

The Google drive containing the datasets can be found here:

[https://drive.google.com/drive/folders/1f7CDILck9l_GlDWCamvcv2yV-VO0899L?usp=sharing](https://drive.google.com/drive/folders/1f7CDILck9l_GlDWCamvcv2yV-VO0899L?usp=sharing)

The code to mount the Google Drive is in the second cell of every notebook. Please adjust the BASE_DIR or DATA_PATH (some notebook uses BASE_DIR, some others uses DATA_PATH) according to your own Google Drive Path.
