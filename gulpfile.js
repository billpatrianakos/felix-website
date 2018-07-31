// Dev and Build Tasks
// -------------------
// Tasks to run in development and
// build apps for different environments.

// Require dependencies
let gulp  = require('gulp'),
    gls   = require('gulp-live-server');


// Server
// ------
// Start a local Express server
gulp.task('server', () => {
  // Start and configure a server instance
  let server = gls('./src/index.js', { env: { NODE_ENV: 'development', PORT: 9000 } });
  server.start();

  gulp.watch(['./src/public/**/*.{css,js}', './src/views/**/*.hbs'], (file) => {
    server.notify.apply(server, [file]);
  });
  gulp.watch(['./src/index.js', './src/{api,models,routes}/**/*.js'], () => {
    server.start.bind(server)();
  });
  // gulp.watch(['./src/index.js', './src/{api,models,routes}/**/*.js'], server.start.bind(server));
});


// LESS
// ----
// Transpile LESS to CSS
gulp.task('less', () => {
  return gulp.src('./src/public/less/style.less')
          .pipe(less())
          .pipe(gulp.dest('./src/public/css'));
});


// Watch
// -----
// Watch task - watch and run other tasks
gulp.task('watch', () => {
  gulp.watch(['./src/less/**/*.less'], ['less']);
});

gulp.task('setup', () => {
  gulp.src('./node_modules/normalize.css/normalize.css').pipe(gulp.dest('./src/public/vendor'));
})


// Default task
gulp.task('default', ['setup', 'server', 'watch']);
