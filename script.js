let button = document.getElementById("scroll-button");
  let windowHeight = window.innerHeight;
  let documentHeight = document.body.offsetHeight;
  window.addEventListener("scroll", function() {
    let scrollPosition = window.scrollY;
    if (scrollPosition + windowHeight >= documentHeight) {
      button.style.top = "20px";
      button.style.bottom = "auto";
      button.style.display = "block"; // show the button
    } else if (scrollPosition <= 0) {
      button.style.top = "auto";
      button.style.bottom = "20px";
      button.style.display = "block"; // show the button
    } else {
      button.style.display = "none"; // hide the button
    }
  });
  function scrollToTopOrBottom() {
    let scrollPosition = window.scrollY;
    if (scrollPosition + windowHeight >= documentHeight) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (scrollPosition <= 0) {
      window.scrollTo({ top: documentHeight - windowHeight, behavior: 'smooth' });
    }
  }


 
 const mondayText = document.getElementById("monday-text");

 const currentDayPravila = new Date().getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

 if (currentDayPravila === 1) { // 1 = Monday
   mondayText.style.display = "block";
 } else {
   mondayText.style.display = "none";
 }
 

 
 // каноны по одному в день, единственный работающий
 const kanons = document.querySelectorAll('.kanon');
let currentDay = new Date().getDate(); // 1-31

let startIndex = (currentDay) % kanons.length;

kanons.forEach((kanon, index) => {
 if (index === startIndex) {
   kanon.style.display = 'block';
 } else {
   kanon.style.display = 'none';
 }
});


// глава Евангелие в день
const glavy = document.querySelectorAll('.glava');
let currentDayYevangelie = new Date().getDate(); // 1-31

let startIndexYevangelie = (currentDayYevangelie) % glavy.length;

glavy.forEach((glava, index) => {
 if (index === startIndexYevangelie) {
   glava.style.display = 'block';
 } else {
   glava.style.display = 'none';
 }
});


// глава Aпостола в день
const glavyApostol = document.querySelectorAll('.deyaniya');
let currentDayDeyaniya = new Date().getDate(); // 1-31

let startIndexDeyaniya = (currentDayDeyaniya) % glavyApostol.length;

glavyApostol.forEach((deyaniya, index) => {
 if (index === startIndexDeyaniya) {
   deyaniya.style.display = 'block';
 } else {
   deyaniya.style.display = 'none';
 }
});

// кафизма в день
const kathismas = document.querySelectorAll('.kathisma');
let currentDayKathisma = new Date().getDate(); // 1-31
 
kathismas.forEach((kathisma, index) => {
  if ((index + 1) === (currentDayKathisma % 20 + 1)) {
    kathisma.style.display = 'block';
  } else {
    kathisma.style.display = 'none';
  }
});


// имена о здравии
const jsonDataElement = document.getElementById('json-data');
let jsonData = [];

// Load JSON data from file (assuming it's named data.json)
fetch('data.json')
 .then(response => response.json())
 .then(data => {
   jsonData = data;
   renderJsonData();
 });

function renderJsonData() {
 jsonDataElement.innerHTML = '';
 jsonData.forEach((item, index) => {
   const listItem = document.createElement('li');
   listItem.textContent = item;
   jsonDataElement.appendChild(listItem);
 });
}
// имена о упокоении
const oupokoyeniiList = document.getElementById('oupokoyenii-json');
let oupokoyeniiData = [];

// Load JSON data from file (assuming it's named oupokoyenii.json)
fetch('Oupokoyenii.json')
 .then(response => response.json())
 .then(data => {
   oupokoyeniiData = data;
   renderOupokoyeniiList();
 });

function renderOupokoyeniiList() {
 oupokoyeniiList.innerHTML = '';
 oupokoyeniiData.forEach((item, index) => {
   const listItem = document.createElement('li');
   listItem.textContent = item;
   oupokoyeniiList.appendChild(listItem);
 });
}


// Пролог
const linkBase = "https://azbyka.ru/otechnik/Viktor_Gurev/prolog-v-pouchenijah-na-kazhdyj-den-goda/";
let startDate = new Date("2024-07-29"); // adjust the start date as needed
let currentDate = new Date();
let dayDiff = Math.floor((currentDate - startDate) / (1000 * 3600 * 24));
let dailyLinkNumber = (dayDiff % 53) + 393;
if (dailyLinkNumber > 445) {
  dailyLinkNumber = dailyLinkNumber - 445 + 1;
}
let dailyLink = linkBase + dailyLinkNumber;

const linkElement = document.createElement("a");
linkElement.href = dailyLink;
linkElement.textContent = dailyLink;
document.getElementById("daily-link").appendChild(linkElement);
