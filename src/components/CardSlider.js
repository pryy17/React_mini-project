import React from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import CardMenu from "./CardMenu"

export default function CardSlider() {
  const [sliderRef] = useKeenSlider({
    loop: true,
    breakpoints: {
      "(min-width: 400px)": {
        slides: { perView: 2.5, spacing: 2 },
      },
      "(min-width: 1000px)": {
        slides: { perView: 4.7, spacing: 5},
      },
    },
    slides: { perView: 1 },
  })

  return (
    <div ref={sliderRef} className="keen-slider">
      <div className="keen-slider__slide"> <CardMenu /> </div>
      <div className="keen-slider__slide"> <CardMenu /> </div>
      <div className="keen-slider__slide"> <CardMenu /> </div>
      <div className="keen-slider__slide"> <CardMenu /> </div>
      <div className="keen-slider__slide"> <CardMenu /> </div>
      <div className="keen-slider__slide"> <CardMenu /> </div>
    </div>
  )
}
