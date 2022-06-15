import { Button, NavbarV2 } from '@nextail/core';
import { useLayoutContext, useThemeContext } from '@nextail/providers';
import React from 'react';

function Navbar() {
  const { theme, toggleTheme } = useThemeContext();
  const { leftDrawerOpen, setLeftDrawerOpen } = useLayoutContext();

  return (
    <NavbarV2
      toggle={setLeftDrawerOpen}
      open={leftDrawerOpen}
      mainStylings={{
        background: { backgroundColor: 'bg-emerald-500' },
      }}
      data={{
        brand: (
          <div>
            <div className="text-lg font-bold uppercase text-white">ToDo</div>
            <p className="text-xs">Powered with Nextail</p>
          </div>
        ),
        buttons: (
          <Button
            title="Toggle Theme"
            onClick={() => toggleTheme()}
            mainStylings={{
              border: {
                borderWidth: 'border-2',
                borderRadius: 'rounded-full',
                borderColor: `${
                  theme === 'dark' ? 'border-yellow-900' : 'border-sky-500'
                }`,
              },
              spacing: { padding: 'p-2' },
              background: {
                backgroundColor: `${
                  theme === 'dark'
                    ? 'bg-yellow-500 hover:bg-yellow-200'
                    : 'bg-sky-900 hover:bg-black'
                }`,
              },
              text: {
                textColor: `${
                  theme === 'dark' ? 'text-yellow-900' : 'text-sky-500'
                }`,
              },
              effect: { boxShadow: ' ' },
              transitionAnimation: {
                transitionProperty: 'transition-all',
                transitionDuration: 'duration-500',
              },
            }}
          >
            {theme === 'dark' ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </Button>
        ),
      }}
    />
  );
}

export default Navbar;
