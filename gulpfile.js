var $ = require('gulp-load-plugins')();
var sequence = require('run-sequence');
var argv = require('yargs').argv;
var gulp = require('gulp');
var rimraf = require('rimraf');
var sequence = require('run-sequence');
var build_path = './public';
var src_path = './src';

// Check for --production flag
var isProduction = !!(argv.production);

var paths = {
  assets: [
    src_path + '/**/*.*',
    '!' + src_path + '/templates/**/*.*',
    '!' + src_path + '/{scss,js}/**/*.*'
  ],
  sass: [
    src_path + '/scss',
  ],
  appJS: [
    'bower_components/angular/angular.js',
    'bower_components/angular-ui-router/release/angular-ui-router.min.js',
    // 'bower_components/jquery/dist/jquery.min.js',    
    'bower_components/fullpage.js/jquery.fullPage.min.js',
    src_path + '/js/app.js',
    src_path + '/js/**/*.js'
  ]
}

// Compiles Sass
gulp.task('sass', function() {
  console.log(src_path + '/scss/app.scss');
  return gulp.src(src_path + '/scss/app.scss')
    .pipe($.sass({
      includePaths: paths.sass,
      outputStyle: (isProduction ? 'compressed' : 'nested'),
      errLogToConsole: true
    }))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie 10']
    }))
    .pipe(gulp.dest(build_path + '/css/'));
});

gulp.task('javascripts', function() {
  var uglify = $.if(isProduction, $.uglify()
    .on('error', function(e) {
      console.log(e);
    }));

  return gulp.src(paths.appJS)
    .pipe(uglify)
    .pipe($.concat('app.js'))
    .pipe(gulp.dest(build_path + '/js/'));
});

// Cleans the build directory
gulp.task('clean', function(cb) {
  rimraf(build_path, cb);
});

// Copies everything in the client folder except templates, scss, and js
gulp.task('copy', function() {
  return gulp.src(paths.assets, {
      base: src_path
    })
    .pipe(gulp.dest(build_path));
});

// Copies templates
gulp.task('copy:templates', function() {
  return gulp.src(src_path + '/templates/**/*.html')
    .pipe(gulp.dest(build_path + '/templates'));
});

// Starts a test server, which you can view at http://localhost:8080
gulp.task('server', ['build'], function() {
  gulp.src(build_path)
    .pipe($.webserver({
      port: 8000,
      host: 'localhost',
      fallback: 'index.html',
      livereload: true,
      open: true
    }));
});

// Builds your entire app once, the callback is to start the server
gulp.task('build', function(cb) {
  sequence('clean', ['copy', 'sass', 'javascripts'], 'copy:templates', cb);
});

// Default task: builds your app, and recompiles assets when they change
gulp.task('default', ['server'], function() {
  // Watch Sass
  gulp.watch([src_path + '/scss/**/*', './scss/**/*'], ['sass']);

  // Watch JavaScript
  gulp.watch([src_path + '/js/**/*', './js/**/*'], ['javascripts']);

  // Watch static files
  gulp.watch([src_path + '/**/*.*', '!' + src_path + '/templates/**/*.*', '!' + src_path + '/{scss,js}/**/*.*'], ['copy']);

  // Watch app templates
  gulp.watch([src_path + '/templates/**/*.html'], ['copy:templates']);
});
