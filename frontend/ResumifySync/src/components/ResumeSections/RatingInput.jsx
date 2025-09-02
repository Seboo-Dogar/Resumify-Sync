import React from "react";

const RatingInput = ({ value = 0, total = 5, onChange = () => {}, color = "#9125E6", bgColor = "#E9D4FF" }) => {
  // convert 0-100 to 0-5 rating
  const rating = Math.floor((value / 100) * total);

  const handleClicks = (index) => {
    //Convert 0-5 rating to 0-100 rating
    const newValue = Math.round(((index + 1) / total) * 100);
    onChange(newValue);
  };

  return (
    <div className="flex gap-3 cursor-pointer">
        {[...Array(total)].map((_, index) => {
            const isActive = index < rating;

            return (
                <div
                    key={index}
                    className= "w-4 h-4 rounded-md transition-all"
                    onClick={() => handleClicks(index)}
                    style={{ backgroundColor: isActive ? color : bgColor }}
                >
                </div>
            );
        })}
    </div>
  );
};

export default RatingInput;
