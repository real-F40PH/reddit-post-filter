const fs = require('fs')
const archiver = require('archiver')

const path = require('path')

const manifestPath = path.join(__dirname, '../public/manifest.json')
const manifestData = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
const distPath = path.join(__dirname, '../dist')
const filename = `reddit_post_filter_${manifestData["version"]}.zip`

fs.mkdirSync(distPath, { recursive: true })

const output = fs.createWriteStream(path.join(distPath, filename))
const archive = archiver('zip', { zlib: { level: 9 } })

output.on('close', () => {
  console.log(`Created ZIP: ${archive.pointer()} total bytes`)
})

archive.pipe(output)

// Zip the contents of the 'dist' folder (not the folder itself)
archive.directory(path.join(__dirname, '../build/'), false)

archive.finalize()
