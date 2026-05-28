import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const distServerDir = path.join(rootDir, 'dist-server');

async function run() {
  console.log('📦 Starting Static Site Generation (Prerendering)...');

  // 1. Build the SSR server bundle
  console.log('🔨 Building server-side SSR bundle...');
  execSync('npx vite build --ssr src/entry-server.tsx --outDir dist-server', { stdio: 'inherit', cwd: rootDir });

  // 2. Import the render function
  const serverEntryPath = path.join(distServerDir, 'entry-server.js');
  const { render } = await import(`file://${serverEntryPath}`);

  // 3. Read template
  const templatePath = path.join(distDir, 'index.html');
  const template = fs.readFileSync(templatePath, 'utf-8');

  // 4. Prerender Russian (Default)
  console.log('🇷🇺 Prerendering Russian version...');
  const appHtmlRu = render('ru');
  const htmlRu = template.replace(
    `<div id="root"></div>`,
    `<div id="root">${appHtmlRu}</div>`
  );
  fs.writeFileSync(templatePath, htmlRu, 'utf-8');

  // 5. Prerender English
  console.log('🇬🇧 Prerendering English version...');
  const appHtmlEn = render('en');
  let htmlEn = template.replace(
    `<div id="root"></div>`,
    `<div id="root">${appHtmlEn}</div>`
  );
  htmlEn = htmlEn.replace('<html lang="ru">', '<html lang="en">');
  htmlEn = htmlEn.replace(
    '<title>Base Yield Fund | DeFi-доходность институционального уровня</title>',
    '<title>Base Yield Fund | Institutional-Grade DeFi Yield Aggregator</title>'
  );
  htmlEn = htmlEn.replace(
    'content="Автоматизированное управление и оптимизация стейблкоинов USDC в сети Base. Сохраняйте 100% контроль над своими средствами на личном кошельке и получайте доход до 40% APY."',
    'content="Automated management and optimization of USDC stablecoins on the Base network. Keep 100% self-custody of your capital on-chain while capturing up to 40% APY."'
  );

  // Write English version to dist/en/index.html
  const enDir = path.join(distDir, 'en');
  if (!fs.existsSync(enDir)) {
    fs.mkdirSync(enDir, { recursive: true });
  }
  fs.writeFileSync(path.join(enDir, 'index.html'), htmlEn, 'utf-8');

  // 6. Clean up temporary server build
  console.log('🧹 Cleaning up temporary server builds...');
  fs.rmSync(distServerDir, { recursive: true, force: true });

  console.log('✅ Static Site Generation completed successfully!');
}

run().catch((err) => {
  console.error('❌ Prerendering failed:', err);
  process.exit(1);
});
