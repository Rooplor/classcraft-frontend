import Aura from "@primevue/themes/aura";
import { resolve } from "path";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-04-03",
    devtools: { enabled: true },
    ssr: false,
    modules: [
        "@primevue/nuxt-module",
        "@nuxtjs/tailwindcss",
        "@vee-validate/nuxt",
        "@pinia/nuxt",
        "nuxt-vuefire",
    ],
    vuefire: {
        auth: {
            enabled: true,
            sessionCookie: false,
        },
        config: {
            apiKey: process.env.NUXT_FIREBASE_API_KEY,
            authDomain: process.env.NUXT_FIREBASE_AUTH_DOMAIN,
            projectId: process.env.NUXT_FIREBASE_PROJECT_ID,
            storageBucket: process.env.NUXT_FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.NUXT_FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.NUXT_FIREBASE_APP_ID,
            measurementId: process.env.NUXT_FIREBASE_MEASUREMENT_ID,
        },
    },
    veeValidate: {
        // disable or enable auto imports
        autoImports: true,
        // Use different names for components
        componentNames: {
            Form: "VeeForm",
            Field: "VeeField",
            FieldArray: "VeeFieldArray",
            ErrorMessage: "VeeErrorMessage",
        },
    },
    primevue: {
        options: {
            theme: {
                preset: Aura,
                options: {
                    darkModeSelector: ".app-dark",
                },
            },
        },
    },
    pinia: {
        storesDirs: ["./stores/**", "./custom-folder/stores/**"],
    },
    runtimeConfig: {
        public: {
            baseUrl: "",
            reservationEmailContact: "",
        },
    },
    hooks: {
        "pages:extend"(pages) {
            pages.push({
                name: "createNewClassroom",
                path: "/class/new/edit",
                file: resolve(__dirname, "pages/class/[id]/edit.vue"),
            });
        },
    },
});
