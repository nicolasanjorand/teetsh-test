import {heroui} from '@heroui/theme';
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@heroui/theme/dist/components/(select|form|listbox|divider|popover|button|ripple|spinner|scroll-shadow).js"
  ],
    safelist: [
        'border-lime-200',
        'border-lime-300',
        'border-lime-400',
        'border-lime-500',
        'border-lime-700',
        'bg-lime-200',
        'bg-lime-300',
        'bg-lime-400',
        'bg-lime-500',
        'bg-lime-700',
        'bg-blue-200',
        'bg-teal-200',
        'bg-yellow-200',
        'bg-red-200',
    ],
    theme: {
        contet: {},
    },
  plugins: [heroui()],
};