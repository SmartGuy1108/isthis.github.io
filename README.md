# Food Image Scramble Identifier called FoodShuffle

## Overview  
This is a web application that allows users to upload an image, which is then processed by an AI model to identify its contents. Instead of displaying the result directly, the application scrambles the image and shows it to the user in a distorted form.  

## Features  
- Upload an image for analysis  
- AI model guesses what the image contains  
- Scrambled version of the image is displayed to the user  
- Simple and interactive UI  

## Technologies Used  
- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Flask
- **Machine Learning:** PyTorch 
- **Image Processing:** PIL

## Installation & Setup  

1. **Clone the Repository**  
   ```sh
   git clone https://github.com/SmartGuy1108/isthis.github.io
   cd app
   ```

2. **Set Up a Virtual Environment (Python, if using Flask)**  
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows, use venv\Scripts\activate
   ```

3. **Install Dependencies**  
   ```sh
   pip install -r requirements.txt
   ```

4. **Run the Application**  
   ```sh
   gunicorn app:app
   ```
   The server should start, and you can access the application at `http://localhost:5000`.  

## Usage  
1. Upload an image using the provided upload button.  
2. The AI model will analyze the image and determine what it contains.  
3. Instead of showing the original result, the image will be scrambled and displayed.  
4. Try to guess what the scrambled image represents!  

## Future Improvements    
- Implement a gamified version where users guess the image  
- Upload it onto a web-hosting service
- Enable support for multiple image formats
