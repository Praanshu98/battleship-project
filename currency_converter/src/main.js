import { API_KEY_EXCHANGE_RATE } from "./config.js";

const amount = document.getElementById("amount");
const currencyFrom = document.getElementById("from");
const currencyTo = document.getElementById("to");
const convertedAmount = document.getElementById("converted_amount");

const convertButton = document.getElementById("convert");

const fetchData = async (url) => {
	const response = await fetch(url);
	const data = await response.json();
	// console.log(data);
	return data;
};

const convertCurrency = async () => {
	const data = await fetchData(
		"https://restcountries.com/v3.1/all?fields=name,currencies,flag",
	);
	const currencyArray = data.map((country) => {
		const currency = Object.keys(country.currencies)[0];
		const currencyName = Object.values(country.currencies)[0]?.name;
		const flag = country.flag;
		const fullCurrency = `${flag} ${currency} - ${currencyName}`;
		return { currency, fullCurrency };
	});
	return currencyArray;
};

const addCurrencyToSelect = async () => {
	const currencies = await convertCurrency();
	currencies.forEach((currency) => {
		const optionalHTML = `<option value="${currency.currency}">${currency.fullCurrency}</option>`;
		currencyFrom.insertAdjacentHTML("beforeend", optionalHTML);
		currencyTo.insertAdjacentHTML("beforeend", optionalHTML);
	});
};

addCurrencyToSelect();

convertButton.addEventListener("click", async () => {
	const from = currencyFrom.value;
	const to = currencyTo.value;
	const amountNumber = Number(amount.value);

	if (!isNaN(amountNumber)) {
		const data = await fetchData(
			`https://v6.exchangerate-api.com/v6/${API_KEY_EXCHANGE_RATE}/pair/${from}/${to}/${amountNumber}`,
		);
		const result = data.conversion_result;
		convertedAmount.textContent = `${amountNumber} ${from} = ${result} ${to}`;
		convertedAmount.classList.remove("hidden");
	} else {
		alert("Please enter a valid number");
	}
});
