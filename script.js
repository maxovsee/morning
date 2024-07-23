let button = document.getElementById("scroll-button");
let windowHeight = window.innerHeight;
let documentHeight = document.body.offsetHeight;

window.addEventListener("scroll", function() {
  let scrollPosition = window.scrollY;
  if (scrollPosition + windowHeight >= documentHeight) {
    button.style.top = "20px";
    button.style.bottom = "auto";
    button.style.display = "block"; // show the button
    mondayText.classList.add("sticky-text"); // Add the sticky-text class
  } else if (scrollPosition <= 0) {
    button.style.top = "auto";
    button.style.bottom = "20px";
    button.style.display = "block"; // show the button
    mondayText.classList.remove("sticky-text"); // Remove the sticky-text class
  } else {
    button.style.display = "none"; // hide the button
    mondayText.classList.remove("sticky-text"); // Remove the sticky-text class
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

const kanons = document.querySelectorAll('.kanon');
let currentDay = new Date().getDate(); // 1-31

let startIndex = (currentDay) % kanons.length;

kanons.forEach((kanon, index) => {
  if (index === startIndex) {
    kanon.classList.add("sticky-text"); // Add the sticky-text class
  } else {
    kanon.classList.remove("sticky-text"); // Remove the sticky-text class
  }
});

const jsonDataElement = document.getElementById('json-data');
let jsonData = [];

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

const oupokoyeniiList = document.getElementById('oupokoyenii-json');
let oupokoyeniiData = [];

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
