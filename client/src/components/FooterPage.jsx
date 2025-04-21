import React from 'react';
import { Twitter, Facebook, Instagram, Linkedin, Github, School } from 'lucide-react';

const FooterPage = () => {
  return (
    <footer className="bg-[#0f1221] text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          {/* Logo with School Icon */}
          <div className="mb-4 md:mb-0 flex items-center space-x-2">
            <School size={24} />
            <span className="text-lg font-semibold">BitAcademy</span>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-4 mb-4 md:mb-0 text-sm">
            <a href="/about" className="hover:text-gray-300 transition duration-200">About Us</a>
            <a href="/contact" className="hover:text-gray-300 transition duration-200">Contact Us</a>
            <a href="/support" className="hover:text-gray-300 transition duration-200">Customer Support</a>
            <a href="/jobs" className="hover:text-gray-300 transition duration-200">Jobs</a>
            <a href="/legal" className="hover:text-gray-300 transition duration-200">Legal</a>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-300 transition duration-200">
              <Twitter size={18} />
            </a>
            <a href="#" className="hover:text-gray-300 transition duration-200">
              <Facebook size={18} />
            </a>
            <a href="#" className="hover:text-gray-300 transition duration-200">
              <Instagram size={18} />
            </a>
            <a href="#" className="hover:text-gray-300 transition duration-200">
              <Linkedin size={18} />
            </a>
            <a href="#" className="hover:text-gray-300 transition duration-200">
              <Github size={18} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-gray-400">
          © BitAcademy Inc. {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
};

export default FooterPage;
