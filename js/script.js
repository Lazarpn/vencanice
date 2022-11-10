'use strict';
// Selections

const btnSliderLeft = document.querySelector('.slider__btn--left');
const btnSliderRight = document.querySelector('.slider__btn--right');
const slides = document.querySelectorAll('.slide');
const navigation = document.querySelector('.navigation');
const header = document.querySelector('.header');
const linkAppointment = document.querySelector('.navigation__link--apointment');
const appointmetsSection = document.getElementById('appointments');
const menu = document.querySelector('.responsive-menu');
const menuOpen = document.querySelector('.hamburger-menu');
const menuClose = document.querySelector('.close-menu');
const decisionBtn = document.querySelector('.decision__content__btn');
const features = document.getElementById('features');
let curSlide = 0;

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${-slide * 100}%)`)
  );
};

const nextSlide = function () {
  if (curSlide === 4) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  goToSlide(curSlide);
};

const previousSlide = function () {
  if (curSlide === 0) {
    curSlide = 4;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
};

// goToSlide(curSlide);

if (btnSliderLeft && btnSliderRight) {
  btnSliderLeft.addEventListener('click', previousSlide);
  btnSliderRight.addEventListener('click', nextSlide);
}

// STICKY HEADER

const addStickyHeader = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) navigation.classList.add('sticky');
  if (entry.isIntersecting) navigation.classList.remove('sticky');
};
const options = {
  root: null,
  threshold: 0,
  rootMargin: `-${navigation.clientHeight}px`,
};
const headerObs = new IntersectionObserver(addStickyHeader, options);
headerObs.observe(header);

// SMOOTH SCROLLING

linkAppointment.addEventListener('click', function (e) {
  appointmetsSection.scrollIntoView({ behavior: 'smooth' });
});

if (decisionBtn) {
  decisionBtn.addEventListener('click', function () {
    features.scrollIntoView({ behavior: 'smooth' });
  });
}

//

// RESPONSIVE NAVIGATION

if (menuOpen) {
  menuOpen.addEventListener('click', function (e) {
    menu.classList.remove('hidden');
  });
}

if (menuClose) {
  menuClose.addEventListener('click', function (e) {
    menu.classList.add('hidden');
  });
}
