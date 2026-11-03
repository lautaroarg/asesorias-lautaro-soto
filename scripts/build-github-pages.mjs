import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
execFileSync(process.execPath,['node_modules/vite/bin/vite.js','build','--config','vite.github-pages.config.ts'],{stdio:'inherit'});
writeFileSync('docs/.nojekyll','');
