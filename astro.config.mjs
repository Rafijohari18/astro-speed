import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

export default defineConfig({
  output: 'static',
  compressHTML: true,
  integrations: [preact()],
  build: {
    inlineStylesheets: 'always',
  },
});
