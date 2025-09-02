import React from 'react'
import { LuPlus, LuTrash2 } from 'react-icons/lu';
import Input from '../../../components/Inputs/Input';
import RatingInput from '../../../components/ResumeSections/RatingInput';

const AdditionalInfoForm = ({languages, interests, updateArrayItem, addArrayItem, removeArrayItem}) => {
  return (
    <div className='px-5 pt-5'>
        <h2 className="text-lg  font-semibold text-gray-900">Additional Information</h2>

        <div className='mt-6 '>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Languages</h3>

            <div className='flex flex-col gap-4'>
            {languages.map((language, index) => (
                <div className='border border-gray-200 p-4 rounded-lg relative' key={index}>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-start'>
                        <Input
                            value={language?.name || ""}
                            onChange={({ target }) => updateArrayItem("languages", index, "name", target.value)}
                            label="Language"
                            placeholder="e.g. English"
                            type="text"
                        />

                        <div className=''>
                            <label className='text-xs font-medium text-slate-600 mb-7 block'>
                                Proficiency 
                            </label>
                            <RatingInput 
                                value={language?.progress || 0} 
                                total={5} 
                                onChange={(value) => updateArrayItem("languages", index, "progress", value)}
                                activeColor="#0ea5e9"
                                inactiveColor="#e0f2fe"
                            />
                        </div>
                    </div>

                    {languages.length > 1 && (
                        <button type='button' className='absolute top-3 right-3 text-sm text-red-600 hover:underline cursor-pointer' onClick={() => removeArrayItem("languages", index)}>
                            <LuTrash2/>
                        </button>
                    )}
                </div>
            ))}
            </div>

            <button type='button' className='self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800 text-sm font-medium hover:bg-purple-200 cursor-pointer mt-4' onClick={() => addArrayItem("languages", {name: "", progress: 0})}>
                <LuPlus/> Add Language
            </button>
        </div>

        {console.log(interests)}

        <div className='mt-8 mb-4'>
            <h3 className="text-sm font-semibold text-gray-700">Interests</h3>

            <div className='flex flex-col '>
                {interests.map((interest, index) => (
                    <div className='relative rounded-lg' key={index}>
                        <Input
                            value={interest || ""}
                            onChange={({ target }) => updateArrayItem("interests", index, null, target.value)}
                            placeholder="e.g. Travelling"
                            type="text"
                        />

                        {interests.length > 1 && (
                            <button type='button' className='absolute top-6.5 right-3 text-sm text-red-600 hover:underline cursor-pointer' onClick={() => removeArrayItem("interests", index)}>
                                <LuTrash2/>
                            </button>
                        )}
                    </div>
                ))}
            </div>

            <button type='button' className='self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800 text-sm font-medium hover:bg-purple-200 cursor-pointer' onClick={() => addArrayItem("interests", "")}> 
                <LuPlus/> Add Interest 
            </button>
        </div>
    </div>
  )
}

export default AdditionalInfoForm