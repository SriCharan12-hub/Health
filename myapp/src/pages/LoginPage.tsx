import { useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { login } from '../features/auth/authSlice';
import { EnvelopeClosedIcon, LockClosedIcon, EyeOpenIcon, EyeNoneIcon } from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import loginDoctors from '../assets/login-doctors.png';

import { setToken } from '../utils/auth';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (email === 'admin@healthcare.com' && password === 'admin1') {
      setToken('dummy-jwt-token'); // Set cookie
      dispatch(login({ email }));
      toast.success('Welcome back!');
      navigate('/');
    } else {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-100 via-purple-100 to-pink-100 relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-purple-300 opacity-30 blur-3xl animate-float"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-pink-300 opacity-30 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

      {/* Main Content */}
      <div className="z-10 w-full max-w-5xl px-4 transition-all duration-500 ease-out transform translate-y-0 opacity-100 animate-fade-in-up">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-gray-800 tracking-tight">NexusCorp</span>
            <div className="p-1.5 bg-linear-to-tr from-blue-500 to-indigo-600 rounded-lg text-white transform rotate-12 shadow-lg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/50 flex flex-col lg:flex-row items-center gap-8">
          {/* Image Section - Top on Mobile, Left on Desktop */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <img 
              src={loginDoctors} 
              alt="Medical Team" 
              className="max-w-[200px] sm:max-w-[250px] lg:max-w-full h-auto object-contain drop-shadow-md rounded-xl"
            />
          </div>

          {/* Form Section - Bottom on Mobile, Right on Desktop */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-2xl font-bold text-center lg:text-left text-gray-800 mb-2">Welcome Back</h2>
            <p className="text-center lg:text-left text-black mb-8 text-sm">Sign in to access your dashboard</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                  <EnvelopeClosedIcon />
                </div>
                <input
                  type="email"
                  className="w-full text-black pl-10 pr-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                  <LockClosedIcon />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10  text-black pr-12 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer outline-none"
                >
                  {showPassword ? <EyeNoneIcon /> : <EyeOpenIcon />}
                </button>
              </div>
            </div>

            <div className="mt-4 p-3 bg-indigo-50/80 border border-indigo-100/50 rounded-xl text-sm text-indigo-900 shadow-sm backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold text-indigo-700">Demo Credentials</span>
              </div>
              <div className="grid gap-2 pl-6">
                <div className="flex items-center justify-between group p-2 bg-white/50 rounded-lg hover:bg-white transition-colors cursor-pointer border border-transparent hover:border-indigo-100">
                  <span className="text-indigo-500 text-xs uppercase tracking-wider font-bold">Email</span>
                  <code className="font-mono font-semibold text-indigo-700 select-all">admin@healthcare.com</code>
                </div>
                <div className="flex items-center justify-between group p-2 bg-white/50 rounded-lg hover:bg-white transition-colors cursor-pointer border border-transparent hover:border-indigo-100">
                  <span className="text-indigo-500 text-xs uppercase tracking-wider font-bold">Password</span>
                  <code className="font-mono font-semibold text-indigo-700 select-all">admin1</code>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-bold hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg shadow-blue-500/30 active:scale-95"
            >
              Sign In
            </button>
          </form>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-gray-400">
          <p>© 2025 NexusCorp. All rights reserved.</p>
          <p>Secured by NexusCorp Enterprise</p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage
