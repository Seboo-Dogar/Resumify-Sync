import React, { useEffect, useState } from 'react'
import { getLightColorFromImage } from '../../utils/helper';

const ResumeSummaryCard = ({imgUrl, title, lastUpdated, onSelect}) => {
    const [bgcolor, setBgcolor] = useState('#ffffff');

    useEffect(() => {
        if(imgUrl){
            getLightColorFromImage(imgUrl).then((color) => setBgcolor(color)).catch(setBgcolor('#ffffff'));
        }
    },[imgUrl])
  return (
    <div className='h-[300px] flex flex-col items-center justify-between bg-white rounded-lg cursor-pointer border border-gray-200 hover:border-purple-300 overflow-hidden' style={{backgroundColor: bgcolor}} onClick={onSelect}>
        <div className='p-4'>
            {imgUrl ? (<img src={imgUrl} alt='resume' className='w-full h-[200px] rounded' />) : (<div></div>)}
        </div>
        <div className='w-full bg-white px-4 py-3'>
            <h5 className='text-sm font-medium truncate overflow-hidden whitespace-nowrap'>{title}</h5>
            <p className='text-xs font-medium text-gray-500 mt-0.5'>Last Updated: {lastUpdated}</p>
        </div>
    </div> 
  )
}

export default ResumeSummaryCard;