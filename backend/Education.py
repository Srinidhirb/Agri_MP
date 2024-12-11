from flask import Flask, render_template, request, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# List of agriculture-related keywords (expand as necessary)
agriculture_keywords = [
    "agriculture", "farming", "crops", "sustainable farming", "agriculture technology", 
    "precision farming", "organic farming", "plant breeding", "agriculture innovations", 
    "agriculture machinery", "irrigation", "agricultural research", "agriculture practices"
]

def is_agriculture_related(keyword):
    return any(agri_keyword in keyword.lower() for agri_keyword in agriculture_keywords)

def search_youtube_videos(keyword, api_key, sort_by="views"):
    search_url = "https://www.googleapis.com/youtube/v3/search"
    search_params = {
        "part": "snippet",
        "q": keyword,
        "type": "video",
        "maxResults": 30,
        "key": api_key
    }
    search_response = requests.get(search_url, params=search_params)
    
    if search_response.status_code != 200:
        print("Failed to retrieve videos")
        return []

    videos = search_response.json().get("items", [])
    video_ids = [video["id"]["videoId"] for video in videos]
    
    stats_url = "https://www.googleapis.com/youtube/v3/videos"
    stats_params = {
        "part": "statistics",
        "id": ",".join(video_ids),
        "key": api_key
    }
    stats_response = requests.get(stats_url, params=stats_params)
    
    if stats_response.status_code != 200:
        print("Failed to retrieve video statistics")
        return []

    videos_with_stats = []
    for item in stats_response.json().get("items", []):
        stats = item["statistics"]
        video_data = {
            "id": item["id"],
            "url": f"https://www.youtube.com/embed/{item['id']}",
            "views": int(stats.get("viewCount", 0)),
            "likes": int(stats.get("likeCount", 0)),
            "comments": int(stats.get("commentCount", 0)),
        }
        videos_with_stats.append(video_data)

    # Sorting logic based on user-selected criteria
    if sort_by == "views":
        videos_with_stats.sort(key=lambda x: x["views"], reverse=True)
    elif sort_by == "likes":
        videos_with_stats.sort(key=lambda x: x["likes"], reverse=True)
    elif sort_by == "comments":
        videos_with_stats.sort(key=lambda x: x["comments"], reverse=True)

    return [video["url"] for video in videos_with_stats]

@app.route('/api/videos', methods=['GET', 'POST'])
def get_videos():
    api_key = "AIzaSyACXb4bpzDtU0IJOq4_PU0mo6-w3Q_0a-8"  # Replace with your YouTube Data API key
    keyword = request.args.get('keyword', 'agriculture')
    sort_by = request.args.get('sort', 'views')
    
    if not is_agriculture_related(keyword):
        keyword = 'agriculture'
    
    video_urls = search_youtube_videos(keyword, api_key, sort_by=sort_by)
    return jsonify({"video_urls": video_urls, "keyword": keyword})

if __name__ == '__main__':
    app.run(debug=True, port=5003)
