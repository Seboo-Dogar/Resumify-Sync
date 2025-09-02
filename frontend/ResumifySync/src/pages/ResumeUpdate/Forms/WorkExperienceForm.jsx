import React from 'react';
import { LuPlus, LuTrash2 } from 'react-icons/lu';
import Input from '../../../components/Inputs/Input';

const WorkExperienceForm = ({workExperience, updateArrayItem, addArrayItem, removeArrayItem}) => {
  return (
    <div className='px-5 pt-5'>
        <h2 className="text-lg  font-semibold text-gray-900">Work Experience</h2>

        <div className='mt-4 flex flex-col gap-4 mb-3'>
            {workExperience.map((experience, index) => (
                <div className='border border-gray-200/80 p-4 rounded-lg relative' key={index}>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <Input
                            value={experience?.company || ""}
                            onChange={({ target }) => updateArrayItem(index, "company", target.value)}
                            label="Company"
                            placeholder="XYZ Corporation"
                            type="text"
                        />

                        <Input
                            value={experience?.role || ""}
                            onChange={({ target }) => updateArrayItem(index, "role", target.value)}
                            label="Position"
                            placeholder="Software Engineer"
                            type="text"
                        />

                        <Input
                            value={experience?.startDate || ""}
                            onChange={({ target }) => updateArrayItem(index, "startDate", target.value)}
                            label="Start Date"
                            type="month"
                        />

                        <Input
                            value={experience?.endDate || ""}
                            onChange={({ target }) => updateArrayItem(index, "endDate", target.value)}
                            label="End Date"
                            type="month"
                        />
                    </div>

                    <div className='mt-4'>
                        <label className='text-xs text-slate-600 font-medium'>Description</label>
                        <textarea
                            placeholder='What did you do in this role?'
                            value={experience?.description || ""}
                            onChange={({ target }) => updateArrayItem(index, "description", target.value)}
                            className='form-input w-full mt-1 '
                            rows={3}
                        />
                    </div>
                    {workExperience.length > 1 && (
                        <button className='cursor-pointer absolute top-3 right-3 text-sm text-red-600 hover:underline' type='button' onClick={() => removeArrayItem(index)}>
                            <LuTrash2 />
                        </button>
                    )}
                </div>
            ))}

            <button 
                className='self-start flex items-center gap-2 p-2 px-4 rounded bg-purple-100 text-purple-800 text-sm font-medium hover:bg-purple-200 cursor-pointer' 
                type='button' 
                onClick={() => addArrayItem({company: "", role: "", startDate: "", endDate: "", description: ""})}
            >
                <LuPlus />Add Work Experience
            </button> 
        </div>
    </div>
  )
}

export default WorkExperienceForm;