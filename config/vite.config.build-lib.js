import { resolve } from 'path';
import { defineConfig } from "vite";


export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, '../src/toastify.js'),
            name: 'Toastify',
            fileName: 'toastify-es',
            formats: ['umd'],
        },
        outDir: "dist",
        rollupOptions: {
            output: {
                assetFileNames: (chunkInfo) => {
                    if (chunkInfo.name === 'style.css')
                        return 'toastify.min.css';
                },
                entryFileNames: 'toastify.min.js',
            },
            plugins: [
                {
                    name: 'banner',
                    enforce: 'post',
                    generateBundle(options, bundle) {
                        const banner = `/*! Toastify js ${process.env.npm_package_version}
 * https://github.com/Paper-Folding/toastify
 * @license MIT licensed 
 */
`;
                        for (const module of Object.values(bundle)) {
                            if (module.type === "chunk") module.code = banner + module.code;
                            else module.source = banner + module.source;
                        }
                    }
                }
            ]
        }
    }
})