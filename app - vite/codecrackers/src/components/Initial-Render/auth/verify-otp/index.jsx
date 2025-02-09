import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { KeyRound } from 'lucide-react';
import signuporloginStore from '../../../zustand/login-signup/store';
import { useNavigate } from 'react-router-dom';

export default function OTPVerificationPage() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  
  const {verifyOtp} = signuporloginStore();
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const leaves = [];

    for (let i = 0; i < 50; i++) {
      leaves.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 5 + 5,
        speed: Math.random() * 0.5 + 0.1,
        angle: Math.random() * 360,
        color: `rgba(76, 175, 80, ${Math.random() * 0.3 + 0.1})`,
      });
    }

    function drawLeaf(x, y, size, angle, color) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle * Math.PI / 180);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(0, -size / 2);
      ctx.quadraticCurveTo(size / 2, -size / 2, size / 2, 0);
      ctx.quadraticCurveTo(size / 2, size / 2, 0, size / 2);
      ctx.quadraticCurveTo(-size / 2, size / 2, -size / 2, 0);
      ctx.quadraticCurveTo(-size / 2, -size / 2, 0, -size / 2);
      ctx.fill();
      ctx.restore();
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      leaves.forEach(leaf => {
        leaf.y += leaf.speed;
        leaf.angle += 0.1;
        if (leaf.y > canvas.height) {
          leaf.y = -leaf.size;
          leaf.x = Math.random() * canvas.width;
        }
        drawLeaf(leaf.x, leaf.y, leaf.size, leaf.angle, leaf.color);
      });

      requestAnimationFrame(animate);
    }

    animate();

    return () => cancelAnimationFrame(0);
  }, []);

  const handleInputChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input if value is entered
      if (value !== '' && index < 5) {
        inputRefs[index + 1].current?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const otpString = otp.join('');
      console.log('OTP submitted:', otpString);
      let email = localStorage.getItem('email');
      const res = await verifyOtp({email, otpString})
      localStorage.setItem("loggedIn", true);
      navigate('/dashboard');
      console.log('handleSubmit verify otp', res);
    } catch (error) {
      console.log('Error while verify', error);
    }
    // Here you would typically send the OTP to your backend for verification
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-lg p-8 shadow-lg">
          <div className="flex items-center justify-center mb-6">
            <KeyRound className="h-10 w-10 text-green-500" />
            <h2 className="text-2xl font-bold ml-2">Verify Your Account</h2>
          </div>
          <p className="text-center text-gray-600 mb-6">
            We've sent a 4-digit code to your email. Please enter it below to verify your account.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-between">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={inputRefs[index]}
                  className="w-14 h-14 text-center text-2xl bg-white bg-opacity-50"
                />
              ))}
            </div>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              Verify OTP
            </Button>
          </form>
          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-green-600 hover:underline">
              Didn't receive the code? Resend
            </a>
          </div>
          <p className="mt-4 text-center text-sm text-gray-600">
            Back to{" "}
            <a href="/login" className="text-green-600 hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
