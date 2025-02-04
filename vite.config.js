import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    build: {
        rollupOptions: {
            base: "/pages-site/",
            outDir: "docs",
            input: {
                main: resolve(__dirname, "index.html"),
                about: resolve(__dirname, "./about/index.html"),
                information: resolve(__dirname, "./information/index.html"),
            },
        },
    },
});