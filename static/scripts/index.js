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
        startWordle(foodName);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});


