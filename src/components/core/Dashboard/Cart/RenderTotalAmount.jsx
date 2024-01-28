import React from 'react'
import { useSelector } from 'react-redux'

function RenderTotalAmount() {
  const {total, cart} = useSelector((state) => state.cart);
  const handleBuyCourse =() => {
    const courses = cart.map((course) => course._id);
    // buy all courses which are in courses list
     console.log("Bought these course: ", courses);
    //Todo: API Integrate -> payment gateway
  }
  return (
    <div>
      <p>Total: </p>
      <p>Rs {total}</p>
      <iconBtn 
      text="Buy Now" 
      onClick={handleBuyCourse}
      customClasses={"w-full justify-center"}
      />
      
    </div>
  )
}

export default RenderTotalAmount