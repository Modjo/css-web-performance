var gulp         = require('gulp');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var postcss      = require('gulp-postcss');
var uncss        = require('postcss-uncss');
var cssnano      = require('cssnano');
var notify       = require('gulp-notify');

// Adjust this two variables to your project architecture
var input = './dev/scss/**/*.scss';
var output = './prod/assets/css';


// Postcss plugins options
var plugins = [
  uncss({
    // This is an array of URLs in which you want to remove unused CSS
    html: ['http://yoursite.com', 'localhost:8000', '/dev/views/*.html']
  }),
  cssnano()
];


gulp.task('sass', function () {
  return gulp
    .src(input)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', notify.onError(function (error) {
      return "Problem file : " + error.message;
    })))
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write('/maps'))
    .pipe(gulp.dest(output));
});

// Sass Watch
gulp.task('watch', function() {
  return gulp
    // Watch the input folder for change,
    // and run `sass` task when something happens
    .watch(input, ['sass'])
    // When there is a change,
    // log a message in the console
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});


gulp.task('default', ['sass', 'watch']);