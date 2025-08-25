import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import { UserContext } from '../../context/userContext';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const Login = ({setCurrentPage}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const {updateUser} = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if(!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if(!password) {
      setError('Password is required.');
      return;
    } 

    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {email, password});

      const {token} = response.data;
      if(token) {
        localStorage.setItem('token', token);
        updateUser(response.data);
        navigate('/dashboard');
      }
    }catch (err) {
      if(err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      }else {
        setError('An error occurred. Please try again.');
      }
    }
  }

  return (
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
      <h3 className='text-lg font-semibold text-black'>Welcome Back</h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6'>Please enter your credentials to login.</p>

      <form onSubmit={handleLogin} className=''>
        <Input 
          value={email}
          onChange={({target}) => setEmail(target.value)}
          type='email'
          placeholder='john@example.com'
          label='Email Address'
        />

        <Input
          value={password}
          onChange={({target}) => setPassword(target.value)}
          type='password'
          placeholder='Min 8 Characters'
          label='Password'
        />


        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

        <button type='submit' className='btn-primary'>LOGIN</button>

        <p className='text-[13px] text-slate-800 mt-3'>Don't have an account? {""} <span className='cursor-pointer text-primary underline' onClick={() => setCurrentPage('signup')}>Sign Up</span></p>
      </form>
    </div>
  )
}

export default Login