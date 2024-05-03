/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    animation: true,
  },
  safelist: [
    "animate-pulse animate-spin transition-all duration-700 ease-in-out",
    "max-h-48",
    "h-8 !text-gray-100 !bg-green-500 !bg-gray-100 !font-bold !font-semibold !bg-slate-100",
    "top-0",
    "w-60 w-0.5",
    "inset-y-2",
    "inset-y-2",
    "bg-blue-200 bg-slate-200 bg-gray-50/10 bg-gray-50/20 bg-gray-50/30 bg-gray-50/40 bg-gray-50/50",
    "divide-y-2 divide-y-4 divide-gray-50 divide-gray-100 divide-blue-50",
    "divide-x-2 divide-x-4 divide-zinc-50 divide-zinc-100",
    "border-l-4 border-gray-200",
    "ml-auto py-2.5 mr-2 mr-3 mr-2.5 mr-1 h-2.5",
  ],
}