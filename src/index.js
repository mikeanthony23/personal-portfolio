import '@src/scss/main.scss'

import 'core-js/stable'
import 'regenerator-runtime'

const slider = function (sliderParent, setCurrentSlide) {
  const slider = document.querySelector(sliderParent)
  const slides = slider.querySelectorAll('.slider__slide')
  const totalSlides = slides.length
  const prevButton = document.querySelector('.slider__navigator--prev')
  const nextButton = document.querySelector('.slider__navigator--next')
  let currentSlide = 0

  const showSlide = function (index) {
    if (index < 0) {
      currentSlide = totalSlides - 1
    } else if (index >= totalSlides) {
      currentSlide = 0
    } else {
      currentSlide = index
    }

    const offset = -currentSlide * 100

    slider.style.transform = `translateX(${offset}%)`

    if (!setCurrentSlide) return

    slider.setAttribute('data-current-slide', currentSlide + 1)

    const currentShownSlide = [...document.querySelectorAll('.slider--2 .slider__slide')]
    const sourceCodeLink = currentShownSlide[currentSlide].dataset.sourceCode
    const sourceCodeButton = document.querySelector('.slider__btn--code')
    const siteLinkButton = document.querySelector('.slider__btn--visit')
    const siteLink = currentShownSlide[currentSlide].dataset.siteLink

    if (!siteLink) {
      siteLinkButton.classList.add('hidden')
      siteLinkButton.setAttribute('href', 'javascript:;')
    } else {
      siteLinkButton.classList.remove('hidden')
      siteLinkButton.setAttribute('href', currentShownSlide[currentSlide].dataset.siteLink)
    }

    if (!sourceCodeLink) {
      sourceCodeButton.classList.add('hidden')
      sourceCodeButton.setAttribute('href', 'javascript:;')
    } else {
      sourceCodeButton.classList.remove('hidden')
      sourceCodeButton.setAttribute('href', currentShownSlide[currentSlide].dataset.sourceCode)
    }
  }

  const changeSlide = function (direction) {
    showSlide(currentSlide + direction)
  }

  prevButton.addEventListener('click', () => {
    changeSlide(-1)
  })

  nextButton.addEventListener('click', () => {
    changeSlide(1)
  })

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') {
      changeSlide(-1)
    } else if (e.key === 'ArrowRight') {
      changeSlide(1)
    }
  })

  showSlide(currentSlide)
}
slider('.slider--1 .slider__container')
slider('.slider--2 .slider__container', true)

const parallax = function (element, speed) {
  const scrollPosition = window.scrollY - 200
  const parallaxElement = document.querySelector(element)
  parallaxElement.style.backgroundPositionY = scrollPosition * speed + 'px'
}

const nameInput = document.querySelector('.form-area__input--name')
const emailInput = document.querySelector('.form-area__input--email')
const msgInput = document.querySelector('.form-area__input--text-area')

const nameValidation = function () {
  const nameErrorMsg = document.querySelector('.form-area__invalid--name')
  const namePlaceholder = document.querySelector('.form-area__placeholder--name')

  if (nameInput.value.trim() === '') {
    nameErrorMsg.classList.remove('error')
    namePlaceholder.classList.add('error')
  } else {
    namePlaceholder.classList.remove('error')
    nameErrorMsg.classList.add('error')
  }
}

const msgValidation = function () {
  const msgErrorMsg = document.querySelector('.form-area__invalid--text-area')
  const msgPlaceholder = document.querySelector('.form-area__placeholder--text-area')

  if (msgInput.value.trim() === '') {
    msgErrorMsg.classList.remove('error')
    msgPlaceholder.classList.add('error')
  } else {
    msgPlaceholder.classList.remove('error')
    msgErrorMsg.classList.add('error')
  }
}

const isValidEmail = function (email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const emailValidation = function () {
  const emailErrorMsg = document.querySelector('.form-area__invalid--email')
  const emailPlaceholder = document.querySelector('.form-area__placeholder--email')
  const email = emailInput.value.trim()

  if (!isValidEmail(email)) {
    emailErrorMsg.classList.remove('error')
    emailPlaceholder.classList.add('error')
  } else {
    emailPlaceholder.classList.remove('error')
    emailErrorMsg.classList.add('error')
  }
}

if (emailInput.value.length >= 1) {
  emailInput.focus()
}

const marquee = function () {
  const marqueeContainer = document.querySelector('.technology-lists')
  const marqueeClone = marqueeContainer.cloneNode(true)
  ;[...marqueeClone.querySelectorAll('li')].forEach(e => {
    e.classList.add('clone')
    marqueeContainer.append(e)
  })
}

emailjs.init({
  publicKey: 'F5xBPiDsOTf1Txr2S',
})

document.querySelector('.form-area').addEventListener('submit', function (event) {
  event.preventDefault()

  const emailContent = {
    from_name: document.querySelector('.form-area__input--name').value,
    from_email: document.querySelector('.form-area__input--email').value,
    message: document.querySelector('.form-area__input--text-area').value,
  }

  const contactFormSection = document.querySelector('.contact')

  contactFormSection.insertAdjacentHTML(
    'afterbegin',
    `<div class="contact__loader-container">
  <div class="contact__loader contact__alert-msg">
    <span>S</span>
    <span>E</span>
    <span>N</span>
    <span>D</span>
    <span>I</span>
    <span>N</span>
    <span>G</span>
  </div>
</div>`,
  )

  // these IDs from the previous steps
  emailjs.send('service_73vcqr1', 'template_u2gcl6m', emailContent).then(
    () => {
      document.querySelector('.contact__loader-container').remove()
      contactFormSection.insertAdjacentHTML(
        'afterbegin',
        `<div class="contact__loader-container">
        <div class="contact__alert-msg">
        <span>Email Sent</span>
      </div>
    </div>`,
      )
      setTimeout(() => {
        document.querySelector('.contact__alert-msg').classList.add('contact__alert-msg--sent')
      }, 1000)

      setTimeout(() => {
        document.querySelector('.contact__loader-container').remove()
      }, 2000)
    },
    () => {
      document.querySelector('.contact__loader-container').remove()
      contactFormSection.insertAdjacentHTML(
        'afterbegin',
        `<div class="contact__loader-container">
        <div class="contact__alert-msg contact__alert-msg--error">
          <span>Sending failed please try again</span>
        </div>
      </div>`,
      )
      setTimeout(() => {
        document.querySelector('.contact__alert-msg').classList.add('contact__alert-msg--exit')
      }, 1500)
      setTimeout(() => {
        document.querySelector('.contact__loader-container').remove()
      }, 2000)
    },
  )
})

// Burger Menu

const headerNavigation = document.querySelector('.header__navigation')
const burgerMenuBtn = document.querySelector('.burger-btn__container')
const burgerMenuClose = document.querySelector('.burger-btn__close-btn')

const toggleMenu = () => {
  headerNavigation.classList.toggle('menu-open')
  headerNavigation.classList.add('menu-close')
}

// Event Listeners

window.addEventListener('load', marquee)
nameInput.addEventListener('input', nameValidation)
emailInput.addEventListener('input', emailValidation)
msgInput.addEventListener('input', msgValidation)
burgerMenuBtn.addEventListener('click', toggleMenu)
burgerMenuClose.addEventListener('click', toggleMenu)
