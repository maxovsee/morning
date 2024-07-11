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
const kathismaContainer = document.getElementById('kathisma-container');
const kathismas = kathismaContainer.children;
let currentKathismaIndex = 11;

function showNextKathisma() {
  // hide all kathismas
  Array.prototype.forEach.call(kathismas, (kathisma) => {
    kathisma.style.display = 'none';
  });

  // show the next kathisma
  kathismas[currentKathismaIndex].style.display = 'block';

  // increment the index, wrapping around to 0 when we reach the end
  currentKathismaIndex = (currentKathismaIndex + 1) % kathismas.length;
}

// show the first kathisma initially
showNextKathisma();

// show the next kathisma every day
setInterval(showNextKathisma, 24 * 60 * 60 * 1000); // 24 hours







