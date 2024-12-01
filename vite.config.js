import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import tailwindcss from 'tailwindcss'
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    svgr({ svgrOptions: { icon: true } })
  ],
  css: {
    postcss : {
      plugins: [tailwindcss()],
    }
  }
})