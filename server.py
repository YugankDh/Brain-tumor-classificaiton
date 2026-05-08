from flask import Flask, request, jsonify, render_template
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from io import BytesIO
from livereload import Server
import json

model = load_model('model/brain_tumor_mri.keras')

app = Flask(__name__)

CLASS_NAMES = ['glioma', 'meningioma', 'notumor', 'pituitary']

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    file = request.files['image']

    
    img = load_img(BytesIO(file.read()), target_size=(128,128))

    
    arr = img_to_array(img) / 255.0          
    arr = np.expand_dims(arr, axis=0)        

    with open('DATA.json', 'r') as file:
        data = json.load(file)

    
    predictions = model.predict(arr)[0]


    class_index = np.argmax(predictions)
    class_name = CLASS_NAMES[class_index]
    confidence = float(predictions[class_index]) * 100
    class_about = data[class_name]['summary']
    class_sh = data[class_name]['severity_hint']
    

    return jsonify({
        'class': class_name,
        'about':class_about,
        'sh':class_sh,
        'confidence': round(confidence,2)
    })

if __name__ == '__main__':
    app.run(port=5500)
    # server = Server(app.wsgi_app)
    # server.watch('templates/index.html','static/style.css')
    # server.serve(port=5500)

