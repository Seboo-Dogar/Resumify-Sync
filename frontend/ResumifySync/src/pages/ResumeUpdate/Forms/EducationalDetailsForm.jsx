import React from 'react'
import { LuPlus, LuTrash2 } from 'react-icons/lu';
import Input from '../../../components/Inputs/Input';

const EducationalDetailsForm = ({educationInfo, updateArrayItem, addArrayItem, removeArrayItem}) => {
  return (
    <div className='px-5 pt-5'>
        <h2 className="text-lg  font-semibold text-gray-900">Educational Details</h2>

        <div className='mt-4 flex flex-col gap-4 mb-3'>
            {educationInfo.map((education, index) => (
                <div className='border border-gray-200/80 p-4 rounded-lg relative' key={index}>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <Input
                            value={education?.degree || ""}
                            onChange={({ target }) => updateArrayItem(index, "degree", target.value)}
                            label="Degree"
                            placeholder="Bachelor of Science in Software Engineering"
                            type="text"
                        />

                        <Input
                            value={education?.institution || ""}
                            onChange={({ target }) => updateArrayItem(index, "institution", target.value)}
                            label="University / Institution"
                            placeholder="XYZ University"
                            type="text"
                        />

                        <Input
                            value={education?.startDate || ""}
                            onChange={({ target }) => updateArrayItem(index, "startDate", target.value)}
                            label="Start Date"
                            type="month"
                        />

                        <Input
                            value={education?.endDate || ""}
                            onChange={({ target }) => updateArrayItem(index, "endDate", target.value)}
                            label="End Date"
                            type="month"
                        />
                    </div>

                    {educationInfo.length > 1 && (
                        <button className='absolute top-3 right-3 text-sm text-red-600 cursor-pointer hover:underline' type='button' onClick={() => removeArrayItem(index)} >
                            <LuTrash2 />
                        </button>
                    )}
                </div>
            ))}

            <button className='self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800 text-sm font-medium hover:bg-purple-200 cursor-pointer' type='button' onClick={() => addArrayItem({degree: "", institution: "", startDate: "", endDate: ""})}>
                <LuPlus className='' /> Add Education
            </button>
        </div>
    </div>
  )
}

export default EducationalDetailsForm