import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, CheckSquare, User } from 'lucide-react';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Successfully logged out!");
  };

  return (
    <nav className="sticky top-0 z-40 bg-dark-card/80 backdrop-blur-md border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-brand-primary/10 rounded-xl text-brand-primary">
              <CheckSquare className="w-6 h-6" />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">
              TaskFlow
            </span>
          </div>

          {/* User Info & Logout */}
          {user && (
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-sm font-semibold text-dark-text">{user.name}</span>
                <span className="text-xs text-dark-muted">{user.email}</span>
              </div>
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-dark-border text-brand-accent border border-brand-accent/20">
                <User className="w-5 h-5" />
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm text-brand-danger hover:bg-brand-danger/10 transition duration-200 focus:outline-none"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline font-medium">Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
