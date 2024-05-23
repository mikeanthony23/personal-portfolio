import '@src/scss/main.scss'

import 'core-js/stable'
import 'regenerator-runtime'
import 'whatwg-fetch'

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

    siteLinkButton.setAttribute('href', currentShownSlide[currentSlide].dataset.siteLink)

    if (!sourceCodeLink) {
      sourceCodeButton.classList.add('hidden')
      sourceCodeButton.setAttribute('href', 'javascript:;')
    }
    if (sourceCodeLink) {
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

  let startX
  let endX

  slider.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX
  })

  slider.addEventListener('touchmove', e => {
    endX = e.touches[0].clientX
  })

  slider.addEventListener('touchend', () => {
    if (startX - endX > 50) {
      changeSlide(1) // swipe left
    } else if (endX - startX > 50) {
      changeSlide(-1) // swipe right
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

parallax('.banner', 0.5)

const emailForm = document.querySelector('.form-area')

const isValidEmail = function (email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// handle form submission
const handleFormSubmit = function (event) {
  event.preventDefault()

  const emailInput = document.querySelector('.form-area__input--email')
  const errorMessage = document.querySelector('.form-area__invalid--email')
  const emailPlaceholder = document.querySelector('.form-area__placeholder--email')

  const email = emailInput.value.trim()
  if (!isValidEmail(email)) {
    errorMessage.classList.remove('error')
    emailPlaceholder.classList.add('error')
  } else {
    emailPlaceholder.classList.remove('error')
    errorMessage.classList.add('error')
  }
}

const marquee = function () {
  const marqueeContainer = document.querySelector('.technology-lists')
  const marqueeClone = marqueeContainer.cloneNode(true)
  ;[...marqueeClone.querySelectorAll('li')].forEach(e => marqueeContainer.append(e))
}

// Event Listeners

window.addEventListener('DOMContentLoaded', marquee)
emailForm.addEventListener('submit', handleFormSubmit)
emailForm.addEventListener('change', handleFormSubmit)
window.addEventListener('scroll', function () {
  parallax('.banner', 0.5)
})
