from flask import Flask, request, jsonify
from tensorflow import keras
from PIL import Image
import numpy as np
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# This part is now correct
model = keras.Sequential([
    keras.Input(shape=(224, 224, 3)),
    keras.layers.TFSMLayer('rice_savedmodel_B3', call_endpoint='serving_default')
])
model.compile()

# Load class names
with open('class_names.json', 'r') as f:
    class_names = json.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    file = request.files['image']
    img = Image.open(file.stream).convert('RGB').resize((224, 224))
    img = np.array(img)
    img = np.expand_dims(img, axis=0)
    
    # --- FIX IS HERE ---
    # 1. The model returns a dictionary
    prediction_dict = model.predict(img)
    
    # 2. Get the key for the output layer (it's usually the only one)
    output_key = list(prediction_dict.keys())[0]
    
    # 3. Get the actual prediction array from the dictionary
    prediction_array = prediction_dict[output_key]
    # --------------------

    # Now use the prediction_array for the rest of the logic
    pred_idx = int(np.argmax(prediction_array))
    pred_class = class_names[pred_idx]
    
    return jsonify({
        'result': pred_class,
        'probs': prediction_array.tolist()[0]
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
