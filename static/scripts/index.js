// JavaScript Food Puzzle Game

document.getElementById('uploadForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData();
    const file = document.getElementById('imageFile').files[0];

    if (!file) {
        alert("Please select a file before uploading.");
        return;
    }

    formData.append("image", file);

    fetch('/classifyimage', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        let foodName = data.message.replace(/_/g, '');
        document.getElementById('predicted').innerHTML = foodName;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});



 document.getElementById('imageFile').addEventListener('change', function (event) {
     const file = event.target.files[0];
     const fileNameDisplay = document.getElementById('fileName');
     const imagePreview = document.getElementById('imagePreview');
 
     if (file) {
         fileNameDisplay.textContent = file.name;
 
         // Show image preview
         const reader = new FileReader();
         reader.onload = function (e) {
             imagePreview.src = e.target.result;
             imagePreview.classList.remove("hidden");
         };
         reader.readAsDataURL(file);
     } else {
         fileNameDisplay.textContent = "No file chosen";
         imagePreview.classList.add("hidden");
     }
 });



var food = foodName;
var anagramFood = food.split('').sort(() => Math.random() - 0.5).join('');
document.getElementById("anagramShow").textContent = "Solve this! " + anagramFood;
