export default defineNuxtConfig({
    devtools: { enabled: false },
    modules: [
        '@pinia/nuxt'
    ],
    pinia: {
        autoImports: [
            'defineStore', // import { defineStore } from 'pinia'
        ],
    },
    imports: {
        dirs: ['stores']
    },
    vite: {
        css: {
            preprocessorOptions: {
                sass: {
                    additionalData: '@import "@/assets/styles/variables.scss"'
                }
            }
        }
    },
    css: ["@/assets/styles/global.scss"],
    runtimeConfig: {
        public: {
            API: process.env['API']
        }
    }
})
