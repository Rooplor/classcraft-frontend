import Aura from "@primevue/themes/aura";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-04-03",
    devtools: { enabled: true },
    modules: [
        "@primevue/nuxt-module",
        "@nuxtjs/tailwindcss",
        "@vee-validate/nuxt",
        "@pinia/nuxt",
    ],
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
        },
    },
});
