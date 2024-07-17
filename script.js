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


// кафизма в день

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
const jsonDataElementoupokoyenii = document.getElementById('oupokoyenii-json');
let jsonDataoupokoyenii = [];

// Load JSON data from file (assuming it's named data.json)
fetch('Oupokoyenii.json')
  .then(response => response.json())
  .then(data => {
    jsonDataoupokoyenii = data;
    renderJsonData();
  });

function renderJsonData() {
  jsonDataElement.innerHTML = '';
  jsonData.forEach((item, index) => {
    const listItemoupokoyenii = document.createElement('li');
    listItemoupokoyenii.textContent = item;
    jsonDataElement.appendChild(listItemoupokoyenii);
  });
}



