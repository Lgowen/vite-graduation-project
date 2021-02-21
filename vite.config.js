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
    "assets": path.resolve(__dirname, "src/assets"),
    "comps": path.resolve(__dirname, "src/components"),
    "markdown": path.resolve(__dirname, "src/markdown"),
    "plugins": path.resolve(__dirname, "src/plugins"),
    "router": path.resolve(__dirname, "src/router"),
    "store": path.resolve(__dirname, "src/store"),
    "styles": path.resolve(__dirname, "src/styles"),
    "utils": path.resolve(__dirname, "src/utils"),
    "apis": path.resolve(__dirname, "src/apis"),
    "views": path.resolve(__dirname, "src/views")
  },
  server: {
    // proxy: { // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
    //   // '/api': 'http://localhost:9527/api',
    //   '/api': {
    //     target: 'http://localhost:9527/api', // 后端服务实际地址
    //     changeOrigin: true,
    //     rewrite: path => path.replace(/^\/api/, '')
    //   },
    // },
    open: true
  }
}

export default config