import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export default defineConfig({
  output: 'static',
  compressHTML: true,
  integrations: [preact()],
  build: {
    inlineStylesheets: 'always',
  },
});

