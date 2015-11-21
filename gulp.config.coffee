config = {}

config.minify = false
if process.env.NODE_ENV == 'production'
  config.minify = true
if process.env.NODE_ENV == 'staging'
  config.minify = true

config.livereload = true
config.lint = true

config.input = {}
# Where sources are located
config.input.path = 'src'
# Main index file
config.input.jade = "#{config.input.path}/index.jade"
# Where to find templates
config.input.template = [
  "#{config.input.path}/*.jade"
  "#{config.input.path}/**/*.jade"
]
# Where to find coffee files
config.input.coffee = [
  "#{config.input.path}/*.coffee"
  "#{config.input.path}/**/*.coffee"
]

# Where to find less file(s)
config.input.less = {}
config.input.less.enabled = true
config.input.less.main = "#{config.input.path}/style/main.less"
config.input.less.watch = [
  "#{config.input.path}/**/*.less"
]

config.input.vendor = {}
config.input.vendor.watch = [
  'bower.json'
  'bower_components/*'
]

config.input.replace = {}
config.input.replace.enabled = true
config.input.replace.patterns = []

# Static files
config.input.static = {}
# Can add keys in both input and output to add static profile
config.input.static.fonts = [
  'bower_components/ionic/release/fonts/*'
  # 'bower_components/bootstrap/fonts/*'
]
config.input.static.ioniccss = [
  'bower_components/ionic/release/css/ionic.min.css'
]
config.input.static.ie8js = [

]
config.input.static.ie8css = [

]

# Loopback configuration
config.input.loopback = {}
config.input.loopback.watch = [] # Files to watch
config.input.loopback.enabled = false
config.input.loopback.prefix =
  replace: true
  with: '$YourApplicationName$'
config.input.loopback.server = '../path/to/server.coffee'
config.input.loopback.url = 'http://example.com/api/'

config.output = {}
# Output directory
config.output.path = 'www'

config.output.script = "#{config.output.path}/script"

config.output.application = 'application.js'

config.output.template = {}
config.output.template.filename = 'templates.js'
config.output.template.module = 'thinder.template'

config.output.vendor = 'vendor.js'

config.output.manifest = config.output.path

config.output.static = {}
config.output.static.fonts = "#{config.output.path}/fonts"
config.output.static.ioniccss = "#{config.output.path}/style"

config.output.loopback = {}
config.output.loopback.filename = 'services.js'
config.output.loopback.path = "#{config.output.path}/script"
config.output.loopback.module = 'application.service'

config.output.less = "#{config.output.path}/style"

module.exports = config
