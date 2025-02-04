import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    base: "/pages-site/",
    build: {
        outDir: "docs",
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                about: resolve(__dirname, "about/index.html"),
                information: resolve(__dirname, "information/index.html"),
            },
        },
    },
});