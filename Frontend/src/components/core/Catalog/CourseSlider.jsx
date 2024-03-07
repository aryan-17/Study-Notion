import React from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Course_Card from './Course_Card'
const CourseSlider = ({ Courses }) => {
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    arrows: false
  };
  return (
    <>
      {Courses?.length ? (
        <Slider
          {...settings}
          className="max-h-[30rem]"
        >
          {Courses?.map((course, i) => {
            return (
              <Course_Card key={i} course={course} Height={"h-[250px]"} />
            )
          })}
        </Slider>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
    </>
  )
}
export default CourseSlider
