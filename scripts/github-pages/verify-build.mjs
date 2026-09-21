import { readFile, readdir } from 'node:fs/promises'
import { join, relative, resolve, posix } from 'node:path'
import { fileURLToPath } from 'node:url'

const EXTERNAL = /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i

export function expectedBase(repository = '') {
  const name = repository.split('/').filter(Boolean).at(-1) ?? ''
  return name.toLowerCase().endsWith('.github.io') ? '/' : `/${name}/`
}

function normalisePath(value, base) {
  if (value.startsWith('/')) return value
  return posix.join(base, value)
}

function localTarget(value, base) {
  const clean = value.split(/[?#]/, 1)[0]
  if (!clean || EXTERNAL.test(clean)) return null
  const target = normalisePath(clean, base).replace(/^\/+/, '')
  if (target.includes('..')) return { unsafe: true }
  return { path: target || 'index.html' }
}

async function filesUnder(root) {
  const result = []
  async function walk(dir) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name)
      if (entry.isDirectory()) await walk(path)
      else result.push(path)
    }
  }
  await walk(root)
  return result
}

export async function verifyBuild({ projectRoot = process.cwd(), outDir = 'dist', repository = process.env.GITHUB_REPOSITORY ?? '', configuredBase = '/' } = {}) {
  const dist = resolve(projectRoot, outDir)
  const errors = []
  const base = expectedBase(repository)
  if (configuredBase !== base) errors.push(`expected base ${base} but found ${configuredBase}`)

  let files
  try { files = await filesUnder(dist) } catch { return [`missing build directory: ${outDir}`] }
  const relativeFiles = new Set(files.map((file) => relative(dist, file).split('\\').join('/')))
  const requiredCv = 'docs/CV_Ilyass_achat.pdf'
  if (!relativeFiles.has('index.html')) errors.push('missing dist/index.html')
  if (!relativeFiles.has(requiredCv)) errors.push(`missing required CV: /${requiredCv}`)

  for (const file of files.filter((item) => /\.(?:html|css|js|mjs)$/i.test(item))) {
    const source = await readFile(file, 'utf8')
    const refs = []
    if (/\.html?$/i.test(file)) refs.push(...[...source.matchAll(/(?:href|src)=["']([^"']+)["']/gi)].map((match) => match[1]))
    if (/\.css$/i.test(file)) refs.push(...[...source.matchAll(/url\((?:["']?)([^)"']+)(?:["']?)\)/gi)].map((match) => match[1]))
    for (const ref of refs) {
      if (ref.startsWith('/public/')) errors.push(`${relative(dist, file)} references forbidden /public/ path: ${ref}`)
      const target = localTarget(ref, base)
      if (!target) continue
      if (target.unsafe) { errors.push(`${relative(dist, file)} references unsafe path: ${ref}`); continue }
      if (!relativeFiles.has(target.path)) errors.push(`${relative(dist, file)} references missing asset: ${ref}`)
    }
  }
  return errors
}

if (resolve(process.argv[1] ?? '') === fileURLToPath(import.meta.url)) {
  const errors = await verifyBuild()
  if (errors.length) {
    console.error(errors.map((error) => `✗ ${error}`).join('\n'))
    process.exitCode = 1
  } else console.log('✓ GitHub Pages build verified')
}
