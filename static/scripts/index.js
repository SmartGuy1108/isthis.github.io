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
        let foodName = data.message
            .replace(/_/g, '') // Remove underscores
            .replace(/\w\S*/g, text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()); // Title case

        document.getElementById('predicted').innerText = "AI identified food. Solve the puzzles to reveal it!";
        
        // Start the puzzle sequence
        startPuzzleSequence(foodName);
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


window.onload = function() {
    var food = "placeholder";
    var anagramFood = food.split('').sort(() => Math.random() - 0.5).join('');
    document.getElementById("anagramShow").textContent = "Solve this! " + anagramFood;
};

