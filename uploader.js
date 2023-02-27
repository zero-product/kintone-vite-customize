const { exec } = require('child_process')
const auth = require('./env/auth.json')

const args    = process.argv.slice(2);
const watch   = args.includes('--watch');
let command   = `kintone-customize-uploader ${watch ? '--watch' : ''} ./dest/manifest.json`
const options = [
  ['--base-url', auth.base_url],
  ['--username', auth.username],
  ['--password', auth.password],
  ['--dest-dir', './dist'],
]

options.forEach(opt => command += ` ` + opt.join(' '))
exec(command, (err, stdout, stderr) => {
  if (err) {
    console.log(`stderr: ${stderr}`)
    return
  }
  console.log(`stdout: ${stdout}`)
})
