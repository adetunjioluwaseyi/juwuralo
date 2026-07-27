'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

const heroSlides = [
  {
    src: '/images/o.jpg',
    alt: 'Couple wearing purple and gold Aso Oke traditional attire with coral beads',
  },
  {
    src: '/images/g.jpg',
    alt: 'Model wearing a rich purple Aso Oke outfit with elegant draping',
  },
  {
    src: '/images/v.jpg',
    alt: 'Model wearing a warm ivory Aso Oke ensemble with a regal finish',
  },
]

const SLIDE_DURATION = 4000

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const showNextSlide = useCallback(() => {
    setActiveIndex((current) => (current + 1) % heroSlides.length)
  }, [])

  const showPreviousSlide = useCallback(() => {
    setActiveIndex((current) => (current - 1 + heroSlides.length) % heroSlides.length)
  }, [])

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      showNextSlide()
    }, SLIDE_DURATION)
  }, [showNextSlide])

  useEffect(() => {
    startTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [startTimer])

  const handleManualNext = () => {
    showNextSlide()
    startTimer()
  }

  const handleManualPrev = () => {
    showPreviousSlide()
    startTimer()
  }

  const handleSelectSlide = (index: number) => {
    setActiveIndex(index)
    startTimer()
  }

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-[#100A17] min-h-[75vh] sm:min-h-[85vh] lg:min-h-screen select-none"
      aria-labelledby="hero-heading"
    >
      {/* Full-bleed Background Images Stack */}
      <div className="absolute inset-0 z-0">
        {heroSlides.map((slide, index) => {
          const isActive = index === activeIndex
          return (
            <div
              key={slide.src}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                className="h-full w-full object-cover object-[center_25%] md:object-[70%_20%]"
              />
            </div>
          )
        })}

        {/* Left Gradient Overlay to keep text readable without darkening the subjects */}
          <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-r from-[#100A17]/95 via-[#100A17]/70 to-transparent max-w-4xl" /> 
        {/* <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-[#100A17] via-transparent to-transparent h-32 bottom-0" />  */}
      </div>

      {/* Hero Content */}
      <div className="relative z-30 mx-auto flex min-h-[75vh] sm:min-h-[85vh] lg:min-h-screen max-w-7xl items-center px-4 py-24 sm:px-6 lg:px-10">
        <div className="max-w-xl">
          <p className="text-[11px] font-medium tracking-widest text-[#D4AF37] uppercase">
            UK-BASED TRADITIONAL ATTIRE RENTAL
          </p>

          <h1
            id="hero-heading"
            className="mt-6 font-serif text-4xl leading-[1.08] text-balance text-white sm:text-5xl lg:text-6xl"
          >
            Celebrate Your <br className="hidden sm:block" />
            <span className="text-[#D4AF37] italic">Heritage</span> in Style
          </h1>

          <p className="mt-6 max-w-md text-sm leading-relaxed text-white/80 sm:text-base">
            Premium traditional attire and cultural accessories for weddings,
            engagements, photoshoots, and special occasions.
          </p>

          <div className="mt-9 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-8">
            <a
              href="#collections"
              className="rounded-xs bg-[#D4AF37] px-8 py-4 text-center text-[11px] font-semibold tracking-[0.16em] text-black transition-colors hover:bg-[#D4AF37]/90"
            >
              EXPLORE COLLECTION
            </a>
            <a
              href="#book"
              className="group flex items-center justify-center gap-2 rounded-xs border border-[#D4AF37]/50 px-8 py-4 text-[11px] font-semibold tracking-[0.16em] text-[#D4AF37] transition-colors hover:bg-[#D4AF37]/10 sm:border-0 sm:px-0 sm:py-0"
            >
              BOOK A RENTAL
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>

      {/* Nav Controls */}
      <button
        type="button"
        onClick={handleManualPrev}
        aria-label="Show previous image"
        className="absolute left-4 top-1/2 z-50 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 p-3 text-white backdrop-blur-md transition hover:bg-black/70 cursor-pointer active:scale-90"
      >
        <ChevronLeft className="size-6" />
      </button>

      <button
        type="button"
        onClick={handleManualNext}
        aria-label="Show next image"
        className="absolute right-4 top-1/2 z-50 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 p-3 text-white backdrop-blur-md transition hover:bg-black/70 cursor-pointer active:scale-90"
      >
        <ChevronRight className="size-6" />
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 z-50 flex -translate-x-1/2 gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Show slide ${index + 1}`}
            onClick={() => handleSelectSlide(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 cursor-pointer ${
              index === activeIndex
                ? 'bg-[#D4AF37] scale-125'
                : 'bg-white/40 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </section>
  )
}