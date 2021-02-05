import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx"
import path from 'path'
import { defineConfig } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'

/**
 * https://vitejs.dev/config/
 * @type {import('vite').UserConfig}
 */
export default defineConfig({
  css:{

  },
  esbuild:{

  },
  alias: {
    "@": path.resolve(__dirname, "src"),
    "comps": path.resolve(__dirname, "src/components"),
    "apis": path.resolve(__dirname, "src/apis"),
    "views": path.resolve(__dirname, "src/viewx"),
    "utils": path.resolve(__dirname, "src/utils"),
    "router": path.resolve(__dirname, "src/router"),
    "styles": path.resolve(__dirname, "src/styles")
  },
  plugins: [vue(), vueJsx(), viteMockServe({ supportTs: false })]
})
