# SPOTIFǐnd

Machine Learning-Powered Song Recommendation System to enhance and complete playlists by intelligently recommending tracks that match style, mood, and theme.


## Required Datasets for each Notebook & Remarks

The following table outlines the sequence of notebooks used in this project, along with their input/output datasets and relevant remarks:

| Notebook                                | Required Datasets                                                                 | Output Datasets                                                                                      | Remarks                                                                                                                                     |
|-----------------------------------------|-----------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| `step_1_data_collection.ipynb`                | -                                                                                 | `track_raw.parquet`<br>`playlist_raw.parquet`                                                        | Unable to run; results have been pre-stored into `track_raw.parquet` and `playlist_raw.parquet`.                                           |
| `step_2a_data_cleaning_tracks.ipynb`         | `track_raw.parquet`                                                               | `track_cleaned.parquet`                                                                              | -                                                                                                                                           |
| `step_2b_data_cleaning_playlists.ipynb`      | `playlist_raw.parquet`                                                            | `playlist_cleaned.parquet`                                                                           | -                                                                                                                                           |
| `step_3a_feature_engineering_tracks.ipynb`   | `playlist_cleaned.parquet`<br>`track_cleaned.parquet`<br>`final_sentiment_scores.csv`<br>`final_genre_scores.csv` | `track_final.parquet`                                                                                 | Do not run audio clustering and sentiment analysis on lyrics. Precomputed results are stored in `final_sentiment_scores.csv` & `final_genre_scores.csv`. |
| `step_3b_feature_engineering_playlists.ipynb`| `track_final.parquet`<br>`playlist_cleaned.parquet`                               | `playlist_diversity.parquet`<br>`playlist_feature_engineering_unweighted.parquet`<br>`playlist_feature_engineering_weighted.parquet` | - |
| `step_4_playlist_segmentation.ipynb`         | `playlist_diversity.parquet`                                                      | `playlist_segmentation.csv`                                                                          | -                                                                                                                                           |
| `step_5_data_splitting.ipynb`                | `playlist_feature_engineering_unweighted.parquet`<br>`playlist_feature_engineering_weighted.parquet`<br>`playlist_segmentation.csv` | `playlist_final_unweighted.csv`<br>`playlist_final_weighted.csv`                                     | -                                                                                                                                           |
| `step_6a_base_models_development.ipynb`      | `playlist_final_unweighted.csv`<br>`playlist_final_weighted.csv`<br>`track_final.parquet` | `recommendations_for_all_models.csv`                                                                 | -                                                                                                                                           |
| `step_6b_base_models_analysis.ipynb`         | `recommendations_for_all_models.csv`                                              | -                                                                                                     | -                                                                                                                                           |
| `step_7a_hybrid_model_basic_development.ipynb`| `recommendations_for_all_models.csv`<br>`playlist_final_unweighted.csv`<br>`track_final.parquet` | `recommendations_for_all_models_with_hybrid.csv`                                                     | -                                                                                                                                           |
| `step_7b_hybrid_model_basic_analysis.ipynb`  | `recommendations_for_all_models_with_hybrid.csv`<br>`track_final.parquet`<br>`playlist_final_unweighted.csv` | -                                                                                                     | -                                                                                                                                           
| `step_7c_hybrid_model_econometrics_analysis.ipynb`  | `playlist_final_unweighted.csv`<br>`scores_for_econometrics.csv`                 | -                                                                                                     | - |-                                                                                                                                           |-
| `step_8a_hybrid_model_final_development.ipynb`| `track_final.parquet`<br>`playlist_final_unweighted.csv`                           | `final_recommendations.csv`                                                                          | -                                                                                                                                           |
| `step_8b_hybrid_model_final_analysis.ipynb`  | `final_recommendations.csv`                                                       | -                                                                                                     | -                                                                                                                                           |

## To Run the Notebooks
The Google drive containing the link can be found here: <br>
https://drive.google.com/drive/folders/1f7CDILck9l_GlDWCamvcv2yV-VO0899L?usp=sharing

The code to mount the Google Drive is in the second cell of every notebook. Please adjust the BASE_DIR or DATA_PATH accordingly to your own Google Drive Path.

## Flow of Notebooks
The steps follows the order of the notebook, as described by the name of the notebook. 

Elaborations for notebooks from Step 6 onwards: <br>
`step_6a_base_models_development.ipynb` : Development of the base models (Content-Based Model, Collaborative Filtering) <br>
`step_6b_base_models_analysis.ipynb`: Level 1, 2, 3 Analysis of the base models, experiments and comparison within clusters <br>
`step_7a_hybrid_model_basic_development.ipynb`: Development of the hybrid model (Content-Based Model & Collaborative Filtering) <br>
`step_7b_hybrid_model_basic_analysis.ipynb`: Level 4, 5 Analysis of the hybrid model and comparison within clusters <br>
`step_7c_hybrid_model_econometrics_analysis.ipynb`: Econometrics analysis of the results <br>
`step_8a_hybrid_model_final_development.ipynb`: Level 6 Final development of the hybrid model with specific weights for each cluster <br>
`step_8b_hybrid_model_final_analysis.ipynb`: Final interpretation of the results
