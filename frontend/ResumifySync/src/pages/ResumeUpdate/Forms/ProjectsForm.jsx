import React from 'react'
import { LuPlus, LuTrash2 } from 'react-icons/lu';
import Input from '../../../components/Inputs/Input';

const ProjectsForm = ({ projects, updateArrayItem, addArrayItem, removeArrayItem}) => {
  return (
    <div className='px-5 pt-5'>
        <h2 className="text-lg  font-semibold text-gray-900">Projects</h2>

        <div className='mt-4 flex flex-col gap-4 mb-3'>
            {projects.map((project, index) => (
                <div className='border border-gray-200/80 p-4 rounded-lg relative' key={index}>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='col-span-2'>
                            <Input
                                value={project?.title || ""}
                                onChange={({ target }) => updateArrayItem(index, "title", target.value)}
                                label="Project Title"
                                placeholder="Portfolio Website"
                                type="text"
                            />
                        </div>

                        <div className='col-span-2'>
                            <label className='text-xs font-medium text-slate-600'>Description</label>
                            <textarea
                                className='form-input w-full mt-1'
                                value={project?.description || ""}
                                onChange={({ target }) => updateArrayItem(index, "description", target.value)}
                                placeholder="Describe shortly the project..."
                                rows={3}
                            />
                        </div>

                        <Input
                            label="Github Link"
                            value={project?.github || ""}
                            onChange={({ target }) => updateArrayItem(index, "github", target.value)}
                            placeholder="https://github.com/username/project-name"
                            type="url"
                        />

                        <Input
                            label="Live Link"
                            value={project?.liveDemo || ""}
                            onChange={({ target }) => updateArrayItem(index, "liveDemo", target.value)}
                            placeholder="https://example.com"
                            type="url"
                        />
                    </div>

                    {projects.length > 1 && (
                        <button type='button' className='absolute top-3 right-3 text-sm text-red-600 hover:underline cursor-pointer' onClick={() => removeArrayItem(index)}>
                            <LuTrash2/>
                        </button>
                    )}
                </div>
            ))}
        </div>
        <button type='button' className='self-start flex items-center gap-2 px-4 py-2 rounded text-sm font-medium text-purple-800 bg-purple-100 hover:bg-purple-200 cursor-pointer' onClick={() => addArrayItem({ title: "", description: "", github: "", liveDemo: "" })}>
            <LuPlus/> Add Project
        </button>
    </div>
  )
}

export default ProjectsForm