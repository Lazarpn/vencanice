'use strict';
// Selections

const btnSliderLeft = document.querySelector('.slider__btn--left');
const btnSliderRight = document.querySelector('.slider__btn--right');
const slides = document.querySelectorAll('.slide');
const navigation = document.querySelector('.navigation');
const header = document.querySelector('.header');
const appointmetsSection = document.getElementById('appointments');
const menu = document.querySelector('.responsive-menu');
const menuOpen = document.querySelector('.hamburger-menu');
const menuClose = document.querySelector('.close-menu');
const decisionBtn = document.querySelector('.decision__content__btn');
const features = document.getElementById('features');
const headerLogo = document.querySelector('.header__logo');
// Modal images
const modal = document.querySelector('.modal');
const modalImages = document.querySelectorAll('.modal-image');
const modalImage = document.querySelector('.modal__img');
const modalClose = document.querySelector('.modal__close');
const overlay = document.querySelector('.overlay');
// Contact form
const nameInput = document.getElementById('name');
const surnameInput = document.getElementById('surname');
const emailInput = document.getElementById('email');
const phoneNumberInput = document.getElementById('phone');
const messageInput = document.getElementById('message');
const btnSend = document.getElementById('buttonSend');
// ACTIVE LINK LOGIC
const navigationList = document.querySelector('.navigation__list');
const linkList = document.querySelectorAll('.navigation__link');
// LABELS
const labels = document.querySelectorAll('.label');
const inputs = document.querySelectorAll('.input');

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
  if (!entry.isIntersecting) {
    navigation.classList.add('sticky');
    headerLogo.setAttribute('src', '/images/logo-2.webp');
  }
  if (entry.isIntersecting) {
    navigation.classList.remove('sticky');
    headerLogo.setAttribute('src', '/images/logo.webp');
  }
};
const options = {
  root: null,
  threshold: 0,
  rootMargin: `-${navigation.clientHeight}px`,
};
const headerObs = new IntersectionObserver(addStickyHeader, options);
headerObs.observe(header);

// SMOOTH SCROLLING

if (decisionBtn) {
  decisionBtn.addEventListener('click', function () {
    features.scrollIntoView({ behavior: 'smooth' });
  });
}

// RESPONSIVE NAVIGATION

const openModal = function () {
  menu.classList.remove('hidden');
  history.pushState({ modalOpen: true }, '');
};

const closeModal = function () {
  menu.classList.add('hidden');
};

if (menuOpen) {
  menuOpen.addEventListener('click', function (e) {
    openModal();
  });
}

window.addEventListener('popstate', e => {
  // Check if the current history state is null or not
  if (menuClose) {
    // If it is null, it means the back button was pressed
    closeModal();
  }
});

if (menuClose) {
  menuClose.addEventListener('click', function (e) {
    closeModal();
  });
}

// LABEL LOGIC

if (inputs) {
  inputs.forEach(input => {
    input.addEventListener('focus', e => {
      input.nextElementSibling.classList.remove('hidden');
    });

    input.addEventListener('blur', e => {
      input.nextElementSibling.classList.add('hidden');
    });
  });
}

// MODAL IMAGE

let imgSrc;

if (modalImages) {
  modalImages.forEach(img => {
    img.addEventListener('click', function (e) {
      imgSrc = e.target.getAttribute('src');
      modal.classList.remove('hidden');
      modalImage.setAttribute('src', imgSrc);
    });
  });
}

if (modalClose) {
  modalClose.addEventListener('click', function (e) {
    modal.classList.add('hidden');
  });
}

if (modal) {
  document.addEventListener('slide', function (e) {
    e.preventDefault();
    modal.classList.add('hidden');
  });
  modal.addEventListener('click', function (e) {
    if (!e.target.classList.contains('modal__img')) {
      modal.classList.add('hidden');
    }
  });
}

// Contact form

const sendData = function (name, surname, email, phone, message) {
  fetch(`https://gorgo-lux-default-rtdb.firebaseio.com/message.json`, {
    method: 'POST',
    body: JSON.stringify({
      name: name,
      surname: surname,
      email: email,
      phone: phone,
      message: message,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then(function (response) {
    nameInput.value = '';
    surnameInput.value = '';
    phoneNumberInput.value = '';
    emailInput.value = '';
    messageInput.value = '';
    // Display message based on promise
  });
};

if (btnSend) {
  btnSend.addEventListener('click', function (e) {
    e.preventDefault();
    const name = nameInput.value;
    const surname = surnameInput.value;
    const email = emailInput.value;
    const phoneNumber = phoneNumberInput.value;
    const message = messageInput.value;

    // if (name === '' || surname === '' || phoneNumber === '' || message || '') {
    //   return;
    // }

    // console.log(name, surname, email, phoneNumber, message);

    sendData(name, surname, email, phoneNumber, message);
  });
}

// CURRENT ACTIVE LINK LOGIC

if (navigationList) {
  navigationList.addEventListener('click', function (e) {
    if (e.target.classList.contains('navigation__link')) {
      localStorage.setItem('activeLinkId', e.target.getAttribute('id'));
      e.target.classList.add('active-link');
    }
  });
}

if (localStorage.getItem('activeLinkId')) {
  window.addEventListener('load', function () {
    const link = document.getElementById(localStorage.getItem('activeLinkId'));
    link.classList.add('active-link');
  });
}
