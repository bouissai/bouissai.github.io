import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { expectedBase, verifyBuild } from '../scripts/github-pages/verify-build.mjs'

async function fixture(html, files = {}) {
  const root = await mkdtemp(join(tmpdir(), 'pages-verify-'))
  const dist = join(root, 'dist')
  await mkdir(dist)
  await writeFile(join(dist, 'index.html'), html)
  for (const [name, content] of Object.entries(files)) { await mkdir(join(dist, name, '..'), { recursive: true }); await writeFile(join(dist, name), content) }
  return root
}

test('derives local, user and project site bases', () => { assert.equal(expectedBase(''), '/'); assert.equal(expectedBase('bouissai/bouissai.github.io'), '/'); assert.equal(expectedBase('bouissai/portfolio'), '/portfolio/') })
test('accepts external and special URL schemes', async () => { const root = await fixture('<a href="https://example.com">x</a><a href="mailto:a@b.fr">m</a><a href="#top">h</a><img src="data:image/png;base64,AA">', { 'docs/CV_Ilyass_achat.pdf': 'cv' }); assert.deepEqual(await verifyBuild({ projectRoot: root, outDir: 'dist', repository: 'bouissai/bouissai.github.io', configuredBase: '/' }), []) })
test('reports public paths, missing assets and wrong base', async () => { const root = await fixture('<script src="/public/app.js"></script><img src="/missing.png">', { 'docs/CV_Ilyass_achat.pdf': 'cv' }); const errors = await verifyBuild({ projectRoot: root, outDir: 'dist', repository: 'bouissai/portfolio', configuredBase: '/' }); assert.ok(errors.some((error) => error.includes('expected base'))); assert.ok(errors.some((error) => error.includes('/public/'))); assert.ok(errors.some((error) => error.includes('missing.png'))) })
test('validates CSS references and required CV', async () => { const root = await fixture('<link rel="stylesheet" href="/assets/app.css">', { 'assets/app.css': '.hero{background:url(/photo.webp)}' }); const errors = await verifyBuild({ projectRoot: root, outDir: 'dist', repository: 'bouissai/bouissai.github.io', configuredBase: '/' }); assert.ok(errors.some((error) => error.includes('photo.webp'))); assert.ok(errors.some((error) => error.includes('CV_Ilyass_achat.pdf'))) })
