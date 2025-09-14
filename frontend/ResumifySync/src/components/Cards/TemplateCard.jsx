import React from 'react'

const TemplateCard = ({thumbnailImg, isSelected, onSelect}) => {
  return (
    <div className={`h-auto md:h-[300px] flex flex-col items-center justify-between bg-white rounded-lg cursor-pointer border border-gray-200 hover:border-purple-300 overflow-hidden
        ${isSelected ? "border-purple-500 border-2" : ""}`}
        onClick={onSelect}
    >
        {thumbnailImg ? (
            <img src={thumbnailImg} alt='resume' className='w-[100%] h-[200px] rounded' />
        ): (
            <div></div>
        )}
    </div>
  )
}

export default TemplateCard;