import React from 'react'
import { LuPlus, LuTrash2 } from 'react-icons/lu';
import Input from '../../../components/Inputs/Input';
import RatingInput from '../../../components/ResumeSections/RatingInput';

const SkillsForm = ({skills, updateArrayItem, addArrayItem, removeArrayItem}) => {
  return (
    <div className='px-5 pt-5'>
      <h2 className="text-lg  font-semibold text-gray-900">Skills</h2>

      <div className='mt-4 flex flex-col gap-4 mb-3'>
        {skills.map((skill, index) => (
          <div className='border border-gray-200/80 p-4 rounded-lg relative' key={index}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <Input
                value={skill?.skill || ""}
                onChange={({ target }) => updateArrayItem(index, "skill", target.value)}
                label="Skill Name"
                placeholder="React JS"
                type="text"
              />

              <div className='flex flex-col'>
                <label className='text-[13px] mb-1 text-slate-800'>
                  Proficiency ({skill?.progress / 20 || 0})
                </label>
                <div className='mt-5'>
                  <RatingInput value={skill?.progress || 0} total={5} onChange={(value) => updateArrayItem(index, "progress", value)}/>
                </div>
              </div>
            </div>

            {skills.length > 1 && (
              <button type='button' className='absolute top-3 right-3 text-sm text-red-600 hover:underline cursor-pointer' onClick={() => removeArrayItem(index)}>
                <LuTrash2/>
              </button>
            )}
          </div>
        ))}

        <button type='button' className='self-start flex items-center gap-2  px-4 py-2 rounded text-sm bg-purple-100 text-purple-800 font-medium hover:bg-purple-200 cursor-pointer' onClick={() => addArrayItem({name: "", progress: 0})}>
          <LuPlus /> Add Skill
        </button>
      </div>
    </div>
  )
}

export default SkillsForm;