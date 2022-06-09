import { Button, InfoButton, SuccessButton } from '@nextail/core';
import { useThemeContext } from '@nextail/providers';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <div className="h-screen w-screen bg-white p-4 dark:bg-slate-700">
      <div className="flex justify-between">
        <h1 className="text-emerald-500">Nextail</h1>
        <div className="flex flex-col gap-2 md:flex-row">
          <InfoButton link="https://nextail-docs.vercel.app">
            Documentation
          </InfoButton>
          <SuccessButton link="https://github.com/a-smiggle/nextail-template">
            Repo
          </SuccessButton>
        </div>
        <div className="flex flex-col gap-2 pr-2 md:flex-row">
          <a
            href="https://github.com/a-smiggle/nextail"
            target="_blink"
            className="text-gray-400 transition-colors duration-300 hover:text-black dark:hover:text-white"
          >
            <svg viewBox="0 0 30 30" className="h-10 w-10 fill-current">
              <path d="M15 1.875C7.75195 1.875 1.875 7.9043 1.875 15.334C1.875 21.2812 5.63672 26.3203 10.8516 28.1016C10.9247 28.1175 10.9994 28.1253 11.0742 28.125C11.5605 28.125 11.748 27.7676 11.748 27.457C11.748 27.1348 11.7363 26.291 11.7305 25.166C11.2963 25.2678 10.8522 25.3209 10.4062 25.3242C7.88086 25.3242 7.30664 23.3613 7.30664 23.3613C6.70898 21.8086 5.84766 21.3926 5.84766 21.3926C4.70508 20.5898 5.8418 20.5664 5.92969 20.5664H5.93555C7.25391 20.6836 7.94531 21.9609 7.94531 21.9609C8.60156 23.1094 9.48047 23.4316 10.2656 23.4316C10.7848 23.4213 11.2959 23.3015 11.7656 23.0801C11.8828 22.2129 12.2227 21.6211 12.5977 21.2812C9.68555 20.9414 6.62109 19.7871 6.62109 14.6309C6.62109 13.1602 7.13086 11.959 7.96875 11.0215C7.83398 10.6816 7.38281 9.31055 8.09766 7.45898C8.19354 7.43604 8.29209 7.42619 8.39062 7.42969C8.86523 7.42969 9.9375 7.61133 11.707 8.8418C13.8572 8.24022 16.1311 8.24022 18.2812 8.8418C20.0508 7.61133 21.123 7.42969 21.5977 7.42969C21.6962 7.42619 21.7947 7.43604 21.8906 7.45898C22.6055 9.31055 22.1543 10.6816 22.0195 11.0215C22.8574 11.9648 23.3672 13.166 23.3672 14.6309C23.3672 19.7988 20.2969 20.9355 17.373 21.2695C17.8418 21.6855 18.2637 22.5059 18.2637 23.7598C18.2637 25.5586 18.2461 27.0117 18.2461 27.4512C18.2461 27.7676 18.4277 28.125 18.9141 28.125C18.9928 28.1253 19.0713 28.1175 19.1484 28.1016C24.3691 26.3203 28.125 21.2754 28.125 15.334C28.125 7.9043 22.248 1.875 15 1.875Z"></path>
            </svg>
          </a>
          <Button
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
        </div>
      </div>
      <div className="flex h-max flex-col items-center justify-center text-center">
        <h1 className="pt-12 text-emerald-500">Nextail Template</h1>
        <h2 className="dark:text-slate-400">
          A starter to use Nextail with Next.js.
        </h2>
        <h3 className="dark:text-slate-300">Have fun.</h3>
      </div>
    </div>
  );
};

export default Home;
