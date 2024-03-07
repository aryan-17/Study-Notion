import React, { useEffect, useRef, useState } from "react"
import ReactStars from "react-rating-stars-component"

import { FaStar } from "react-icons/fa"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// Get apiFunction and the endpoint
import { apiConnector } from "../../services/apiconnector"
import { ratingsEndpoints } from "../../services/apis"


function ReviewSlider() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(false);
  const truncateWords = 15

  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: false,
    arrows: false
  };
  useEffect(() => {
    ; (async () => {
      setLoading(true);
      const { data } = await apiConnector(
        "GET",
        ratingsEndpoints.REVIEWS_DETAILS_API
      )
      if (data?.success) {
        setReviews(data?.data)
      }
      setLoading(false);
    })()
  }, [])

  // console.log(reviews)
  return (
    <div className="text-white">
      {
        loading ? (<p>Loading...</p>) : (
          <div className="my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent w-screen">
            <Slider {...settings}>
              {reviews.map((review, i) => {
                return (
                  <div className="pl-10">

                    <div key={i} className="flex flex-col gap-y-5 h-40 p-3 text-[14px] bg-richblack-800 text-richblack-25 mr-10">
                      <div className="flex items-center gap-4">
                        <img
                          src={
                            review?.user?.image
                              ? review?.user?.image
                              : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                          }
                          alt=""
                          className="h-9 w-9 rounded-full object-cover"
                        />
                        <div className="flex flex-col">
                          <h1 className="font-semibold text-richblack-5">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                          <h2 className="text-[12px] font-medium text-richblack-500">
                            {review?.course?.courseName}
                          </h2>
                        </div>
                      </div>
                      <p className="font-medium text-lg text-richblack-25">
                        {review?.review.split(" ").length > truncateWords
                          ? `${review?.review
                            .split(" ")
                            .slice(0, truncateWords)
                            .join(" ")} ...`
                          : `${review?.review}`}
                      </p>
                      <div className="flex items-center gap-2 ">
                        <h3 className="font-semibold text-yellow-100">
                          {review.rating.toFixed(1)}
                        </h3>
                        <ReactStars
                          count={5}
                          value={review.rating}
                          size={20}
                          edit={false}
                          activeColor="#ffd700"
                          emptyIcon={<FaStar />}
                          fullIcon={<FaStar />}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </Slider>
          </div>
        )}
    </div >
  )
}

export default ReviewSlider