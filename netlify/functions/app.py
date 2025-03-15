import os

from flask import Flask, render_template, request, jsonify
import torch
import torch.nn as nn
import torch.nn.functional as F
import torchvision
import torchvision.transforms as transforms
from PIL import Image

MODEL_PATH = "food101_model.pth"

def load_model():
    model = torchvision.models.resnet50(pretrained=False)
    model.fc = nn.Sequential(
        nn.Dropout(0.4),
        nn.Linear(model.fc.in_features, 101)
    )
    checkpoint = torch.load(MODEL_PATH, map_location=torch.device('cpu'))
    model.load_state_dict(checkpoint['model_state_dict'])
    idx_to_class = checkpoint['idx_to_class']
    model.eval()
    return model, idx_to_class

def preprocess_image(image: Image.Image):
    transform = transforms.Compose([
        transforms.Resize(256),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])
    image_tensor = transform(image)
    image_tensor = image_tensor.unsqueeze(0)
    return image_tensor

def predict_food(model, image_tensor, idx_to_class):
    with torch.no_grad():
        outputs = model(image_tensor)
        probabilities = F.softmax(outputs, dim=1)
        top_prob, top_idx = torch.max(probabilities, 1)
        predicted_class = idx_to_class[top_idx.item()]
        return predicted_class

def classify_image(image_path: str):
    model, idx_to_class = load_model()
    image = Image.open(image_path).convert('RGB')
    image_tensor = preprocess_image(image)
    predicted_class = predict_food(model, image_tensor, idx_to_class)
    return predicted_class

app = Flask('isthis.github.io')

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/classifyimage', methods=['POST'])
def classifyimage():
    if 'image' not in request.files:
        return jsonify({'message': 'No file part'}), 400
    file = request.files['image']
    if file.filename == '':
        return jsonify({'message': 'No selected file'}), 400

    if not os.path.exists('static/image'):
        os.makedirs('static/image')

    file_path = os.path.join('static/image', 'image.png')
    file.save(file_path)

    result = classify_image(file_path)
    os.remove(file_path)
    return jsonify({'message': result})

if __name__ == "__main__":
    app.run()#

