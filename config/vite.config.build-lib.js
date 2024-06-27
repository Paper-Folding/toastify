import { resolve } from "path";
import { defineConfig } from "vite";
import { readFileSync } from "fs";

const packageJson = JSON.parse(readFileSync(process.env.npm_package_json));

const bannerPlugin = {
    name: "banner",
    enforce: "post",
    generateBundle(options, bundle) {
        const banner = `/*! ${process.env.npm_package_name}.js
 *  ${packageJson.description}
 *  @Author:  ${packageJson.author.name}
 *  @Source:  ${packageJson.homepage}
 *  @Version: ${process.env.npm_package_version}
 *  @license MIT licensed
 */
`;

        for (const module of Object.values(bundle)) {
            if (module.type === "chunk") module.code = banner + module.code;
            else module.source = banner + module.source;
        }
    }
};

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, "../src/toastify.js"),
            name: "Toastify",
            fileName: "toastify-es",
            formats: ["umd"]
        },
        outDir: "dist",
        rollupOptions: {
            output: {
                assetFileNames: (chunkInfo) => {
                    if (chunkInfo.name === "style.css") return "toastify.min.css";
                },
                entryFileNames: "toastify.min.js"
            }
        }
    },
    plugins: [bannerPlugin]
});
