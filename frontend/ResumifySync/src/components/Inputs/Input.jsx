import React, {useState} from 'react';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";


const Input = ({value, onChange, type, placeholder, label}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    }

  return (
    <div>
        <label className='text-[13px] text-slate-800'>
            {label}
        </label>

        <div className='input-box'>
            <input
            type={
                type== "password" ? (showPassword ? "text" : "password") : type
            }
            className="w-full bg-transparent outline-none"
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e)}
            />

            {type === 'password' && (
                <>
                {showPassword ? (
                    <FaRegEye
                        size={22} 
                        className='text-primary cursor-pointer'
                        onClick={() => handleTogglePassword()}
                    />
                ) : (
                    <FaRegEyeSlash
                        size={22}
                        className=' text-slate-400 cursor-pointer'
                        onClick={() => handleTogglePassword()}
                    />  
                )}
                </>
            )}
        </div>
    </div>
  )
}

export default Input