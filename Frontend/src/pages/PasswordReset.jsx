import axios from "axios";
import { useState } from "react";
import { useAppContext } from "../Context/AppContext";
import { toast } from "react-toastify";
import Otp from "../components/Otp";

const PasswordReset = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const {backendUrl, navigate} = useAppContext();
  const [email, setEmail] = useState('');
  const [sendEmail, setSendEmail] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error('Password do not match');
    } else {
        const {data} = await axios.post(backendUrl + '/api/auth/reset-password', {email, newPassword});

        if(data.success){
          toast.success('Password updated successfully');
          navigate('/login');
        } else {
          toast.error(data.error);
        }
    }
  };

  const onSubmitHandler = async (e) => {
    try{
      e.preventDefault();
      const {data} = await axios.post(backendUrl + '/api/auth/send-reset-otp', {email});

      if(data.success) {
          setSendEmail(true);
          toast.success('Varification Mail Has been send');
      } else {
        toast.error(data.error);
      }
    } catch(error) {
        toast.error(error.message);
    }
  }
  const onCompleteHandler = async (otp) => {
    try{
      const {data} = await axios.post(backendUrl + '/api/auth/reset-password-otp', {email, otp});
      if(data.success) {
        setVerifyEmail(true);  
        toast.success('Email Verified');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
        toast.error(error.message);
    }  
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      {!sendEmail && !verifyEmail && (<form onSubmit={onSubmitHandler} className="bg-white text-gray-500 max-w-[340px] w-full mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
            <h2 className="text-2xl font-bold mb-9 text-center text-gray-800">Enter Your Email</h2>
            <div className="flex items-center my-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
                <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="m2.5 4.375 3.875 2.906c.667.5 1.583.5 2.25 0L12.5 4.375" stroke="#6B7280" strokeOpacity=".6" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M11.875 3.125h-8.75c-.69 0-1.25.56-1.25 1.25v6.25c0 .69.56 1.25 1.25 1.25h8.75c.69 0 1.25-.56 1.25-1.25v-6.25c0-.69-.56-1.25-1.25-1.25Z" stroke="#6B7280" strokeOpacity=".6" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                <input onChange={e => setEmail(e.target.value)} className="w-full outline-none bg-transparent py-2.5" value={email} type="email" placeholder="Email" required />
            </div>
            <button type="submit" className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600/90 transition py-2.5 rounded text-white font-medium">Enter</button>
        </form> )}
      {sendEmail && !verifyEmail && (<Otp onComplete={onCompleteHandler} />)}  
      {verifyEmail && sendEmail && (<div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">   
        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Set New Password
        </h2>
        <p className="text-sm text-gray-500 text-center mt-2">
          Enter your new password below
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          
          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <div className="mt-1 relative">
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-2 text-sm text-gray-600"
              >
                {showNew ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="mt-1 relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-2 text-sm text-gray-600"
              >
                {showConfirm ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Update Password
          </button>
        </form>
      </div> )}
    </div>
  );
}

export default PasswordReset;