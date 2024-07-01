import { INITIAL_NEWS_DISPLAY } from "./config.js";
import allNews from "./data.js";
import { displayNews } from "./displayNews.js";
import { sortNews } from "./formatDate.js";

const showMoreButton = document.querySelector("#show_more");
const newsContainer = document.querySelector("#news_container");
const searchInput = document.querySelector("#search");
let searchTimeout;

// const displayNews = (displayLength = INITIAL_NEWS_DISPLAY, news = allNews) => {
// 	// Sort the news by date
// 	sortNews(news);

// 	// Display the news
// 	const startingPoint =
// 		displayLength === INITIAL_NEWS_DISPLAY ? 0 : INITIAL_NEWS_DISPLAY;
// 	const endPoint =
// 		displayLength === INITIAL_NEWS_DISPLAY
// 			? INITIAL_NEWS_DISPLAY
// 			: news.length;

// 	for (let index = startingPoint; index < endPoint; index++) {
// 		// For rerunning the function to display the filtered news
// 		if (!news[index]) return;

// 		const divContainer = document.createElement("div");
// 		const pElementHeading = document.createElement("p");
// 		const pElementDate = document.createElement("p");
// 		const pElementContent = document.createElement("p");

// 		divContainer.classList.add(
// 			"flex",
// 			"flex-col",
// 			"gap-2",
// 			"px-8",
// 			"py-4",
// 			"border",
// 		);
// 		if (newsContainer.children.length === 0) {
// 			divContainer.classList.add("col-span-2");
// 		}

// 		pElementHeading.textContent = news[index].title;
// 		pElementHeading.classList.add("font-bold");

// 		pElementDate.textContent = formatDate(news[index].dateAndTime);

// 		pElementContent.textContent = news[index].content;
// 		pElementContent.classList.add("text-small");

// 		divContainer.appendChild(pElementHeading);
// 		divContainer.appendChild(pElementDate);
// 		divContainer.appendChild(pElementContent);

// 		newsContainer.appendChild(divContainer);
// 	}
// };

// const formatDate = (oldDate) => {
// 	let [date, month, year] = oldDate.split(",")[0].split("/");

// 	const options = {
// 		day: "2-digit",
// 		month: "long",
// 		year: "numeric",
// 	};

// 	// Format the date in format 1 January 2021
// 	const newDate = new Date(`${month}/${date}/${year}`).toLocaleDateString(
// 		"default",
// 		options,
// 	);

// 	// Adds suffix to the date (st, nd, rd, th)
// 	date = newDate.split(" ")[0] + nthNumber(newDate.split(" ")[0]);
// 	month = newDate.split(" ")[1];
// 	year = newDate.split(" ")[2];

// 	return `${date} ${month} ${year}`;
// };

// const nthNumber = (number) => {
// 	if (number > 3 && number < 21) return "th";
// 	switch (number % 10) {
// 		case 1:
// 			return "st";
// 		case 2:
// 			return "nd";
// 		case 3:
// 			return "rd";
// 		default:
// 			return "th";
// 	}
// };

// const sortNews = (news) => {
// 	return news.sort((a, b) => {
// 		let [partialDate, partialTime] = a.dateAndTime.split(", ");
// 		let [date, month, year] = partialDate.split(",")[0].split("/");
// 		const dateA = new Date(`${month}/${date}/${year} ${partialTime}`);

// 		[partialDate, partialTime] = b.dateAndTime.split(", ");
// 		[date, month, year] = partialDate.split(",")[0].split("/");
// 		const dateB = new Date(`${month}/${date}/${year} ${partialTime}`);

// 		return dateB - dateA;
// 	});
// };

const displayShowMoreButton = (newsToDisplay = allNews) => {
	if (newsToDisplay.length <= INITIAL_NEWS_DISPLAY) {
		showMoreButton.style.display = "none";
		return;
	}
};

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

// Initialize the app
const init = () => {
	// Clear search input
	searchInput.value = "";

	sortNews(allNews);

	// Initial display of news
	displayNews();

	// Display the show more button
	displayShowMoreButton();

	// Display all the news when the button is clicked
	showMoreButton.addEventListener("click", () => {
		displayNews(allNews.length);
		showMoreButton.style.display = "none";
	});

	// Search for news
	searchInput.addEventListener("input", (event) => {
		if (searchTimeout) clearTimeout(searchTimeout);
		const searchValue = event.target.value.toLowerCase();
		searchFilter(searchValue);
	});
};

init();
