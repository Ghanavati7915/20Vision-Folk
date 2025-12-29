import projectConfig from "./project.config"
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
    ssr: false,
    devtools: {enabled: false},
    app: {
        head: {
            title: projectConfig.projectTitle,
            charset: "utf-8",
            viewport: "width=device-width, initial-scale=1.0, maximum-scale=1",
            meta: [
                {name: "HandheldFriendly", content: "true"},
                {name: "version", content: projectConfig.version},
                {name: "description", content: projectConfig.projectDescription},
                {name: "mobile-web-app-capable", content: "yes"},
                {name: "apple-mobile-web-app-capable", content: "yes"},
                {name: "apple-mobile-web-app-status-bar-style", content: "black-translucent"},
                {name: "apple-mobile-web-app-title", content: projectConfig.projectTitle},
                {name: "theme-color", content: "#ffffff"},
                {name: "background-color", content: "#ffffff"},
                {property: "og:title", content: projectConfig.projectTitle},
                {property: "og:description", content: projectConfig.projectDescription},
                {property: "og:type", content: "website"},
                {property: "og:image", content: "/logo.png"},
            ],
            link: [
                {rel: "icon", type: "image/png", href: "/favicon.ico"},
                {rel: "apple-touch-icon", sizes: "180x180", href: "/logo.png"},
            ],
        }
    },
    compatibilityDate: '2025-07-15',
    plugins: [{ src: "@/plugins/bootstrap", mode: "client" }],
    css: ['~/assets/css/tailwind.css','~/assets/css/main.css'],
    vite: {
        plugins: [
            tailwindcss(),
        ],
    },

    appConfig: {buildDate: new Date().toISOString()},
    modules: ['cap-module', 'shadcn-nuxt','motion-v/nuxt'],
    shadcn: {
        prefix: '',
        componentDir: '@/components/ui'
    },
    devServer: {port: 1406},
})