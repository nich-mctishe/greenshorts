if (process.env.NODE_ENV !== 'production') {
  console.log('starting watch command...')
  const chokidar = require('chokidar')
  const path = require('path')
  const watcher = chokidar.watch([
    'actions',
    'config',
    'helpers',
    'models',
    'routes',
    'services',
    'utils',
    'index.js'
  ].map(f => path.resolve(__dirname, '../', f)), {
    usePolling: true,
    interval: 1000
  })

  watcher.on('ready', () => {
    console.log('file watcher ready to detect changes')
    watcher.on('all', (event, path) => {
      console.log('change detected in ' + path + '; reloading...')
      process.exit(1);
    })
  })
}
