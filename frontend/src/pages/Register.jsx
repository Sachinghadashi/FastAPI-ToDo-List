import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, CheckSquare } from 'lucide-react';
import toast from 'react-hot-toast';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const tempErrors = {};
    if (!name.trim()) {
      tempErrors.name = 'Full name is required';
    }
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
    if (password !== confirmPassword) {
      tempErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await register(name.trim(), email, password);
      toast.success("Account created successfully!");
      navigate('/');
    } catch (err) {
      const errMsg = err.response?.data?.detail || "Registration failed. Try again.";
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
        <div className="flex flex-col items-center mb-6">
          <div className="p-3 bg-brand-primary/10 rounded-2xl text-brand-primary mb-3">
            <CheckSquare className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-dark-text">Create Account</h2>
          <p className="text-sm text-dark-muted mt-1">Get started with your smart todo list</p>
        </div>

        {errors.api && (
          <div className="mb-5 p-4 rounded-xl bg-brand-danger/10 border border-brand-danger/20 text-xs text-brand-danger font-medium">
            {errors.api}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-dark-muted mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-dark-muted pointer-events-none">
                <User className="w-5 h-5" />
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors({ ...errors, name: '' });
                }}
                placeholder="John Doe"
                className={`w-full pl-11 pr-4 py-3 rounded-xl bg-dark-bg border ${
                  errors.name ? 'border-brand-danger' : 'border-dark-border'
                } text-dark-text placeholder-dark-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition`}
              />
            </div>
            {errors.name && (
              <span className="block mt-1 text-xs text-brand-danger font-medium">
                {errors.name}
              </span>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-dark-muted mb-1.5">
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
              <span className="block mt-1 text-xs text-brand-danger font-medium">
                {errors.email}
              </span>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-dark-muted mb-1.5">
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
                placeholder="Min. 6 characters"
                className={`w-full pl-11 pr-4 py-3 rounded-xl bg-dark-bg border ${
                  errors.password ? 'border-brand-danger' : 'border-dark-border'
                } text-dark-text placeholder-dark-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition`}
              />
            </div>
            {errors.password && (
              <span className="block mt-1 text-xs text-brand-danger font-medium">
                {errors.password}
              </span>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-dark-muted mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-dark-muted pointer-events-none">
                <Lock className="w-5 h-5" />
              </span>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
                }}
                placeholder="Confirm password"
                className={`w-full pl-11 pr-4 py-3 rounded-xl bg-dark-bg border ${
                  errors.confirmPassword ? 'border-brand-danger' : 'border-dark-border'
                } text-dark-text placeholder-dark-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition`}
              />
            </div>
            {errors.confirmPassword && (
              <span className="block mt-1 text-xs text-brand-danger font-medium">
                {errors.confirmPassword}
              </span>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 rounded-xl bg-brand-primary hover:bg-brand-primary/95 text-white font-semibold text-sm transition duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 shadow-lg shadow-brand-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </form>

        {/* Link to Login */}
        <p className="mt-6 text-center text-sm text-dark-muted">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-primary font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
