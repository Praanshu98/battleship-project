console.log("Hello, World!");

const gridButtons = document.querySelectorAll(".grid_button");
const rulesButton = document.querySelector("#rules_button");
const rules = document.querySelector("#rules");
const imagesArray = [];
const movesCounter = document.querySelector("#count");
const resetButton = document.querySelector("#reset_button");
let shipsCounter = 0;
const shipsWinningCount = 5;

// Set initial movesCounter value
movesCounter.textContent = 8;
shipsCounter = 0;

// Toggle rules
rulesButton.addEventListener("click", () => rules.classList.toggle("hidden"));

// Generating list of images to display
imagesArray.push(
	...Array(5).fill("/public/assets/images/battleship-image.png"),
);
imagesArray.push(...Array(11).fill("/public/assets/images/waves.png"));
imagesArray.sort(() => Math.random() - 0.5);
console.log(imagesArray);

// Toggling grid buttons
gridButtons.forEach((button) => {
	button.addEventListener("click", (event) => {
		// Alert when movesCounter reaches 0
		if (movesCounter.textContent === "0") {
			alert("No more moves left!");
			return;
		}

		if (event.target.tagName !== "IMG") {
			const image = document.createElement("img");
			image.src = imagesArray[button.id];
			image.classList.add("w-[108px]", "h-[108px]");
			button.appendChild(image);
			// Update movesCounter
			movesCounter.textContent = Number(movesCounter.textContent) - 1;
			console.log(movesCounter.textContent);
		}

		const imageName = button.children[0].src.split("/").pop().split(".")[0];
		if (imageName === "battleship-image") {
			shipsCounter++;
			console.log(shipsCounter);
		}

		// Alert when all ships are found
		if (shipsCounter === shipsWinningCount) {
			alert("You win!");
		}

		// Alert when all moves are used
		if (movesCounter.textContent === "0") {
			alert("Thank you for playing!");
		}
	});
});
