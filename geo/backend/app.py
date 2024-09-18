import matplotlib
matplotlib.use('Agg')  # Use a non-interactive backend

import numpy as np
from flask import Flask, jsonify, render_template, send_file
from flask_jwt_extended import JWTManager
from config import Config
from controllers.user_controller import user_bp
from flask_cors import CORS
import pandas as pd
from sklearn.cluster import KMeans
import folium
import seaborn as sns
import matplotlib.pyplot as plt
import os

app = Flask(__name__)
CORS(app)
app.config.from_object(Config)
jwt = JWTManager(app)

# Replace with your CSV path
csv_path = 'csv/Mumbai_NaviMumbai.csv'

def convert_nan_to_none(value):
    """ Convert NaN values to None for JSON serialization """
    if pd.isna(value):
        return None
    return value

# Function to perform clustering and map generation
def perform_clustering_and_mapping(csv_path):
    # Load the CSV file
    df = pd.read_csv(csv_path)
    
    # Clean up data (assuming these columns exist in the CSV)
    df.drop(['Phone', 'Phones', 'Claimed', 'Review URL', 'Website', 'Domain', 
             'Cid', 'Place Id', 'Kgmid', 'Plus code', 'Google Knowledge URL', 
             'Email', 'Social Medias', 'Facebook', 'Instagram', 'Twitter', 'Yelp'], axis=1, inplace=True)
    df.drop(df.columns[df.columns.str.contains('^Unnamed')], axis=1, inplace=True)
    df.dropna(inplace=True)
    
    # Make cluster on the basis of Latitude and Longitude
    X = df[['Latitude', 'Longitude']]
    
    # Define the number of clusters
    kmeans = KMeans(n_clusters=11, random_state=0)
    df['cluster'] = kmeans.fit_predict(X)
    
    # Convert NaN values to None
    df = df.apply(lambda x: x.map(convert_nan_to_none))
    
    # Define a color map for different amenities
    entity_colors = {
        'College': 'red',
        'Garden': 'green',
        'Gym': 'blue',
        'Hospital': 'orange',
        'Hotel': 'purple',
        'Market': 'gray',
        'Pharmacy': 'pink',
        'Restaurant': 'yellow',
        'School': 'white',
        'Supermarket': 'magenta',
        'Touristattraction': 'cyan'
    }

    # Create a map with no specific location (we will set bounds later)
    m = folium.Map(zoom_start=10)

    # List to store all coordinates for setting the map bounds later
    locations = []

    # Add points to the map with custom icons and colors
    for idx, row in df.iterrows():
        amenity = row['Categories']
        color = entity_colors.get(amenity, 'gray')  # Default to gray if not found in entity_colors
        location = [row['Latitude'], row['Longitude']]
        locations.append(location)  # Collect coordinates for setting bounds
        
        folium.CircleMarker(
            location=location,
            radius=8,  # Adjust the size of the dot as needed
            color=color,
            fill=True,
            fill_color=color,
            fill_opacity=0.7,
            popup=f"{amenity} (Cluster {row['cluster']})"
        ).add_to(m)

    # Automatically adjust the zoom to fit all markers (use the bounds of all locations)
    m.fit_bounds(locations)

    # Add a legend to the map using HTML and CSS
    legend_html = '''
     <div style="position: fixed ; 
     bottom: 50px; left: 50px; width: 150px; height: 280px; 
     background-color: white; z-index:9999; font-size:14px;
     border:2px solid grey; padding: 10px;">
     <strong>Amenities</strong><br>
     <i style="background:red; width: 12px; height: 12px; float: left; margin-right: 5px;"></i> College<br>
     <i style="background:green; width: 12px; height: 12px; float: left; margin-right: 5px;"></i> Garden<br>
     <i style="background:blue; width: 12px; height: 12px; float: left; margin-right: 5px;"></i> Gym<br>
     <i style="background:orange; width: 12px; height: 12px; float: left; margin-right: 5px;"></i> Hospital<br>
     <i style="background:purple; width: 12px; height: 12px; float: left; margin-right: 5px;"></i> Hotel<br>
     <i style="background:gray; width: 12px; height: 12px; float: left; margin-right: 5px;"></i> Market<br>
     <i style="background:pink; width: 12px; height: 12px; float: left; margin-right: 5px;"></i> Pharmacy<br>
     <i style="background:yellow; width: 12px; height: 12px; float: left; margin-right: 5px;"></i> Restaurant<br>
     <i style="background:white; border: 1px solid black; width: 12px; height: 12px; float: left; margin-right: 5px;"></i> School<br>
     <i style="background:magenta; width: 12px; height: 12px; float: left; margin-right: 5px;"></i> Supermarket<br>
     <i style="background:cyan; width: 12px; height: 12px; float: left; margin-right: 5px;"></i> Tourist Attraction<br>
     </div>
    '''
    # Add legend to the map
    m.get_root().html.add_child(folium.Element(legend_html))

    # Save the map to the templates directory
    map_save_path = 'templates/map.html'
    m.save(map_save_path)

    return df.to_dict(orient='records'), map_save_path

@app.route('/clusters', methods=['GET'])
def get_clusters():
    # Call the clustering and mapping function
    clustered_data, map_html_path = perform_clustering_and_mapping(csv_path)
    
    # Return clustered data as JSON
    return jsonify(clustered_data)

@app.route('/map')
def render_map():
    # Render the map template
    return render_template('map.html')

@app.route('/scatterplot')
def get_scatterplot():
    # Load the CSV data
    df = pd.read_csv(csv_path)
    
    # Select Latitude and Longitude for clustering
    X = df[['Latitude', 'Longitude']]
    
    # Define and fit KMeans with 11 clusters
    kmeans = KMeans(n_clusters=11, random_state=0)
    df['cluster'] = kmeans.fit_predict(X)
    
    # Create the scatter plot
    plt.figure(figsize=(5, 6))
    sns.scatterplot(data=df, x='Longitude', y='Latitude', hue='cluster', palette='tab10')
    plt.title('K-means Clustering of Mumbai Entities')
    plt.xlabel('Longitude')
    plt.ylabel('Latitude')
    
    # Ensure the 'static' directory exists
    static_dir = os.path.join(os.getcwd(), 'static')
    if not os.path.exists(static_dir):
        os.makedirs(static_dir)
    
    # Save the plot to the 'static' folder
    plot_path = os.path.join(static_dir, 'scatter_plot.png')
    plt.savefig(plot_path)
    plt.close()
    
    # Return the plot image
    return send_file(plot_path, mimetype='image/png')

# Register Blueprints
app.register_blueprint(user_bp)

if __name__ == '__main__':
    app.run(debug=True)
