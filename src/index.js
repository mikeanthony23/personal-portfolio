import '@src/scss/main.scss'

import 'core-js/stable'
import 'regenerator-runtime'
import 'whatwg-fetch'

const slider = function (sliderParent) {
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
slider('.slider--2 .slider__container')
