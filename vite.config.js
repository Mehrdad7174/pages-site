import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    base: "/pages-site/",
    build: {
        outDir: "docs",
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                about: resolve(__dirname, "about/index.html"),
                information: resolve(__dirname, "information/index.html"),
                second_page: resolve(__dirname, "second-page/index.html"),
                to_do_list: resolve(__dirname, "to-do-list/index.html"),
            },
        },
    },
});