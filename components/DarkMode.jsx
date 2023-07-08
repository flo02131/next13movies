'use client'
import { useEffect } from 'react';

const DarkMode = () => {
  useEffect(() => {
    // Dark Mode
    const darkToggle = document.querySelector('#dark-toggle');
    const html = document.querySelector('html');

    darkToggle.addEventListener('click', () => {
      if (darkToggle.checked) {
        html.classList.add('dark');
        localStorage.theme = 'dark';
      } else {
        html.classList.remove('dark');
        localStorage.theme = 'light';
      }
    });

    // Move Toggle Mode
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      darkToggle.checked = true;
    } else {
      document.documentElement.classList.remove('dark');
      darkToggle.checked = false;
    }
  }, []);

  return (
    <div>
      <div className="flex">
          <label htmlFor="dark-toggle" className="toggle-label">
           <input type="checkbox" name="" className="hidden" id="dark-toggle"/>
            <span className="toggle-icon cursor-pointer">
              <img src="img/moon-svgrepo-com.svg" alt="moon" className="h-6 w-6 toggle-icon-light"/>
              <img src="img/sun-svgrepo-com.svg" alt="sun" className="h-6 w-6 toggle-icon-dark hidden invert-white"/>
            </span>
          </label>
        </div>
    </div>
  );
};

export default DarkMode;
