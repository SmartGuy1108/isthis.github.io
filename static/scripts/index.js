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

function startWordle(food) {
    alert("Start the Wordle game! Try to guess the food name.");
    // Implement a simple Wordle-like guessing game here
    startJigsawPuzzle(food);
}

function startJigsawPuzzle(food) {
    alert("Solve the jigsaw puzzle of the food image!");
    // Implement jigsaw puzzle logic using the uploaded image
    startCountryGuess(food);
}

function startCountryGuess(food) {
    alert("Guess the country of origin for this food!");
    // Implement country-guessing logic
    revealAnagram(food);
}

function revealAnagram(food) {
    let anagramFood = food.split('').sort(() => Math.random() - 0.5).join('');
    document.getElementById("anagramShow").textContent = "Solve this! " + anagramFood;
}
