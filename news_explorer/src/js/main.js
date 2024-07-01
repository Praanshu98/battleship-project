import { INITIAL_NEWS_DISPLAY } from "./config.js";
import allNews from "./data.js";
import {
	clearNewsContainer,
	displayCategories,
	displayNews,
	displayShowMoreButton,
	showMoreNews,
} from "./displayContent.js";
import { sortNews } from "./formatDate.js";

const newsContainer = document.querySelector("#news_container");
const searchInput = document.querySelector("#search");
const categoryContainer = document.querySelector("#category_container");
let searchTimeout;

// filter the news based on the search value
const searchFilter = (searchValue) => {
	const filteredNews = allNews.filter((news) => {
		if (news.title.toLowerCase().includes(searchValue)) {
			return news;
		}
	});
	if (filteredNews.length === 0) {
		newsContainer.innerHTML = "<p>No news found</p>";
		return;
	}
	displayShowMoreButton(filteredNews);
	searchTimeout = setTimeout(() => {
		newsContainer.innerHTML = "";
		displayNews(INITIAL_NEWS_DISPLAY, filteredNews);
	}, 1000);
};

const categoryClickActivity = () => {
	const filterCategories = [];
	categoryContainer.addEventListener("click", (event) => {
		const eventTarget = event.target;

		// If click is not on a button, return
		if (eventTarget.tagName !== "BUTTON") return;

		// If click in on button with id "all"
		// 1. Reset the filterCategories array
		// 2. Reset the background color of rest buttons
		// 3. Add the background color to the clicked button
		if (eventTarget.id === "all") {
			filterCategories.length = 0;
			// Clear the news container
			clearNewsContainer();

			// Initial display of news
			displayNews();

			// Display the show more button
			displayShowMoreButton();

			// Show more news
			showMoreNews(allNews);

			document
				.querySelector("#all")
				.classList.replace("bg-slate-600", "bg-black");

			// Reset the background color of rest buttons
			categoryContainer.childNodes.forEach((child) => {
				if (child.tagName === "BUTTON" && child.id !== "all") {
					child.classList.replace("bg-black", "bg-slate-600");
				}
			});
		} else {
			document
				.querySelector("#all")
				.classList.replace("bg-black", "bg-slate-600");

			// If click is on a button other than "all"
			// 1. Add the button value to the filterCategories array
			filterCategories.push(eventTarget.value);

			filterNews(filterCategories);

			eventTarget.classList.replace("bg-slate-600", "bg-black");
		}
	});
};

const filterNews = (categories) => {
	const filteredNews = allNews.filter((news) => {
		if (categories.includes(news.category)) {
			return news;
		}
	});

	clearNewsContainer();
	displayNews(INITIAL_NEWS_DISPLAY, filteredNews);
	showMoreNews(filteredNews);

	// If no news is found, display message
	if (filteredNews.length === 0) {
		newsContainer.innerHTML = "<p>No news found</p>";
		return;
	}
};

// Initialize the app
const init = () => {
	// Clear search input
	searchInput.value = "";

	// Clear the news container
	clearNewsContainer();

	// Display categories buttons
	displayCategories();

	// Sort the news by date
	sortNews(allNews);

	// Initial display of news
	displayNews();

	// Display the show more button
	displayShowMoreButton();

	// Show more news
	showMoreNews(allNews);

	//
	categoryClickActivity();

	// Search for news
	searchInput.addEventListener("input", (event) => {
		if (searchTimeout) clearTimeout(searchTimeout);
		const searchValue = event.target.value.toLowerCase();
		searchFilter(searchValue);
	});
};

init();
