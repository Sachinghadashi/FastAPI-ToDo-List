import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, CheckSquare } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const tempErrors = {};
    if (!email) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'Please enter a valid email address';
    }
    if (!password) {
      tempErrors.password = 'Password is required';
    } else if (password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await login(email, password);
      toast.success("Welcome back!");
      navigate('/');
    } catch (err) {
      const errMsg = err.response?.data?.detail || "Invalid email or password";
      toast.error(errMsg);
      setErrors({ api: errMsg });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-bg p-4 relative overflow-hidden">
      {/* Decorative Glow Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-accent/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-md bg-dark-card border border-dark-border rounded-3xl p-8 shadow-2xl z-10">
        {/* Header/Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 bg-brand-primary/10 rounded-2xl text-brand-primary mb-3">
            <CheckSquare className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-dark-text">Welcome Back</h2>
          <p className="text-sm text-dark-muted mt-1">Sign in to manage your tasks</p>
        </div>

        {errors.api && (
          <div className="mb-6 p-4 rounded-xl bg-brand-danger/10 border border-brand-danger/20 text-xs text-brand-danger font-medium">
            {errors.api}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-dark-muted mb-2">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-dark-muted pointer-events-none">
                <Mail className="w-5 h-5" />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                placeholder="you@example.com"
                className={`w-full pl-11 pr-4 py-3 rounded-xl bg-dark-bg border ${
                  errors.email ? 'border-brand-danger' : 'border-dark-border'
                } text-dark-text placeholder-dark-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition`}
              />
            </div>
            {errors.email && (
              <span className="block mt-1.5 text-xs text-brand-danger font-medium">
                {errors.email}
              </span>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-dark-muted mb-2">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-dark-muted pointer-events-none">
                <Lock className="w-5 h-5" />
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: '' });
                }}
                placeholder="••••••••"
                className={`w-full pl-11 pr-4 py-3 rounded-xl bg-dark-bg border ${
                  errors.password ? 'border-brand-danger' : 'border-dark-border'
                } text-dark-text placeholder-dark-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition`}
              />
            </div>
            {errors.password && (
              <span className="block mt-1.5 text-xs text-brand-danger font-medium">
                {errors.password}
              </span>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-4 rounded-xl bg-brand-primary hover:bg-brand-primary/95 text-white font-semibold text-sm transition duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 shadow-lg shadow-brand-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Link to Register */}
        <p className="mt-8 text-center text-sm text-dark-muted">
          Don't have an account?{' '}
          <Link to="/register" className="text-brand-primary font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
