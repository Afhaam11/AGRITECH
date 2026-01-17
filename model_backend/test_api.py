import requests
import json

# The URL where your Flask app is running
API_URL = "http://localhost:5000/predict"

# The path to the image you want to test
# !!! IMPORTANT: Change this to the actual path of a test image on your computer !!!
IMAGE_PATH = "C:/Users/ashish k amin/Downloads/unknnown.jpg"

try:
    # Open the image file in binary mode
    with open(IMAGE_PATH, 'rb') as image_file:
        # The key 'image' must match the one in your Flask app: request.files['image']
        files = {'image': image_file}
        
        print(f"Sending '{IMAGE_PATH}' to the server for prediction...")
        
        # Send the POST request
        response = requests.post(API_URL, files=files)
        
        # Check if the request was successful
        if response.status_code == 200:
            prediction_data = response.json()
            print("\n✅ Prediction Successful!")
            print(f"   Result: {prediction_data['result']}")
            
            # Print probabilities
            probs = prediction_data['probs']
            class_names = ['bacterial_leaf_blight', 'brown_spot', 'healthy', 'leaf_blast', 'leaf_scald', 'narrow_brown_spot']
            
            print("\n   Probabilities:")
            for i, prob in enumerate(probs):
                print(f"   - {class_names[i]:<25}: {prob:.4f}")

        else:
            print(f"\n❌ Error: Server returned status code {response.status_code}")
            print(f"   Response: {response.text}")

except FileNotFoundError:
    print(f"\n❌ Error: The file was not found at '{IMAGE_PATH}'")
    print("   Please update the IMAGE_PATH variable in the script.")
except requests.ConnectionError:
    print("\n❌ Error: Could not connect to the server.")
    print("   Is your 'app.py' Flask server running in another terminal?")