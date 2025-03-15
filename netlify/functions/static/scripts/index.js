document.getElementById('uploadForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData();
    const file = document.getElementById('imageFile').files[0];
    formData.append("image", file);

    fetch('/classifyimage', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('predicted').innerText = data.message;
        })
        .catch(error => {
            console.error('Error:', error);
        });
});