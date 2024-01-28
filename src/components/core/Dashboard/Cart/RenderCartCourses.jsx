import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegStar, FaStar } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { removeFromCart } from '../../../../slices/cartSlice';
function RenderCartCourses() {
  
    const {cart} = useSelector((state) => state.cart);
    const dispatch = useDispatch();
  return (
    <div>
        {
            cart.map((course, index) => (
               <div>
                <div>
                <img src={course.thumbnail} alt="courses" />
                <div>
                <p>{course?.courseName}</p>
                <p>{course?.category?.name}</p>
                <div>
                    <span>4.8</span>
                    <ReactStars
                    count={5}
                    size={20}
                    activeColor="#ffd700"
                    edit={false}
                    emptyIcon={<FaRegStar />}
                    fullIcon={<FaStar />}
                    />
                    <span>{course?.ratingAndReviews?.length} Ratings</span>

                    </div>
                  </div>
                </div>
                <div>
                  <button
                  onClick={() => dispatch(removeFromCart(course._id))}
                  >
                     <RiDeleteBin6Fill /> <span>Remove</span>
                  </button>
                  <p>Rs {course?.price} </p>
                </div>
               </div> 
            ))
        } 
    </div>
  )
}
export default RenderCartCourses