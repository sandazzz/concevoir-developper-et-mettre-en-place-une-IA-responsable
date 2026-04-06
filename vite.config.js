import { defineConfig } from "vite";
import { fileURLToPath, URL } from 'url';

export default defineConfig({
  base: "/concevoir-developper-et-mettre-en-place-une-IA-responsable/", 
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./', import.meta.url)) // Alias for src folder
    }
  }
})