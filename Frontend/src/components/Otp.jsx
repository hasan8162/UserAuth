import { useRef, useState } from "react";

const Otp = ({ length = 6, onComplete }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return; // only digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputsRef.current[index + 1].focus();
    }

    if (newOtp.every((digit) => digit !== "")) {
      onComplete && onComplete(newOtp.join(""));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").slice(0, length);
    if (!/^[0-9]+$/.test(paste)) return;

    const newOtp = paste.split("");
    while (newOtp.length < length) newOtp.push("");

    setOtp(newOtp);

    newOtp.forEach((val, i) => {
      if (inputsRef.current[i]) {
        inputsRef.current[i].value = val;
      }
    });

    inputsRef.current[length - 1].focus();

    if (newOtp.every((digit) => digit !== "")) {
      onComplete && onComplete(newOtp.join(""));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h2 className="text-xl font-semibold text-gray-800">Enter OTP</h2>

      <div className="flex gap-3">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={digit}
            ref={(el) => (inputsRef.current[index] = el)}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            className="w-12 h-14 text-center text-lg font-medium border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        ))}
      </div>

      <button
        onClick={() => onComplete && onComplete(otp.join(""))}
        className="mt-2 px-6 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
      >
        Verify
      </button>
    </div>
  );
}
export default Otp;