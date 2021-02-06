import vitePluginVuedoc, { vueDocFiles } from 'vite-plugin-vuedoc'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx"
import path from 'path'
// import  md  from "./src/plugins/md"
import { viteMockServe } from 'vite-plugin-mock'

/**
 * https://vitejs.dev/config/
 * @type {import('vite').UserConfig}
 */

const config = {
  plugins: [
    vitePluginVuedoc({}),
    vue({
      include: [...vueDocFiles]
    }),
    vueJsx(),
    viteMockServe({ supportTs: false }),
  ],
  alias: {
    "@": path.resolve(__dirname, "src"),
    "comps": path.resolve(__dirname, "src/components"),
    "apis": path.resolve(__dirname, "src/apis"),
    "views": path.resolve(__dirname, "src/views"),
    "utils": path.resolve(__dirname, "src/utils"),
    "router": path.resolve(__dirname, "src/router"),
    "styles": path.resolve(__dirname, "src/styles"),
    "markdown": path.resolve(__dirname, "src/markdown"),
    "plugins": path.resolve(__dirname, "src/plugins")
  }
}

export default config