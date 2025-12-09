import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }
    
    if (!agreeTerms) {
      showToast('Please agree to terms and conditions', 'error');
      return;
    }
    
    setLoading(true);
    try {
      await register(name, email, password);
      showToast('Registration successful!', 'success');
      navigate('/');
    } catch (error: any) {
      showToast(error.response?.data?.error || 'Registration failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Form */}
      <div className="flex items-center justify-center w-full px-8 bg-white lg:w-1/2 dark:bg-black">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h2 className="mb-2 text-4xl font-black text-gray-900 dark:text-white">Create Account</h2>
            <p className="text-gray-600 dark:text-gray-400">Join SHOP.CO and start shopping today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-4 text-gray-900 transition-all bg-gray-100 border-2 border-transparent rounded-xl dark:bg-gray-900 dark:text-white focus:border-black dark:focus:border-white focus:outline-none"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-4 text-gray-900 transition-all bg-gray-100 border-2 border-transparent rounded-xl dark:bg-gray-900 dark:text-white focus:border-black dark:focus:border-white focus:outline-none"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-4 text-gray-900 transition-all bg-gray-100 border-2 border-transparent rounded-xl dark:bg-gray-900 dark:text-white focus:border-black dark:focus:border-white focus:outline-none"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute text-gray-500 transform -translate-y-1/2 right-4 top-1/2 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Must be at least 6 characters</p>
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                Confirm Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-4 text-gray-900 transition-all bg-gray-100 border-2 border-transparent rounded-xl dark:bg-gray-900 dark:text-white focus:border-black dark:focus:border-white focus:outline-none"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 mt-1 text-black border-gray-300 rounded focus:ring-black"
              />
              <label className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                I agree to the{' '}
                <Link to="/terms" className="font-semibold text-black dark:text-white hover:underline">
                  Terms and Conditions
                </Link>
                {' '}and{' '}
                <Link to="/privacy" className="font-semibold text-black dark:text-white hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 font-bold text-white transition-all bg-black rounded-xl hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-black dark:text-white hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="relative hidden w-1/2 lg:block">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80"
          alt="Fashion shopping"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-bl from-black/60 to-black/30">
          <div className="flex flex-col justify-center h-full px-16 text-white">
            <h1 className="mb-4 text-5xl font-black">Join SHOP.CO Today</h1>
            <p className="text-xl text-gray-200">Get access to exclusive deals and latest fashion trends</p>
            <div className="grid grid-cols-3 gap-8 mt-12">
              <div>
                <p className="text-4xl font-black">200+</p>
                <p className="text-sm text-gray-300">Brands</p>
              </div>
              <div>
                <p className="text-4xl font-black">2,000+</p>
                <p className="text-sm text-gray-300">Products</p>
              </div>
              <div>
                <p className="text-4xl font-black">30K+</p>
                <p className="text-sm text-gray-300">Customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
