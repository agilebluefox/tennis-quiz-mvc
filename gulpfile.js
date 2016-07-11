var gulp =  require('gulp'),
    gutil = require('gulp-util'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    order = require('gulp-order'),
    plumber = require('gulp-plumber');

// Copy index file to main directory
gulp.task('add-html', function () {
    gulp.src('source/index.html')
    .pipe(gulp.dest('./'));
});

// Copy images directory to main directory
gulp.task('add-images', function () {
    gulp.src('source/images/*')
    .pipe(gulp.dest('./images'));
});

// Copy the normalize css file to the source directory
gulp.task('add-normalize', function() {
    gulp.src('node_modules/normalize-css/normalize.css')
    .pipe(gulp.dest('source/css/'))
});

// Transpile less files to css and store source maps
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });

gulp.task('less', function() {
  return gulp.src('./source/less/*.less', {base: './source/less'})
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(less({
            plugins: [autoprefix]
            }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./source/css'));
});

// Minimize css files and add to dist directory
var cleanCSS = require('gulp-clean-css');

gulp.task('minify-css', ['add-normalize', 'less'], function() {
    return gulp.src('source/css/*.css')
        .pipe(plumber())
        .pipe(order(['normalize.css',
            'index.css']))
        .pipe(concat('./bundle.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./css'));
});

// Copy the jquery file to the source js libs directory
gulp.task('add-jquery', function () {
     gulp.src('node_modules/jquery/dist/jquery.js')
     .pipe(gulp.dest('source/js/libs/'))
});

var uglify = require('gulp-uglify');

// Handle the js files
gulp.task('minify-js', ['add-jquery'], function () {
    gulp.src(['./source/js/**/*.js', '!./**/js/index.js'])
    .pipe(plumber())
    .pipe(order(['libs/jquery.js',
        'questions.js',
        'model.js',
        'view.js',
        'controller.js',
        'app.js']))
    .pipe(uglify())
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./js'));
});

gulp.task('default', function () {
    return gutil.log('Gulp is running!')
});