import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const DIST_DIR = path.join(__dirname, '../dist')

function fixPaths(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true })

  for (const file of files) {
    const fullPath = path.join(dir, file.name)

    if (file.isDirectory()) {
      fixPaths(fullPath)
    } else if (file.name.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf-8')

      // 计算相对路径深度 - 文件所在目录到 dist 根目录的深度
      const relPath = path.relative(dir, DIST_DIR)
      const relativeDepth = relPath ? relPath.split(path.sep).length : 0

      // 修复：对于根目录文件，相对路径深度为 0，不需要 ../
      // 对于子目录文件，使用 ../ 回到根目录
      const relativePath = relativeDepth > 0 ? '../'.repeat(relativeDepth) : ''

      // 替换 _astro 资源路径
      content = content.replace(/href="\/_astro\//g, `href="${relativePath}_astro/`)
      content = content.replace(/src="\/_astro\//g, `src="${relativePath}_astro/`)

      // 替换 favicon
      content = content.replace(/href="\/favicon\.svg"/g, `href="${relativePath}favicon.svg"`)

      // 替换其他绝对路径
      content = content.replace(/href="\/"/g, 'href="index.html"')
      content = content.replace(/href="\/blog"/g, `${relativePath}blog/index.html`)
      content = content.replace(/href="\/gallery"/g, `${relativePath}gallery/index.html`)
      content = content.replace(/href="\/games"/g, `${relativePath}games/index.html`)

      // 修复博客文章链接
      content = content.replace(/href="\/blog\/([^"]+)"/g, `${relativePath}blog/$1/index.html`)

      fs.writeFileSync(fullPath, content)
      const pathDisplay = relativePath || '(root)'
      console.log(`✓ Fixed: ${fullPath} (depth: ${relativeDepth}, path: '${pathDisplay}')`)
    }
  }
}

console.log('\n🔧 Fixing relative paths in dist/...\n')
fixPaths(DIST_DIR)
console.log('\n✅ Done! You can now open dist/index.html directly.\n')
