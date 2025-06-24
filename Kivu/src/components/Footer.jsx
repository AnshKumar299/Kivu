import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-emerald-800 text-white py-4 px-6 mt-10 rounded-t-2xl shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="text-sm text-center sm:text-left font-quicksand">
          © {new Date().getFullYear()} Kivu. Made by Ansh.
        </div>
        <div className="mt-2 sm:mt-0 flex gap-4 text-sm font-quicksand">
          <a href="https://github.com/AnshKumar299" className="hover:underline">Github</a>
          <a href="https://www.linkedin.com/in/ansh-kumar-singh-342780290/" className="hover:underline">LinkedIn</a>
          <a href="https://www.instagram.com/__.__anshhhhh/" className="hover:underline">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
