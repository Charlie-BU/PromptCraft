import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-vue'],
  manifest: {
    icons: {
      "16": "favicon.png",
      "32": "favicon.png", 
      "48": "favicon.png",
      "96": "favicon.png",
      "128": "favicon.png"
    }
  }
});
