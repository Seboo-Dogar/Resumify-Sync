import React, {useState} from 'react';
// import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import ProfilePicSection from '../../components/Inputs/ProfilePicSection';

const SignUp = ({setCurrentPage}) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);
  // const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if(!fullName) {
      setError('Full name is required.');
      return;
    }

    if(!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if(!password) {
      setError('Password is required.');
      return;
    }

    setError("");
    // try {

    // }catch (err) {
    //   console.error(err);
    // }
  }

  return (
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
      <h3 className='text-lg font-semibold text-black'>Create an Account</h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6'>Please enter your details to create an account.</p>

      <form onSubmit={handleSignUp} className=''>
        <ProfilePicSection
          profilePic={profilePic}
          setProfilePic={setProfilePic}
        />

        <div className='grid grid-cols-1 md:grid-cols-1 gap-2'> 
          <Input 
          value={fullName}
          onChange={({target}) => setFullName(target.value)}
          type='text'
          placeholder='John Doe'
          label='Full Name'
        />

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
        </div>

        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
        <button type='submit' className='btn-primary'>SIGN UP</button>
        <p className='text-[13px] text-slate-800 mt-3'>Already have an account? <span className='text-primary font-medium underline cursor-pointer' onClick={() => setCurrentPage('login')}>Login</span></p>

      </form>
    </div>
  )
}

export default SignUp