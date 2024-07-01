export const formatDate = (oldDate) => {
	let [date, month, year] = oldDate.split(",")[0].split("/");

	const options = {
		day: "2-digit",
		month: "long",
		year: "numeric",
	};

	// Format the date in format 1 January 2021
	const newDate = new Date(`${month}/${date}/${year}`).toLocaleDateString(
		"default",
		options,
	);

	// Adds suffix to the date (st, nd, rd, th)
	date = newDate.split(" ")[0] + nthNumber(newDate.split(" ")[0]);
	month = newDate.split(" ")[1];
	year = newDate.split(" ")[2];

	return `${date} ${month} ${year}`;
};

const nthNumber = (number) => {
	if (number > 3 && number < 21) return "th";
	switch (number % 10) {
		case 1:
			return "st";
		case 2:
			return "nd";
		case 3:
			return "rd";
		default:
			return "th";
	}
};

export const sortNews = (news) => {
	return news.sort((a, b) => {
		let [partialDate, partialTime] = a.dateAndTime.split(", ");
		let [date, month, year] = partialDate.split(",")[0].split("/");
		const dateA = new Date(`${month}/${date}/${year} ${partialTime}`);

		[partialDate, partialTime] = b.dateAndTime.split(", ");
		[date, month, year] = partialDate.split(",")[0].split("/");
		const dateB = new Date(`${month}/${date}/${year} ${partialTime}`);

		return dateB - dateA;
	});
};
