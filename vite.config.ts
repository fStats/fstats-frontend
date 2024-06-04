import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
    base: 'https://syorito-hatsuki.github.io/',
    plugins: [react()]
})