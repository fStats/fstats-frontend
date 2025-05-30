import {defineConfig} from "vite"
import react from "@vitejs/plugin-react-swc"
import tsconfigPaths from "vite-tsconfig-paths";
import {visualizer} from "rollup-plugin-visualizer";

export default defineConfig(({mode}) => {
    const shouldAnalyze = mode === 'analyze';

    return {
        base: "/",
        build: {
            rollupOptions: {
                output: {
                    manualChunks: {
                        vendor: [
                            "react",
                            "react-dom",
                            "@tanstack/react-query",
                            "react-router-dom",
                            "date-fns",
                            "notistack",
                        ],
                        material: [
                            "@mui/material",
                            "@mui/lab",
                            "@emotion/react",
                            "@emotion/styled",
                        ],
                        muiIcons: ["@mui/icons-material"],
                        charts: [
                            "chart.js",
                            "react-chartjs-2",
                            "chartjs-adapter-date-fns",
                            "chartjs-chart-geo",
                            "chartjs-plugin-datalabels",
                            "chartjs-plugin-zoom",
                        ],
                        syntaxHighlighter: ["react-syntax-highlighter"],
                    },
                },
            },
        },
        plugins: [
            react(),
            tsconfigPaths(),
            shouldAnalyze && visualizer({
                open: true,
                gzipSize: true,
                brotliSize: true,
            }),
        ].filter(Boolean)
    }
})