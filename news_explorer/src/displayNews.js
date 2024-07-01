import { INITIAL_NEWS_DISPLAY } from "./config.js";
import allNews from "./data.js";
import { formatDate } from "./formatDate.js";

const newsContainer = document.querySelector("#news_container");

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
