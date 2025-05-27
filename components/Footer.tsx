import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-800 border-t border-slate-700">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-slate-400 text-sm">
          &copy; {currentYear} Timlin Connect. All rights reserved.
        </p>
        <p className="text-xs text-slate-500 mt-1">
          Innovate. Secure. Support.
        </p>
        {/* Placeholder for social media icons if needed later
        <div className="mt-4 flex justify-center space-x-6">
          <a href="#" className="text-slate-400 hover:text-slate-300">
            <span className="sr-only">Facebook</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">...</svg>
          </a>
        </div>
        */}
      </div>
    </footer>
  );
};

export default Footer;
