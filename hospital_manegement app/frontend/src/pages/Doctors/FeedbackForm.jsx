import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setreviewText] = useState("");

  const hendleSubmitReview = async e=>{
    e.preventDefault()
  }
  return (
    <form action="">

    
    <div>
      <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4">
        How would You rate the overall experience
      </h3>
      <div>
        {[...Array(5).keys()].map((_, index) => {
          index;
          return (
            <button key={index} type="button" className={`${
            index <= ((rating && hover) || hover) ? "text-yellowColor" : "text-gray-400"
            } bg-transparent border-none outline-none text-[22px] cursor-pointer`}
             onClick={() => setRating(index)}
             onMouseEnter={()=> setHover(index)}
             onMouseLeave={()=> setHover(rating)}
             onDoubleClick={()=>{
                setRating(0);
                setHover(0);
             }}
             >
              <span>
                <AiFillStar />
              </span>
            </button>
          );
        })}
      </div>
    </div>
    <div className="mt-[30px]">
        <h3 className="text-headingColor text-[16px] leading-6 font-bold mb-4 mt-0">
            Share Your feedback or suggestions*
        </h3>
        <textarea className="border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md" rows="5" placeholder="Write a your massage"
        onChange={e => setreviewText(e.target.value) }
        ></textarea>
    </div>
    <button type="submit" onClick={hendleSubmitReview } className="btn p-4">
        Submit Feedback
    </button>
    </form>
  );
};

export default FeedbackForm;