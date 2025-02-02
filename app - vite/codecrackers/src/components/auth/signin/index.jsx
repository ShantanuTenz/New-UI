import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf, LogIn } from 'lucide-react';
import signuporloginStore from '../../../zustand/login-signup/store';
import { Loader } from '../../../pages/ui/loader/loader';
import { useNavigate } from 'react-router-dom';

export default function SignInPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const { signInUser } = signuporloginStore();
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
        color: `rgba(76, 175, 80, ${Math.random() * 0.3 + 0.1})`
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

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Sign in attempted:', formData);
    try {
      let response = await signInUser(formData);
      console.log('signInUser', response);
      if(response?.data?.status){
        localStorage.setItem("loggedIn", true);
        navigate('/dashboard');
      }
    } catch (error) {
      console.log('Error while sign in', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
            <Leaf className="h-10 w-10 text-green-500" />
            <h2 className="text-2xl font-bold ml-2">Welcome Back</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="bg-white bg-opacity-50"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="bg-white bg-opacity-50"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              <LogIn className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          </form>
          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-green-600 hover:underline">
              Forgot your password?
            </a>
          </div>
          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-green-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
