import React from 'react'
import Otp from '../components/Otp'
import axios from 'axios'
import { useAppContext } from '../Context/AppContext'
import { toast } from 'react-toastify'

const VerifyEmail = () => {

  const { backendUrl, navigate } = useAppContext();
  const onCompleteHandler = async (otp) => {
      const {data} = await axios.post(backendUrl + '/api/auth/verify-account', {otp}, {withCredentials: true});

      if(data.success) {
        toast.success('User Registered successfully');
        navigate('/login');
      } else {
        toast.error(data.message);
      }
  }

  return (
    <div>
      <Otp onComplete={onCompleteHandler}/>
    </div>
  )
}

export default VerifyEmail
