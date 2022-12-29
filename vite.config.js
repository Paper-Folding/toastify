import { resolve } from 'path';
import { defineConfig } from "vite";

export default defineConfig({
    server: {
        host: true,
        port: 3000
    },
    build: {
        lib: {
            entry: resolve(__dirname, 'lib/toastify-es.js'),
            name: 'Toastify',
            fileName: 'toastify-es',
            formats: ['umd'],
        },
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
 * 
 * Copyright (C) 2018 Varun A P
 */
`;
                        for (const module of Object.values(bundle)) {
                            if (module.type === 'chunk') {
                                module.code = banner + module.code;
                            }
                        }
                    }
                }
            ]
        }
    }
})