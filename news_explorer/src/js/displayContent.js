import { INITIAL_NEWS_DISPLAY } from "./config.js";
import allNews from "./data.js";
import { formatDate } from "./formatDate.js";

const newsContainer = document.querySelector("#news_container");
const categoryContainer = document.querySelector("#category_container");
let showMoreButton = document.querySelector("#show_more");

export const displayNews = (
	displayLength = INITIAL_NEWS_DISPLAY,
	news = allNews,
) => {
	// Display the news
	const startingPoint =
		displayLength === INITIAL_NEWS_DISPLAY ? 0 : INITIAL_NEWS_DISPLAY;
	const endPoint =
		displayLength === INITIAL_NEWS_DISPLAY
			? INITIAL_NEWS_DISPLAY
			: news.length;

	for (let index = startingPoint; index < endPoint; index++) {
		// For rerunning the function to display the filtered news
		if (!news[index]) return;

		const divContainer = document.createElement("div");
		const pElementHeading = document.createElement("p");
		const pElementDate = document.createElement("p");
		const pElementContent = document.createElement("p");

		divContainer.classList.add(
			"flex",
			"flex-col",
			"gap-2",
			"px-8",
			"py-4",
			"border",
		);
		if (newsContainer.children.length === 0) {
			divContainer.classList.add("col-span-2");
		}

		pElementHeading.textContent = news[index].title;
		pElementHeading.classList.add("font-bold");

		pElementDate.textContent = formatDate(news[index].dateAndTime);

		pElementContent.textContent = news[index].content;
		pElementContent.classList.add("text-small");

		divContainer.appendChild(pElementHeading);
		divContainer.appendChild(pElementDate);
		divContainer.appendChild(pElementContent);

		newsContainer.appendChild(divContainer);
	}
};

// Get distinct categories
export const getCategories = (news) => {
	const categories = news.map((news) => news.category);
	return [...new Set(categories)];
};

// Display categories buttons
export const displayCategories = () => {
	const categories = getCategories(allNews);
	if (categoryContainer.children.length === 0) {
		const button = createButton("All");
		button.classList.replace("bg-slate-600", "bg-black");
		categoryContainer.appendChild(button);
	}
	categories.forEach((category) => {
		category = capitalizeFirstLetter(category);
		const button = createButton(category);
		categoryContainer.appendChild(button);
	});
};

const createButton = (text) => {
	const button = document.createElement("button");
	button.textContent = text;
	button.classList.add(
		"bg-slate-600",
		"shadow-button",
		"p-0",
		"rounded-button-l",
		"rounded-md",
		"w-32",
		"h-9",
		"text-white",
	);
	button.value = text.toLowerCase();
	button.id = text.toLowerCase();
	return button;
};

const capitalizeFirstLetter = (string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

// Display the show more button
export const displayShowMoreButton = (newsToDisplay = allNews) => {
	if (newsToDisplay.length <= INITIAL_NEWS_DISPLAY) {
		showMoreButton.style.display = "none";
		return;
	}
};

export const clearNewsContainer = () => {
	// Clear the news container
	newsContainer.innerHTML = "";
};

export const showMoreNews = (newsToDisplay) => {
	// Display all the news when the button is clicked

	const new_element = showMoreButton.cloneNode(true);
	new_element.addEventListener("click", () => {
		displayNews(newsToDisplay.length, newsToDisplay);
		showMoreButton.style.display = "none";
	});
	showMoreButton.parentNode.replaceChild(new_element, showMoreButton);
	showMoreButton = document.querySelector("#show_more");
};
