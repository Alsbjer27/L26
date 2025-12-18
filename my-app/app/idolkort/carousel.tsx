"use client";

import { div } from "three/tsl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Carousel(){

const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1
  };

  return (
    <div className="w-3/4 m-auto bg-gray-200">
      <div className="mt-20">
        <Slider {...settings} className="rounded-xl">
        {data.map((d) =>(
          <div className="bg-white h-[450px] text-black rounded-xl">
            <div className="rounded-t-xl bg-indigo-500 flex justify-center items-center">
              <img src={d.img} alt="Legionär" className="h-50 w-50"/>
            </div>

            <div className="flex flex-col justify-center items-center gap-4 p-4">
              <p className="text-xl font-semibold">{d.name}</p>
              <p className="text-center line-clamp-2">{d.review}</p>
              <button className="bg-red-500 hover:bg-red-700 text-white text-lg px-6 py-1 rounded-xl cursor-pointer">Read More</button>
            </div>
          </div>
        ))}
        </Slider>
      </div>
    </div>
  )
}

const data = [
  {
    name: "John Doe",
    img: "./img1_.png",
    review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    name: "Jane Smith",
    img: "./img2_.png",
    review: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    name: "Johnny Johnsson",
    img: "./img3_.png",
    review: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    name: "Johnny Johnsson",
    img: "./img3_.png",
    review: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    name: "Johnny Johnsson",
    img: "./img2_.png",
    review: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  }
]

export default Carousel;