
// Get the current date
const currentDateCalendar = new Date();
// Calculate the Orthodox date by subtracting 13 days
const orthodoxDate = new Date(
	currentDateCalendar.getTime() - 13 * 24 * 60 * 60 * 1000
);
// Define Church Slavonic month names

const churchSlavonicMonths = [
	"января̀",
	"февраля",
	"ма́рта",
	"а҆прелѧ",
	"маѧ",
	"і҆ю́нѧ",
	"і҆ю́лѧ",
	"а҆́ѵгꙋста",
	"сентѧбрѧ",
	"ѡ҆ктѧбрѧ",
	"ноѧбрѧ̀",
	"декабрѧ",
];
// Display the Orthodox date with Church Slavonic month name
const orthodoxMonth = churchSlavonicMonths[orthodoxDate.getMonth()];
document.getElementById(
	"orthodox-calendar"
).innerHTML = `${orthodoxDate.getDate()} ${orthodoxMonth}`;
document.getElementById("orthodox-calendar").style.textDecoration = "underline";

// Display the Gregorian date
const gregorianDay = currentDateCalendar.getDate();
const gregorianMonth = churchSlavonicMonths[currentDateCalendar.getMonth()];
document.getElementById(
	"gregorian-calendar"
).innerHTML = `${gregorianDay} ${gregorianMonth}`;

// Правила христианской жизни по понедельникам

const mondayText = document.getElementById("monday-text");
const contentsPravila = document.querySelector(".pravilaContents"); // assuming you have a container with class 'contents'
const hrefPravila = document.querySelector(".pravilakhristian"); //
const currentDayPravila = new Date().getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

if (currentDayPravila === 1) {
	// 1 = Monday
	mondayText.style.display = "block";
	const chapterTitlePravila = mondayText.querySelector("h1");
	const chapterLinkPravila = document.createElement("a");
	chapterLinkPravila.textContent = "Правила христианской жизни";
	chapterLinkPravila.href = `#`;

	chapterLinkPravila.onclick = function () {
		chapterTitlePravila.scrollIntoView({ behavior: "smooth" });
		return false;
	};
	contentsPravila.innerHTML = ""; // clear the contents container
    const br = document.createElement("br");       // create <br>
    contentsPravila.appendChild(br);               // add the line break
	contentsPravila.appendChild(chapterLinkPravila); // append the l
	hrefPravila.style.display = "block";
} else {
	mondayText.style.display = "none";
}

// Define the images and their corresponding alt texts and widths
const images = [
	{
		src: "/static/images/omoveniye.PNG",
		alt: "Омовение, Книжная миниатюра. Византия. 11 век",
		width: "250px",
	},
	{
		src: "/static/images/plevely.png",
		alt: "Притча о плевелах",
		width: "250px",
	},
	{
		src: "/static/images/vinograd.png",
		alt: "Притча о злых виноградарях",
		width: "250px",
	},
	{ src: "/static/images/son.png", alt: "Блудный сын", width: "250px" },
	{
		src: "/static/images/vecherya.png",
		alt: "Тайная вечеря. Икона. Афон, Греция. 12 век",
		width: "250px",
	},
	{
		src: "/static/images/lazar.png",
		alt: "Воскрешение Лазаря. Фреска. Джотто. Италия. 1304-1306 гг.",
		width: "250px",
	},
	{
		src: "/static/images/touch.png",
		alt: "Воскресение Христово («Не прикасайся ко Мне»). Фреска. Джотто. Италия. 1303-1306 гг.",
		width: "250px",
	},
	{
		src: "/static/images/blagovest.png",
		alt: "благовешение. Фра Анжелико. Италия, 1426 г.",
		width: "250px",
	},
	{
		src: "/static/images/10.png",
		alt: "Исцеление десяти прокаженных. Фреска. Сербия. 15 век",
		width: "250px",
	},
	{
		src: "/static/images/pomog.png",
		alt: "«Я был голоден, и ты накормил Меня, Я был наг, и ты одел Меня..» Книжная миниатюра. Византия. 13 век",
		width: "250px",
	},
];

const imageElement = document.querySelector("img.yevangelieImage");

function getCurrentDayOfYear() {
	const now = new Date();
	const start = new Date(now.getFullYear(), 0, 0);
	const diff = now - start;
	const oneDay = 1000 * 60 * 60 * 24;
	return Math.floor(diff / oneDay);
}

function showImageForCurrentDay() {
	const currentDay = getCurrentDayOfYear();
	const imageIndex = currentDay % images.length;
	imageElement.src = images[imageIndex].src;
	imageElement.alt = images[imageIndex].alt;
	imageElement.style.width = images[imageIndex].width;
}

//showImageForCurrentDay();

//Каноны
const xhrKanons = new XMLHttpRequest();
xhrKanons.open("GET", "/static/kanons.html", true);
xhrKanons.onload = function () {
	if (xhrKanons.status === 200) {
		const parser = new DOMParser();
		const doc = parser.parseFromString(xhrKanons.responseText, "text/html");
		const kanons = doc.querySelectorAll(".kanon");
		const kanonContainer = document.querySelector(".kanon-container");
		const kanonContent = document.querySelector(".contents");
		const currentDayKanon = new Date().getDate(); // 1-31
		const startIndexKanon = currentDayKanon % kanons.length;

		let currentKanon = null;

		kanons.forEach((kanon, index) => {
			kanonContainer.appendChild(kanon); // Append the glava element to the container
			if (index === startIndexKanon) {
				kanon.style.display = "block";
				currentKanon = kanon;
				const kanonTitleH2 = kanon.querySelector("h1");
				const kanonTitle = kanonTitleH2.textContent;
				const anchor = document.createElement("a");
				anchor.style.display = "inline-block";
				
				anchor.href = `#`;

				//anchor.style.fontSize = "110%";
				anchor.textContent = kanonTitle;
				anchor.setAttribute("aria-label", `Go to `);

				anchor.addEventListener("click", (event) => {
					event.preventDefault();
					if (currentKanon) {
						currentKanon.scrollIntoView({ behavior: "smooth" });
					} else {
						console.error(`Element not found.`);
					}
				});

				kanonContent.innerHTML = "";
				kanonContent.appendChild(anchor);
			} else {
				kanon.style.display = "none";
			}
		});
	} else {
		console.error("Error loading kanons.html:", xhrKanons.statusText);
	}
};
xhrKanons.send();

//Kanons1
const xhrKanons1 = new XMLHttpRequest();
xhrKanons1.open("GET", "/static/kanons1.html", true);
xhrKanons1.onload = function () {
	if (xhrKanons1.status === 200) {
		const parser = new DOMParser();
		const doc = parser.parseFromString(
			xhrKanons1.responseText,
			"text/html"
		);
		const kanons1 = doc.querySelectorAll(".kanon");
		const kanonContainer1 = document.querySelector(".kanon-container1");
		const kanonContent1 = document.querySelector(".contents1");
		const currentDayKanon1 = new Date().getDate(); // 1-31
		const startIndexKanon1 = currentDayKanon1 % kanons1.length;

		let currentKanon1 = null;

		kanons1.forEach((kanon1, index) => {
			kanonContainer1.appendChild(kanon1); // Append the glava element to the container
			if (index === startIndexKanon1) {
				kanon1.style.display = "block";
				currentKanon1 = kanon1;
				const kanonTitleH2 = kanon1.querySelector("h1");
				const kanonTitle = kanonTitleH2.textContent;
				const anchor = document.createElement("a");
				
				anchor.href = `#`;

				//anchor.style.fontSize = "110%";
				anchor.textContent = kanonTitle;
				anchor.setAttribute("aria-label", `Go to `);

				anchor.addEventListener("click", (event) => {
					event.preventDefault();
					if (currentKanon1) {
						currentKanon1.scrollIntoView({ behavior: "smooth" });
					} else {
						console.error(`Element not found.`);
					}
				});

				kanonContent1.innerHTML = "";
				kanonContent1.appendChild(anchor);
			} else {
				kanon1.style.display = "none";
			}
		});
	} else {
		console.error("Error loading kanons1.html:", xhrKanons1.statusText);
	}
};
xhrKanons1.send();

// Кафизмы
const xhrKathisma = new XMLHttpRequest();
xhrKathisma.open("GET", "/static/kathismas.html", true);
xhrKathisma.onload = function () {
	if (xhrKathisma.status === 200) {
		const parser = new DOMParser();
		const doc = parser.parseFromString(
			xhrKathisma.responseText,
			"text/html"
		);
		const kathismas = doc.querySelectorAll(".kathisma");
		const kathismaContainer = document.querySelector(".kathisma-container");
		const kathismaaContent = document.querySelector(".kathismaContents");
		const currentDayKathisma = new Date().getDate(); // 1-31
		const startIndexKathisma = currentDayKathisma % kathismas.length;

		let currentKathisma = null;

		kathismas.forEach((kathisma, index) => {
			kathismaContainer.appendChild(kathisma); // Append the glava element to the container
			if (index === startIndexKathisma) {
				kathisma.style.display = "block";
				currentKathisma = kathisma;
				const kathismaTitleH2 = kathisma.querySelector("h3");
				const kathismaTitle = kathismaTitleH2.textContent;
				const anchor = document.createElement("a");
				anchor.style.display = "inline-block";
				anchor.href = `#`;

				//anchor.style.fontSize = "110%";
				anchor.textContent = kathismaTitle;
				anchor.setAttribute("aria-label", `Go to `);

				anchor.addEventListener("click", (event) => {
					event.preventDefault();
					if (currentKathisma) {
						currentKathisma.scrollIntoView({ behavior: "smooth" });
					} else {
						console.error(`Element not found.`);
					}
				});

				kathismaaContent.innerHTML = "";
				kathismaaContent.appendChild(anchor);
			} else {
				kathisma.style.display = "none";
			}
		});
	} else {
		console.error("Error loading evangelie.html:", xhrKathisma.statusText);
	}
};
xhrKathisma.send();

//Евангелие
const BOOK_FILES_SCRIPTURE_RU = [
	"books/ru/1matheus.json",
	"books/ru/2mark.json",
	"books/ru/3luka.json",
	"books/ru/4john.json",
];

const BOOK_FILES_SCRIPTURE = [
	"books/1matheus.json",
	"books/2mark.json",
	"books/3luka.json",
	"books/4john.json",
];

let scriptureBooks = [];
let currentScriptureBookIndex = 0;
let currentScriptureChapterIndex = 0;

// Load scripture books data
async function loadScriptureBooks() {
	for (const file of BOOK_FILES_SCRIPTURE) {
		try {
			const response = await fetch(file);
			if (!response.ok) throw new Error(`Failed to load ${file}`);
			const bookData = await response.json();
			const chapterKeys = Object.keys(bookData).filter((key) =>
				key.startsWith("Глава")
			);
			console.log(`Scripture book has chapters.`);
			scriptureBooks.push(bookData);
		} catch (error) {
			console.error(error);
		}
	}
}

// Get today's scripture reading plan
function getTodaysScriptureReading() {
	const chaptersToRead = [];
	const today = new Date();
	const dayOfYear = Math.floor(
		(today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
	);

	// Calculate the current chapter index
	let totalChapters = 0;
	for (let i = 0; i < scriptureBooks.length; i++) {
		const chapterKeys = Object.keys(scriptureBooks[i]).filter((key) =>
			key.startsWith("Глава")
		);
		totalChapters += chapterKeys.length;
	}

	const chapterIndex = (dayOfYear * 2) % totalChapters; // Show 2 chapters per day

	// Find the current book and chapter index
	let chapterCount = 0;
	for (let i = 0; i < scriptureBooks.length; i++) {
		const chapterKeys = Object.keys(scriptureBooks[i]).filter((key) =>
			key.startsWith("Глава")
		);
		if (chapterIndex < chapterCount + chapterKeys.length) {
			currentScriptureBookIndex = i;
			currentScriptureChapterIndex = chapterIndex - chapterCount;
			break;
		}
		chapterCount += chapterKeys.length;
	}

	// Get the current book
	const currentBook = scriptureBooks[currentScriptureBookIndex];

	// Get the chapter keys
	const chapterKeys = Object.keys(currentBook).filter((key) =>
		key.startsWith("Глава")
	);
	chapterKeys.sort((a, b) => {
		const numA = parseInt(a.replace(/\D/g, ""));
		const numB = parseInt(b.replace(/\D/g, ""));
		return numA - numB;
	});

	// Get the current chapter and the next chapter
	const currentChapterKey = chapterKeys[currentScriptureChapterIndex];
	chaptersToRead.push({
		book: currentBook.book_name,
		chapter: currentChapterKey,
		verses: currentBook[currentChapterKey],
	});

	const nextChapterIndex =
		(currentScriptureChapterIndex + 1) % chapterKeys.length;
	if (nextChapterIndex === 0) {
		// If we're at the end of the book, move to the next book
		const nextBookIndex =
			(currentScriptureBookIndex + 1) % scriptureBooks.length;
		const nextBook = scriptureBooks[nextBookIndex];
		const nextChapterKey = Object.keys(nextBook).filter((key) =>
			key.startsWith("Глава")
		)[0];
		chaptersToRead.push({
			book: nextBook.book_name,
			chapter: nextChapterKey,
			verses: nextBook[nextChapterKey],
		});
	} else {
		const nextChapterKey = chapterKeys[nextChapterIndex];
		chaptersToRead.push({
			book: currentBook.book_name,
			chapter: nextChapterKey,
			verses: currentBook[nextChapterKey],
		});
	}

	return chaptersToRead;
}

// Function to display today's scripture reading in two separate divs
function displayTodaysScriptureReading() {
	const readingDiv1 = document.querySelector(".scripture1");
	const readingDiv2 = document.querySelector(".scripture2");
	const scriptureContent = document.querySelector(".scripture-content");
	const scriptureContent2 = document.querySelector(".scripture-content2");

	readingDiv1.innerHTML = ""; // Clear previous content
	readingDiv2.innerHTML = ""; // Clear previous content
	scriptureContent.innerHTML = ""; // Clear previous content
	scriptureContent2.innerHTML = ""; // Clear previous content

	const todaysReading = getTodaysScriptureReading();

	if (todaysReading.length >= 2) {
		const chapter1 = todaysReading[0];
		const chapter2 = todaysReading[1];

		const createChapterDiv = function (
			chapter,
			readingDiv,
			scriptureContentDiv
		) {
			const chapterDiv = document.createElement("div");

			chapterDiv.classList.add("chapter");

			const chapterTitle = document.createElement("h3");
			chapterTitle.textContent = chapter.book + ", " + chapter.chapter;
			chapterDiv.appendChild(chapterTitle);

			const anchor = document.createElement("a");
			anchor.style.display = "inline";
			anchor.href = "#";

			anchor.textContent = chapter.book + ", " + chapter.chapter;
			anchor.setAttribute(
				"aria-label",
				"Go to " + chapter.book + ", " + chapter.chapter
			);

			anchor.addEventListener("click", function (event) {
				event.preventDefault();
				chapterDiv.scrollIntoView({ behavior: "smooth" });
			});

			scriptureContentDiv.appendChild(anchor);

			const versesList = document.createElement("div");
			for (const verseNumber in chapter.verses) {
				const verseItem = document.createElement("p");
				//verseItem.style.display = "inline";
				const verseText = chapter.verses[verseNumber]
					//.replace(/([.,:;])/g, "$1 ")
					//.replace(/\s+/g, " ")
					//.replace(/([^.,:;])$/, "$1 ");

				verseItem.textContent = `${verseNumber}: ${verseText}`;
				versesList.appendChild(verseItem);
			}
			chapterDiv.appendChild(versesList);
			readingDiv.appendChild(chapterDiv);
		};

		createChapterDiv(chapter1, readingDiv1, scriptureContent);
		createChapterDiv(chapter2, readingDiv2, scriptureContent2);
	}
}

// Example usage
loadScriptureBooks().then(() => {
	displayTodaysScriptureReading();
});

//Апостол

let BOOK_FILES_RU = [
	"books/ru/1_deyaniya.json",
	"books/ru/2_jacob_poslanie.json",
	"books/ru/3_petr_poslanie_1.json",
	"books/ru/4_petr_poslanie_2.json",
	"books/ru/5_john_poslanie_1.json",
	"books/ru/6_john.2.json",
	"books/ru/7_john.3.json",
	"books/ru/8_juda.json",
	"books/ru/9_rome.json",
	"books/ru/10_korynth.1.json",
	"books/ru/11_korynth.2.json",
	"books/ru/12_galathians.json",
	"books/ru/13_efes.json",
	"books/ru/14_filip.json",
	"books/ru/15_kolos.json",
	"books/ru/16_sol_1.json",
	"books/ru/17_sol_2.json",
	"books/ru/18_tim_1.json",
	"books/ru/19_tim_2.json",
	"books/ru/20_tit.json",
	"books/ru/21_phil.json",
	"books/ru/22_jews.json",
	"books/ru/23_revelation.json",
];

let BOOK_FILES = [
	"books/1_deyaniya.json",
	"books/2_jacob_poslanie.json",
	"books/3_petr_poslanie_1.json",
	"books/4_petr_poslanie_2.json",
	"books/5_john_poslanie_1.json",
	"books/6_john.2.json",
	"books/7_john.3.json",
	"books/8_juda.json",
	"books/9_rome.json",
	"books/10_korynth.1.json",
	"books/11_korynth.2.json",
	"books/12_galathians.json",
	"books/13_efes.json",
	"books/14_filip.json",
	"books/15_kolos.json",
	"books/16_sol_1.json",
	"books/17_sol_2.json",
	"books/18_tim_1.json",
	"books/19_tim_2.json",
	"books/20_tit.json",
	"books/21_phil.json",
	"books/22_jews.json",
	"books/23_revelation.json",
];

let currentBookIndex = 0;
let currentChapterIndex = 0;
let books = [];

// Load books data
async function loadBooks() {
	for (const file of BOOK_FILES) {
		try {
			const response = await fetch(file);
			if (!response.ok) throw new Error(`Failed to load `);
			const bookData = await response.json();
			const chapterKeys = Object.keys(bookData).filter((key) =>
				key.startsWith("Глава")
			);
			books.push(bookData);
		} catch (error) {
			console.error(error);
		}
	}
}

// Get today's reading plan
function getTodaysReading() {
	const chaptersToRead = [];
	const today = new Date();
	const dayOfYear = Math.floor(
		(today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
	);

	// Calculate the current chapter index
	let totalChapters = 0;
	for (let i = 0; i < books.length; i++) {
		const chapterKeys = Object.keys(books[i]).filter((key) =>
			key.startsWith("Глава")
		);
		totalChapters += chapterKeys.length;
	}

	const chapterIndex = (dayOfYear * 2) % totalChapters; // Show 2 chapters per day

	// Find the current book and chapter index
	let chapterCount = 0;
	for (let i = 0; i < books.length; i++) {
		const chapterKeys = Object.keys(books[i]).filter((key) =>
			key.startsWith("Глава")
		);
		if (chapterIndex < chapterCount + chapterKeys.length) {
			currentBookIndex = i;
			currentChapterIndex = chapterIndex - chapterCount;
			break;
		}
		chapterCount += chapterKeys.length;
	}

	// Get the current book
	const currentBook = books[currentBookIndex];

	// Get the chapter keys
	const chapterKeys = Object.keys(currentBook).filter((key) =>
		key.startsWith("Глава")
	);
	chapterKeys.sort((a, b) => {
		const numA = parseInt(a.replace(/\D/g, ""));
		const numB = parseInt(b.replace(/\D/g, ""));
		return numA - numB;
	});

	// Get the current chapter and the next chapter
	const currentChapterKey = chapterKeys[currentChapterIndex];
	chaptersToRead.push({
		book: currentBook.book_name,
		chapter: currentChapterKey,
		verses: currentBook[currentChapterKey],
	});

	const nextChapterIndex = (currentChapterIndex + 1) % chapterKeys.length;
	if (nextChapterIndex === 0) {
		// If we're at the end of the book, move to the next book
		const nextBookIndex = (currentBookIndex + 1) % books.length;
		const nextBook = books[nextBookIndex];
		const nextChapterKey = Object.keys(nextBook).filter((key) =>
			key.startsWith("Глава")
		)[0];
		chaptersToRead.push({
			book: nextBook.book_name,
			chapter: nextChapterKey,
			verses: nextBook[nextChapterKey],
		});
	} else {
		const nextChapterKey = chapterKeys[nextChapterIndex];
		chaptersToRead.push({
			book: currentBook.book_name,
			chapter: nextChapterKey,
			verses: currentBook[nextChapterKey],
		});
	}

	return chaptersToRead;
}

// Mapping of full text to short text
const bookMapping = {
	"Дѣѧ̑нїѧ ст҃ы́хъ а҆пⷭ҇л": "Дѣѧ̑н.",
	"Собо́рное посла́нїе І҆а́кѡвле": "І҆а́к.",
	"1-е собо́рное посла́нїе Петра̀": "1-Пет.",
	"2-е собо́рное посла́нїе Петра̀": "2-Пет.",
	"1-е собо́рное посла́нїе І҆ѡа́нна Богосло́ва": "1-І҆н.",
	"2-е собо́рное посла́нїе І҆ѡа́нна Богосло́ва": "2-І҆н.",
	"3-е собо́рное посла́нїе І҆ѡа́нна Богосло́ва": "3-І҆н.",
	"Собо́рное посла́нїе І҆ꙋ́дино": "І҆ꙋ́д.",
	"Посла́нїе къ ри́млѧнѡмъ": "Ри́м.",
	"1-е посла́нїе къ корі́нѳѧнѡмъ а҆пⷭ҇ла Па́ѵла": "1-Кор.",
	"2-е посла́нїе къ корі́нѳѧнѡмъ а҆пⷭ҇ла Па́ѵла": "2-Кор.",
	"Посла́нїе къ гала́тѡмъ а҆пⷭ҇ла Па́ѵла": "Гал.",
	"Посла́нїе ко є҆фесе́ємъ а҆пⷭ҇ла Па́ѵла": "Є҆ф.",
	"Посла́нїе къ фїлїпписі́ємъ а҆пⷭ҇ла Па́ѵла": "Фїл.",
	"Посла́нїе къ колосса́ємъ а҆пⷭ҇ла Па́ѵла": "Кол.",
	"1-е посла́нїе къ солꙋ́нѧнѡмъ а҆пⷭ҇ла Па́ѵла": "1-Сол.",
	"2-е посла́нїе къ солꙋ́нѧнѡмъ а҆пⷭ҇ла Па́ѵла": "2-Сол.",
	"1-е посла́нїе къ Тїмоѳе́ю а҆пⷭ҇ла Па́ѵла": "1-Тїм.",
	"2-е посла́нїе къ Тїмоѳе́ю а҆пⷭ҇ла Па́ѵла": "2-Тїм.",
	"Посла́нїе къ Ті́тꙋ а҆пⷭ҇ла Па́ѵла": "Ті́т.",
	"Посла́нїе къ Фїлимо́нꙋ а҆пⷭ҇ла Па́ѵла": "Фм.",
	"Посла́нїе ко є҆вре́ємъ а҆пⷭ҇ла Па́ѵла": "Є҆вр.",
	"А҆пока́лѷѱїсъ І҆ѡа́нна Бг҃осло́ва": "А҆пок.",
};

// Function to check if device is in portrait mode
function isPortraitMode() {
	return window.matchMedia("(orientation: portrait)").matches;
}

// Function to get short text
function getShortText(fullText) {
	return bookMapping[fullText] || fullText;
}

// Modify the displayTodaysReading function to use the short text
function displayTodaysReading() {
	const readingDiv1 = document.querySelector(".apostle1");
	const readingDiv2 = document.querySelector(".apostle2");
	const apostleContent = document.querySelector(".apostle-content");
	const apostleContent2 = document.querySelector(".apostle-content2");

	readingDiv1.innerHTML = ""; // Clear previous content
	readingDiv2.innerHTML = ""; // Clear previous content
	apostleContent.innerHTML = ""; // Clear previous content
	apostleContent2.innerHTML = ""; // Clear previous content

	const todaysReading = getTodaysReading();

	// Assuming todaysReading has at least two chapters
	if (todaysReading.length >= 2) {
		const chapter1 = todaysReading[0];
		const chapter2 = todaysReading[1];

		// Create chapter div for first chapter
		const chapterDiv1 = document.createElement("div");
		chapterDiv1.classList.add("chapter");

		const chapterTitle1 = document.createElement("h3");
		chapterTitle1.textContent = chapter1.book + ", " + chapter1.chapter;
		chapterDiv1.appendChild(chapterTitle1);

		// Create anchor for first chapter
		const anchor1 = document.createElement("a");
		anchor1.style.display = "inline-block";
		anchor1.href = "#";

		anchor1.textContent = isPortraitMode()
			? getShortText(chapter1.book) +
			  " " +
			  chapter1.chapter.replace(/\D/g, "")
			: chapter1.book + ", " + chapter1.chapter;
		anchor1.setAttribute(
			"aria-label",
			"Go to " + chapter1.book + ", " + chapter1.chapter
		);

		anchor1.addEventListener("click", function (event) {
			event.preventDefault();
			chapterDiv1.scrollIntoView({ behavior: "smooth" });
		});

		apostleContent.appendChild(anchor1);

		const versesList1 = document.createElement("div");
		for (const verseNumber in chapter1.verses) {
			const verseItem = document.createElement("p");
			//verseItem.style.display = "inline";
			const verseText1 = chapter1.verses[verseNumber]
				//.replace(/([.,:;])/g, "$1 ")
				//.replace(/\s+/g, " ")
			//.replace(/([^.,:;])$/, "$1 ");
			verseItem.textContent = `${verseNumber}: ${verseText1}`;
			versesList1.appendChild(verseItem);
		}
		chapterDiv1.appendChild(versesList1);
		readingDiv1.appendChild(chapterDiv1);

		// Create chapter div for second chapter
		const chapterDiv2 = document.createElement("div");
		chapterDiv2.classList.add("chapter");

		const chapterTitle2 = document.createElement("h3");
		chapterTitle2.textContent = chapter2.book + ", " + chapter2.chapter;
		chapterDiv2.appendChild(chapterTitle2);

		// Create anchor for second chapter
		const anchor2 = document.createElement("a");
		anchor2.style.display = "inline-block";
		anchor2.href = "#";

		anchor2.textContent = isPortraitMode()
			? getShortText(chapter2.book) +
			  " " +
			  chapter2.chapter.replace(/\D/g, "")
			: chapter2.book + ", " + chapter2.chapter;
		anchor2.setAttribute(
			"aria-label",
			"Go to " + chapter2.book + ", " + chapter2.chapter
		);

		anchor2.addEventListener("click", function (event) {
			event.preventDefault();
			chapterDiv2.scrollIntoView({ behavior: "smooth" });
		});

		apostleContent2.appendChild(anchor2);

		const versesList2 = document.createElement("div");
		for (const verseNumber in chapter2.verses) {
			const verseItem = document.createElement("p");
			//verseItem.style.display = "inline";
			const verseText2 = chapter2.verses[verseNumber]
			//	.replace(/([.,:;])/g, "$1 ")
				//.replace(/\s+/g, " ")
			//	.replace(/([^.,:;])$/, "$1 ");
			verseItem.textContent = `${verseNumber}: ${verseText2}`;
			versesList2.appendChild(verseItem);
		}
		chapterDiv2.appendChild(versesList2);
		readingDiv2.appendChild(chapterDiv2);
	}
}

// Example usage
loadBooks().then(() => {
	displayTodaysReading();
});

// имена о здравии
const jsonDataElement = document.getElementById("json-data");
let jsonData = [];

// Load JSON data from file (cache-busting query param)
fetch("/Ozdravii.json?t=" + new Date().getTime())
  .then((response) => response.json())
  .then((data) => {
    jsonData = data;
    renderJsonData();
  })
  .catch((err) => {
    console.error("Failed to load JSON:", err);
    jsonDataElement.textContent = "Ошибка загрузки данных.";
  });

function renderJsonData() {
  const groupedData = groupRepeatingElements(jsonData);
  renderGroupedData(groupedData);
}

function groupRepeatingElements(data) {
  const groupedData = {};
  const nonRepeatingElements = [];
  data.forEach((item) => {
    const words = item.split(" ");
    if (
      words.length > 1 &&
      !words.includes("мл.") &&
      !words.includes("отр.") &&
      !words.includes("отрок.") &&
      !words.includes("воина") &&
      !words.includes("болящ.") &&
      !words.includes("Дионисия") &&
      !words.includes("Любови") &&
      !words.includes("Ольги") &&
      !words.includes("Егора") &&
      !words.includes("Илларии") &&
      !words.includes("Валентины")
    ) {
      const key = words[0];
      if (!groupedData[key]) {
        groupedData[key] = [];
      }
      groupedData[key].push(words.slice(1).join(" "));
    } else {
      nonRepeatingElements.push(item);
    }
  });
  return { groupedData, nonRepeatingElements };
}

function renderGroupedData({ groupedData, nonRepeatingElements }) {
  // Clear container
  jsonDataElement.innerHTML = "";

  // Create table
  const table = document.createElement("table");
  table.style.width = "100%";
  table.style.borderCollapse = "collapse";
 
  // Create header
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  const thName = document.createElement("th");
  thName.textContent = "Сан";
  styleCell(thName, true);
  const thDetails = document.createElement("th");
  thDetails.textContent = "Имя";
  styleCell(thDetails, true);
  //thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create body
  const tbody = document.createElement("tbody");

  // Grouped items: each key becomes a row; details are a list or single string
  Object.keys(groupedData).forEach((key) => {
    const tr = document.createElement("tr");

    const nameTd = document.createElement("td");
    nameTd.textContent = key;
    styleCell(nameTd);

    const detailsTd = document.createElement("td");
    styleCell(detailsTd);
    const subitems = groupedData[key]; // array of strings
    if (subitems.length === 1) {
      detailsTd.textContent = subitems[0];
    } else {
      // Bullet list inside cell
      const ul = document.createElement("ul");
      ul.style.margin = "0";
      ul.style.paddingLeft = "18px";
      subitems.forEach((s) => {
        const li = document.createElement("li");
        li.textContent = s;
        ul.appendChild(li);
      });
      detailsTd.appendChild(ul);
    }
    headerRow.appendChild(thName);
    headerRow.appendChild(thDetails);
    tr.appendChild(nameTd);
    tr.appendChild(detailsTd);
    tbody.appendChild(tr);
  });

  // Non-repeating elements: show each as a full-row (span both columns)
  nonRepeatingElements.forEach((item) => {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.textContent = item;
    td.colSpan = 2;
    styleCell(td);
    tr.appendChild(td);
    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  jsonDataElement.appendChild(table);
}

// Helper: consistent cell styling
function styleCell(cell, isHeader = false) {
  cell.style.border = "1px solid darkgrey";
  cell.style.padding = "8px";
  cell.style.verticalAlign = "top";
  if (isHeader) {
    cell.style.background = "#f5f5f5";
    cell.style.fontWeight = "600";
    cell.style.textAlign = "left";
  }
}

// имена о упокоении
const oupokoyeniiList = document.getElementById("oupokoyenii-json");
let oupokoyeniiData = [];

// Load JSON data (cache-busting)
fetch("/Oupokoyenii.json?t=" + new Date().getTime())
  .then((response) => response.json())
  .then((data) => {
    oupokoyeniiData = data;
    renderOupokoyeniiList();
  })
  .catch((err) => {
    console.error("Failed to load Oupokoyenii.json:", err);
    if (oupokoyeniiList) oupokoyeniiList.textContent = "Ошибка загрузки данных.";
  });

function renderOupokoyeniiList() {
  if (!oupokoyeniiList) return;

  // Clear container
  oupokoyeniiList.innerHTML = "";

  // Create table
  const table = document.createElement("table");
  table.style.width = "100%";
  table.style.borderCollapse = "collapse";
 

  // Header row (optional)
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  const thIndex = document.createElement("th");
  thIndex.textContent = "#";
  styleCell(thIndex, true);
  const thName = document.createElement("th");
  thName.textContent = "Имя";
  styleCell(thName, true);
  //headerRow.appendChild(thIndex);
//  headerRow.appendChild(thName);
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Body
  const tbody = document.createElement("tbody");

  oupokoyeniiData.forEach((item, index) => {
    const tr = document.createElement("tr");

    const idxTd = document.createElement("td");
    idxTd.textContent = index + 1;
    styleCell(idxTd);

    const nameTd = document.createElement("td");
    nameTd.textContent = `\u2626\uFE0E ${item}`;
	// ☦
    styleCell(nameTd);

    //tr.appendChild(idxTd);
    tr.appendChild(nameTd);
    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  oupokoyeniiList.appendChild(table);
}

// Local helper so this file is self-contained
function styleCell(cell, isHeader = false) {
  cell.style.border = "1px solid darkgrey";
  cell.style.padding = "8px";
  cell.style.verticalAlign = "top";
  if (isHeader) {
    cell.style.background = "#f5f5f5";
    cell.style.fontWeight = "600";
    cell.style.textAlign = "left";
  }
}

// Пролог
const prologElement = document.querySelector(".prolog");
const prologContent = document.querySelector(".prolog-content");
const prologTitleNumberElement = document.querySelector(".prologTitleNumber");

if (prologElement) {
	fetch("prolog.json")
		.then((response) => response.json())
		.then((data) => {
			const currentDate = new Date();
			const currentDay = currentDate.getDate();
			const currentMonth = currentDate.getMonth();

			const gregorianMonths = {
				0: "января",
				1: "февраля",
				2: "марта",
				3: "апреля",
				4: "мая",
				5: "июня",
				6: "июля",
				7: "августа",
				8: "сентября",
				9: "октября",
				10: "ноября",
				11: "декабря",
			};

			const currentMonthName = gregorianMonths[currentMonth];

			const todayPrologs = data.filter(function (item) {
				const datePattern = /^(\d+)\s*([а-яА-ЯёЁ]+)/;
				const match = item.date.match(datePattern);

				if (match) {
					const day = parseInt(match[1]);
					const monthName = match[2];

					return day === currentDay && monthName === currentMonthName;
				}
				return false;
			});

			if (todayPrologs.length > 0) {
				todayPrologs.forEach(function (prolog, index) {
					const titleElement = document.createElement("h3");
					titleElement.textContent = prolog.title;
					const dateElement = document.createElement("p");
					dateElement.style.textAlign = "center";
					dateElement.textContent = `${orthodoxDate.getDate()} ${orthodoxMonth} (${
						prolog.date
					})`;

					const subtitleElement = document.createElement("p");
					subtitleElement.style.textAlign = "center";
					subtitleElement.style.fontStyle = "italic";
					subtitleElement.textContent = prolog.subtitle;

					const textElement = document.createElement("p");
					textElement.textContent = prolog.text;

					const anchor = document.createElement("a");
					anchor.style.display = "inline-block";

					anchor.href = "#";

					// Check if the title is too long and create a shorter label
					const titleWords = prolog.title.split(" ");
					if (titleWords.length > 3) {
						if (todayPrologs.length > 1) {
							anchor.textContent = `Пролог ${index + 1}`;
						} else {
							anchor.textContent = "Пролог";
						}
					} else {
						anchor.textContent = prolog.title;
					}

					anchor.setAttribute("aria-label", "Go to " + prolog.title);

					anchor.addEventListener("click", function (event) {
						event.preventDefault();
						titleElement.scrollIntoView({ behavior: "smooth" });
					});
					
					prologContent.appendChild(anchor);
					prologContent.appendChild(document.createTextNode(" | "));

					prologElement.appendChild(titleElement);

					prologElement.appendChild(dateElement);
					prologElement.appendChild(subtitleElement);
					prologElement.appendChild(textElement);
				});
				const lastChild = prologContent.lastChild;
				if (lastChild) {
					prologContent.removeChild(lastChild);
				}
				
				
				// Create and append <br> after the last anchor
const lineBreak = document.createElement("br");
prologContent.appendChild(lineBreak); // Append line break after the last anchor


				// Calculate the number of titles and append it to the prologTitleNumberElement
				if (prologTitleNumberElement) {
					const titleCount = todayPrologs.length;

					//prologTitleNumberElement.textContent = `Прологов на сегодня(${orthodoxDate.getDate()} ${orthodoxMonth}): ${titleCount}`;
					//prologTitleNumberElement.style.color = "#E39696";
				}
			} else {
				const prologNotFound = document.createElement("p");
				prologNotFound.textContent = "На сегодня пролога нет.";
				prologElement.appendChild(prologNotFound);
			}
		})
		.catch(function (error) {
			console.error("Error fetching prolog data:", error);
		});
} else {
	console.error("Prolog element not found in the DOM");
}

// последование Панихиды

const xhrPanikhida = new XMLHttpRequest();
xhrPanikhida.open("GET", "static/panikhida.html", true);
xhrPanikhida.onload = function () {
	if (xhrPanikhida.status === 200) {
		const panikhidaContainer = document.getElementById(
			"panikhida-container"
		);
		panikhidaContainer.innerHTML = xhrPanikhida.responseText;

		const saturdayText = document.getElementById("panikhida");
		const contentsPanikhida = document.querySelector(".panikhidaContents");
		const oglavlenie = document.getElementById("oglavlenie");

		if (saturdayText && contentsPanikhida && oglavlenie) {
			const currentDay = new Date().getDay();
			const currentHour = new Date().getHours();

			if (currentDay === 6 && currentHour < 14) {
				saturdayText.style.display = "block";
				const chapterTitle = saturdayText.querySelector("h1");
				const chapterLink = document.createElement("a");
				chapterLink.textContent = `Последование Панихиды`;
				chapterLink.href = `#`;

				chapterLink.onclick = function () {
					chapterTitle.scrollIntoView({ behavior: "smooth" });
					return false;
				};
				contentsPanikhida.innerHTML = "";
				contentsPanikhida.appendChild(chapterLink);
			} else {
				saturdayText.style.display = "none";
			}

			let touchStartTime;
			let timeoutId;
			oglavlenie.addEventListener("touchstart", function (event) {
				touchStartTime = new Date().getTime();
				timeoutId = setTimeout(function () {
					// Trigger the display of the saturdayText
					saturdayText.style.display = "block";
					const chapterTitle = saturdayText.querySelector("h1");
					const chapterLink = document.createElement("a");
					chapterLink.textContent = `Последование Панихиды`;
					chapterLink.href = `#`;

					chapterLink.onclick = function () {
						chapterTitle.scrollIntoView({ behavior: "smooth" });
						return false;
					};
					contentsPanikhida.innerHTML = "";
					contentsPanikhida.appendChild(chapterLink);
				}, 5000);
			});

			oglavlenie.addEventListener("touchend", function (event) {
				clearTimeout(timeoutId);
			});
		}
	}
};
//xhrPanikhida.send();

// Молитвы на сон грядущим
const xhrPrayersNight = new XMLHttpRequest();
xhrPrayersNight.open("GET", "static/prayersnight.html", true);
xhrPrayersNight.onload = function () {
	if (xhrPrayersNight.status === 200) {
		const prayersNightContainer = document.getElementById(
			"prayersnight-container"
		);
		prayersNightContainer.innerHTML = xhrPrayersNight.responseText;

		const fridayText = document.getElementById("prayersnight");
		const contentsPrayersNight = document.querySelector(
			".prayersnightContents"
		);

		if (fridayText && contentsPrayersNight) {
			fridayText.style.display = "block";
			const chapterTitle = fridayText.querySelector("h1");
			const chapterLink = document.createElement("a");
			chapterLink.textContent = `Мл҃твы на со́нъ грѧдꙋ́щым.`;
			chapterLink.href = `#`;

			chapterLink.onclick = function () {
				chapterTitle.scrollIntoView({ behavior: "smooth" });
				return false;
			};
			contentsPrayersNight.innerHTML = "";
			contentsPrayersNight.appendChild(chapterLink);
		}
	}
};
xhrPrayersNight.send();

// Ночной режим

function invertColors() {
  var currentTimeForEvenimg = new Date().getHours();

  if (currentTimeForEvenimg >= 19 || currentTimeForEvenimg < 19) {
    
    
    
    const observer = new MutationObserver(() => {
		
	
  document.querySelectorAll(".popup").forEach((popup) => {
  popup.style.border = "0.1px solid black";
  popup.style.color = "black";
});

document.querySelectorAll(".list-button").forEach((button) => {
  button.style.border = "0.1px solid black";
  button.style.color = "black";
});

document.querySelectorAll(".menu").forEach((menu) => {
  menu.style.border = "0.1px solid black";
  menu.style.color = "black";
});
	
	//document.body.style.background = "#e5e2dc"; // add this line to change the background color
	
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  } else {
    document.body.style.filter = "invert(0%)";
  }
}

// Call the function initially
invertColors();

// Call the function every hour to update the colors
setInterval(invertColors, 3600000); // 3600000 milliseconds = 1 hour



// Прыжок к закладкам
function blinkRedAndUnhighlight(element, times = 3) {
  if (!element) return;
  const origBg = element.style.backgroundColor || '';
  const origTransition = element.style.transition || '';
  let count = 0;
  function toggle() {
    element.style.transition = "background-color 0.15s";
    element.style.backgroundColor = (count % 2 === 0) ? "rgba(255,0,0,0.6)" : origBg;
    count++;
    if (count < times * 2) {
      setTimeout(toggle, 150);
    } else {
      element.style.backgroundColor = origBg;
      element.style.transition = origTransition;
      element.classList.remove("highlighted");
    }
  }
  toggle();
}

document.addEventListener("DOMContentLoaded", function() {
  let lastScrollTop = 0;

  function intToRoman(num) {
    const romanNumerals = {
      1: 'I', 4: 'IV', 5: 'V', 9: 'IX',
      10: 'X', 40: 'XL', 50: 'L', 90: 'XC',
      100: 'C', 400: 'CD', 500: 'D', 900: 'CM',
      1000: 'M'
    };
    let result = '';
    let decimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    for (let i = 0; i < decimal.length; i++) {
      while (num >= decimal[i]) {
        result += romanNumerals[decimal[i]];
        num -= decimal[i];
      }
    }
    return result;
  }

  function blinkHighlight(element, times) {
    if (!element) return;
    let count = 0;
    function blink() {
      element.classList.toggle("highlighted");
      count++;
      if (count < times * 2) {
        setTimeout(blink, 200);
      } else {
        element.classList.add("highlighted");
      }
    }
    blink();
  }

  const ruCache = {};

  async function loadRuBook(filename) {
    if (!filename) return null;
    const possiblePaths = [filename, `books/ru/${filename}`, `books/RU/${filename}`, `ru/${filename}`, `books/RU/ru/${filename}`, `books/ru/ru/${filename}`];
    for (const path of possiblePaths) {
      if (ruCache[path]) return ruCache[path];
      try {
        const resp = await fetch(path);
        if (!resp.ok) continue;
        const json = await resp.json();
        ruCache[path] = json;
        return json;
      } catch (e) {
      }
    }
    return null;
  }

  function showRuSnippet(text, anchorElement) {
    const existing = document.querySelector(".ru-snippet-popup");
    if (existing) existing.remove();

    const popup = document.createElement("div");
    popup.classList.add("ru-snippet-popup");
    popup.style.position = "absolute";
    popup.style.zIndex = 2000;
    popup.style.maxWidth = "40vw";
    popup.style.background = "rgba(0,0,0,0.8)";
    popup.style.color = "white";
    popup.style.padding = "8px";
    popup.style.borderRadius = "8px";
    popup.style.fontSize = "0.9em";
    popup.style.boxShadow = "0 6px 20px rgba(0,0,0,0.4)";
    popup.textContent = text;

    document.body.appendChild(popup);
    const rect = (anchorElement && anchorElement.getBoundingClientRect) ? anchorElement.getBoundingClientRect() : { right: 0, top: 0 };
    popup.style.left = `${rect.right + 8 + window.scrollX}px`;
    popup.style.top = `${rect.top + window.scrollY}px`;

    setTimeout(() => {
      popup.style.transition = "opacity 200ms";
      popup.style.opacity = "0";
      setTimeout(() => popup.remove(), 3000);
    }, 3500);
  }

  async function updatePopups() {
    document.querySelectorAll(".popup").forEach(p => p.remove());
    const existingMenu = document.querySelector(".menu");
    if (existingMenu) existingMenu.remove();
    const existingListButton = document.querySelector(".list-button");
    if (existingListButton) existingListButton.remove();

    const isPortrait = window.innerHeight > window.innerWidth;
    const maxPopups = isPortrait ? 6 : 15;

    const allHighlighted = Array.from(document.querySelectorAll("p.highlighted"));

    if (allHighlighted.length > maxPopups) {
      const attempted = allHighlighted[allHighlighted.length - 1];
      const currentPopupsBefore = 0;
      if (currentPopupsBefore === 0 || allHighlighted.indexOf(attempted) >= maxPopups) {
        blinkRedAndUnhighlight(attempted, 3);
      }
    }

    const highlightedParagraphs = allHighlighted.slice(0, maxPopups);
    if (highlightedParagraphs.length === 0) return;

    highlightedParagraphs.forEach((paragraph, index) => {
      const popup = document.createElement("div");
      popup.classList.add("popup");
      popup.innerHTML = `<a href="#" data-index="${index}">${intToRoman(index + 1)}</a>`;
      document.body.appendChild(popup);
    });

    const popups = document.querySelectorAll(".popup");
    let left = 10;
    popups.forEach(popup => {
      popup.style.position = "fixed";
      popup.style.top = `${window.scrollY + 10}px`;
      popup.style.left = `${left}px`;
      popup.style.zIndex = "1000";
      popup.style.background = "rgba(255, 255, 255, 0.12)";
      popup.style.backdropFilter = "blur(10px)";
      popup.style.borderRadius = "12px";
      popup.style.padding = "6px";
      popup.style.display = "inline-block";
      popup.style.color = "white";
      popup.style.fontWeight = "bold";
      popup.style.opacity = "1";
      popup.style.transform = "translateY(0)";
      left += 34;
    });

    const listButton = document.createElement("div");
    listButton.classList.add("list-button");
    listButton.innerHTML = "К списку";
    listButton.style.position = "fixed";
    listButton.style.top = `${window.scrollY + 10}px`;
    listButton.style.left = `${left}px`;
    listButton.style.zIndex = "1000";
    listButton.style.background = "rgba(255, 255, 255, 0.12)";
    listButton.style.backdropFilter = "blur(10px)";
    listButton.style.borderRadius = "12px";
    listButton.style.padding = "6px";
    listButton.style.display = "inline-block";
    listButton.style.color = "white";
    listButton.style.fontWeight = "bold";
    document.body.appendChild(listButton);

    const menu = document.createElement("div");
    menu.classList.add("menu");
    menu.style.position = "fixed";
    menu.style.top = `${window.scrollY + 50}px`;
    menu.style.left = "10px";
    menu.style.zIndex = "1000";
    menu.style.background = "rgba(255, 255, 255, 0.12)";
    menu.style.backdropFilter = "blur(10px)";
    menu.style.borderRadius = "12px";
    menu.style.padding = "10px";
    menu.style.display = "none";
    menu.style.color = "white";
    menu.style.fontSize = "0.9em";
    menu.style.fontWeight = "bold";
    document.body.appendChild(menu);

    menu.innerHTML = "";
    highlightedParagraphs.forEach((paragraph, index) => {
      const menuItem = document.createElement("div");
      menuItem.classList.add("menu-item");
      menuItem.style.marginBottom = "6px";
      menuItem.style.overflow = "hidden";
      const text = paragraph.textContent.replace(/\s+/g, " ").trim().substring(0, 60);
      const paragraphText = document.createElement("span");
      paragraphText.innerHTML = `${intToRoman(index + 1)}. ${text}...`;
      menuItem.appendChild(paragraphText);

      const buttonContainer = document.createElement("div");
      buttonContainer.style.float = "right";
      buttonContainer.style.display = "inline-flex";
      buttonContainer.style.gap = "6px";

      const unhighlightButton = document.createElement("button");
      unhighlightButton.classList.add("unhighlight-button");
      unhighlightButton.setAttribute("data-index", index);
      unhighlightButton.title = "Убрать";
      unhighlightButton.style.cursor = "pointer";
      unhighlightButton.textContent = "🏷️";

      const copyButton = document.createElement("button");
      copyButton.classList.add("copy-button");
      copyButton.setAttribute("data-index", index);
      copyButton.title = "Копировать";
      copyButton.style.cursor = "pointer";
      copyButton.textContent = "📄";

      const ruButton = document.createElement("button");
      ruButton.classList.add("ru-button");
      ruButton.setAttribute("data-index", index);
      ruButton.title = "Показать RU";
      ruButton.style.cursor = "pointer";
      ruButton.textContent = "RU";

      buttonContainer.appendChild(unhighlightButton);
      buttonContainer.appendChild(copyButton);
      buttonContainer.appendChild(ruButton);
      menuItem.appendChild(buttonContainer);
      menu.appendChild(menuItem);

      ruButton.addEventListener("click", async function(e) {
        e.stopPropagation();
        const idx = parseInt(ruButton.getAttribute("data-index"), 10);
        const paragraphEl = highlightedParagraphs[idx];
        if (!paragraphEl) return;

        const bookAttr = paragraphEl.getAttribute("data-book");
        const chapterAttr = paragraphEl.getAttribute("data-chapter");
        const verseAttr = paragraphEl.getAttribute("data-verse");

        const inferBookFromPath = () => {
          const meta = document.querySelector('meta[name="book"]');
          if (meta) return meta.getAttribute("content");
          const s = location.pathname.split("/").pop();
          return s || null;
        };

        const baseFilename = (bookAttr && bookAttr.split("/").pop()) || inferBookFromPath();

        if (!baseFilename && !chapterAttr && !verseAttr) {
          showRuSnippet("No identifiers on paragraph.", ruButton);
          return;
        }

        const ruBook = await loadRuBook(baseFilename || `${baseFilename}`);
        if (!ruBook) {
          showRuSnippet("RU book not found.", ruButton);
          return;
        }

        const chapKey = chapterAttr || Object.keys(ruBook).find(k => /^Глава\s*\d+/i.test(k));
        const ruChapter = ruBook[chapKey];
        if (!ruChapter) {
          showRuSnippet("RU chapter not found.", ruButton);
          return;
        }

        let ruVerseText = null;
        if (verseAttr && ruChapter[verseAttr]) ruVerseText = ruChapter[verseAttr];
        if (!ruVerseText && verseAttr) {
          const altKey = Object.keys(ruChapter).find(k => k.replace(/\D/g,'') === String(verseAttr).replace(/\D/g,''));
          if (altKey) ruVerseText = ruChapter[altKey];
        }
        if (!ruVerseText) {
          const firstKey = Object.keys(ruChapter).find(k => /^\d+/.test(k));
          if (firstKey) ruVerseText = ruChapter[firstKey];
        }
        if (!ruVerseText) {
          showRuSnippet("RU verse not found.", ruButton);
          return;
        }

        showRuSnippet(ruVerseText, ruButton);
      });

      copyButton.addEventListener("click", function(ev) {
        ev.stopPropagation();
        const idx = parseInt(copyButton.getAttribute("data-index"), 10);
        const paragraph = highlightedParagraphs[idx];
        if (!paragraph) return;
        navigator.clipboard.writeText(paragraph.textContent).then(function() {
        }, function(err) {
          console.error("Could not copy text: ", err);
        });
      });

      unhighlightButton.addEventListener("click", function(ev) {
        ev.stopPropagation();
        const idx = parseInt(unhighlightButton.getAttribute("data-index"), 10);
        const paragraph = highlightedParagraphs[idx];
        if (!paragraph) return;
        paragraph.classList.remove("highlighted");
        updatePopups();
      });
    });

    listButton.addEventListener("click", function() {
      menu.style.display = menu.style.display === "none" ? "block" : "none";
    });
  }

  document.addEventListener("click", function(event) {
    if (event.target.tagName === "P") {
      event.target.classList.toggle("highlighted");
      updatePopups();
    }
  });

  let timeoutId = null;
  let scrollSpeed = 0;
  window.addEventListener("scroll", function() {
    const scrollTop = window.scrollY;
    const popups = document.querySelectorAll(".popup");
    popups.forEach(popup => {
      popup.style.top = `${scrollTop + 10}px`;
    });
    const listButton = document.querySelector(".list-button");
    if (listButton) {
      listButton.style.top = `${scrollTop + 10}px`;
    }

    const menu = document.querySelector(".menu");
    if (menu) {
      menu.style.top = `${scrollTop + 50}px`;
    }

    if (scrollTop < lastScrollTop) {
      const threshold = 3;
      if (lastScrollTop - scrollTop > threshold) {
        popups.forEach(popup => {
          popup.style.opacity = 1;
          popup.style.transform = 'translateY(0)';
        });
        if (listButton) {
          listButton.style.opacity = 1;
          listButton.style.transform = 'translateY(0)';
        }
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
      }
    } else {
      scrollSpeed = scrollTop - lastScrollTop;
      if (scrollSpeed > 3) {
        popups.forEach(popup => {
          popup.style.opacity = 0;
          popup.style.transform = 'translateY(10px)';
        });
        if (listButton) {
          listButton.style.opacity = 0;
          listButton.style.transform = 'translateY(10px)';
        }
      } else {
        if (!timeoutId) {
          timeoutId = setTimeout(function() {
            popups.forEach(popup => {
              popup.style.opacity = 0;
              popup.style.transform = 'translateY(10px)';
            });
            if (listButton) {
              listButton.style.opacity = 0;
              listButton.style.transform = 'translateY(10px)';
            }
            timeoutId = null;
          }, 1000);
        }
      }
    }

    lastScrollTop = scrollTop;
  });

  document.addEventListener("click", function(event) {
    if (event.target.tagName === "A" && event.target.parentNode.classList.contains("popup")) {
      event.preventDefault();
      const index = parseInt(event.target.getAttribute("data-index"), 10);
      const isPortrait = window.innerHeight > window.innerWidth;
      const maxPopups = isPortrait ? 6 : 15;
      const highlightedParagraphs = Array.from(document.querySelectorAll("p.highlighted")).slice(0, maxPopups);
      const paragraph = highlightedParagraphs[index];
      if (!paragraph) return;
      setTimeout(function() {
        blinkHighlight(paragraph, 3);
        window.scrollTo({ top: paragraph.offsetTop, behavior: "smooth" });
      }, 100);
    }
  });

  updatePopups();

  window.addEventListener("resize", function() {
    updatePopups();
  });
});

//проверка дат


// Загрузка с нуля

window.onload = function () {
	window.scrollTo(0, 0);
};
