console.log("Hello, World!");

const gridButtons = document.querySelectorAll(".grid_button");
const rulesButton = document.querySelector("#rules_button");
const rules = document.querySelector("#rules");
const movesCounter = document.querySelector("#count");
const resetButton = document.querySelector("#reset");

const IMAGE_PATHS = {
	battleship: "/public/assets/images/battleship-image.png",
	waves: "/public/assets/images/waves.png",
};

const INITIAL_MOVES = 8;
const SHIPS_WINNING_COUNT = 5;
const GRID_SIZE = 16; // Assuming grid size from the sum of ships and waves

let imagesArray = [];
let shipsCounter = 0;

// Initialize game state
function initializeGame() {
	shipsCounter = 0;
	movesCounter.textContent = INITIAL_MOVES;
	generateImagesArray();
	assignGridButtonListeners();
}

function generateImagesArray() {
	imagesArray = [
		...Array(5).fill(IMAGE_PATHS.battleship),
		...Array(11).fill(IMAGE_PATHS.waves),
	];
	imagesArray.sort(() => Math.random() - 0.5);
	// console.log(imagesArray);
}

// Toggle rules visibility
function toggleRules() {
	rules.classList.toggle("hidden");
}

// Handle grid button click
function handleGridButtonClick(event) {
	if (movesCounter.textContent === "0") {
		alert("No more moves left!");
		return;
	}

	const button = event.currentTarget;

	if (!button.querySelector("img")) {
		const image = createImageElement(imagesArray[button.id]);
		button.appendChild(image);
		updateMovesCounter();
	}

	checkShipFound(button);
	checkGameEnd();
}

function createImageElement(src) {
	const image = document.createElement("img");
	image.src = src;
	image.classList.add("w-[108px]", "h-[108px]");
	return image;
}

function updateMovesCounter() {
	movesCounter.textContent = Number(movesCounter.textContent) - 1;
	// console.log(movesCounter.textContent);
}

function checkShipFound(button) {
	const imageName = button
		.querySelector("img")
		.src.split("/")
		.pop()
		.split(".")[0];
	if (imageName === "battleship-image") {
		shipsCounter++;
		// console.log(shipsCounter);
	}
}

function checkGameEnd() {
	if (shipsCounter === SHIPS_WINNING_COUNT) {
		alert("You win!");
	} else if (movesCounter.textContent === "0") {
		alert("Thank you for playing!");
	}
}

function assignGridButtonListeners() {
	gridButtons.forEach((button) => {
		button.addEventListener("click", handleGridButtonClick);
	});
}

// Event listeners
rulesButton.addEventListener("click", toggleRules);

// Reset game
resetButton.addEventListener("click", () => {
	// console.log("Resetting game...");
	alert("Resetting game...");
	initializeGame();
	gridButtons.forEach((button) => {
		if (button.querySelector("img")) {
			button.removeChild(button.querySelector("img"));
		}
	});
});

// Initialize the game on page load
initializeGame();
