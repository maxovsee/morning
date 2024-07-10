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
  

  
  // каноны по одному в день
  const kanons = document.querySelectorAll('.kanon');
let currentDay = new Date().getDate(); // 1-31
let startIndex = (currentDay) % kanons.length;
let currentKanonIndex = startIndex;

kanons.forEach((kanon, index) => {
  if (index === startIndex) {
    kanon.style.display = 'block';
  } else {
    kanon.style.display = 'none';
  }
});

// Add event listener for swipe gesture
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

let xDown = null;
let yDown = null;

function handleTouchStart(evt) {
  xDown = evt.touches[0].clientX;
  yDown = evt.touches[0].clientY;
};

function handleTouchMove(evt) {
  if ( ! xDown || ! yDown ) {
    return;
  }

  let xUp = evt.touches[0].clientX;
  let yUp = evt.touches[0].clientY;

  let xDiff = xDown - xUp;
  let yDiff = yDown - yUp;

  if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
    if ( xDiff > 0 ) {
      // swipe right
      currentKanonIndex = (currentKanonIndex + 1) % kanons.length;
    } else {
      // swipe left
      currentKanonIndex = (currentKanonIndex - 1 + kanons.length) % kanons.length;
    }
  }

  kanons.forEach((kanon, index) => {
    if (index === currentKanonIndex) {
      kanon.style.display = 'block';
    } else {
      kanon.style.display = 'none';
    }
  });

  /* reset values */
  xDown = null;
  yDown = null;
};


// кафизма в день
const kathismas = document.querySelectorAll('.kathisma');
const today = new Date();
const dayOfYear = today.getDate();

let kathismaIndex = dayOfYear % kathismas.length;
kathismas.forEach((kathisma, index) => {
  if (index === kathismaIndex) {
    kathisma.style.display = 'block';
  } else {
    kathisma.style.display = 'none';
  }
});








