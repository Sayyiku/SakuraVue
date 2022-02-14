import * as path from "path";
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import defaultSettings from "./src/settings";
import {visualizer} from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const fs = require("fs")
const dotenv = require("dotenv")

export default ({command, mode}) => {
  const name = defaultSettings.title || '欢迎' // page title
  let NODE_ENV = process.env.NODE_ENV || 'development';
  let envFiles;
  //根据不同的环境使用不同的环境变量
  if (command === 'serve') envFiles = [`.env`]
  else envFiles = [`.env`, `.env.${NODE_ENV}`]
  for (const file of envFiles) {
    const envConfig = dotenv.parse(fs.readFileSync(file))
    for (const k in envConfig) process.env[k] = envConfig[k]
  }
  return defineConfig({
    plugins: [
      vue(),
      visualizer(), //打包体积分析工具，打包后根目录生成stats.html，运行可查看
      viteCompression(),
      //elementPlus按需加载/打包
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      })
    ],
    name: name,
    resolve: {
      alias: {"/@": path.resolve(__dirname, "src")},
    },
    build: {
      assetsDir: './assets',
      chunkSizeWarningLimit: 500,
      minify: 'terser',
      cssCodeSplit: true, // 如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
      terserOptions: {
        compress: {
          // warnings: false,
          drop_console: true,  //打包时删除console
          drop_debugger: true, //打包时删除 debugger
          pure_funcs: ['console.log'],
        },
        output: {
          // 去掉注释内容
          comments: true,
        }
      },
      rollupOptions: {
        output: {
          manualChunks: {
            // 拆分代码，配置完后自动按需加载
            vue: ['vue', 'vue-router', 'vuex'],
            elementPlus: ['element-plus'],
            CryptoJS: ['crypto-js'],
            NProgress: ['nprogress']
          },
        },
      },
      brotliSize: false,
    },
    optimizeDeps: { //配置强制依赖
      include: ['element-plus/lib/locale/lang/zh-cn'],
    },
    server: {
      host: process.env.VITE_HOST,
      port: process.env.VITE_PORT,
      // 是否自动在浏览器打开
      open: false,
      // 是否开启 https
      https: false,
      // 服务端渲染
      ssr: false,
      base: process.env.VITE_BASE_URL,
      outDir: process.env.VITE_OUTPUT_DIR,
      proxy: {
        '/api': {
          target: 'http://localhost:8865', //本地开发代理地址
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
      }
    },
  })
}
