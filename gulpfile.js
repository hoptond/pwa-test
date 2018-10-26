var gulp = require('gulp')
var sass = require('gulp-sass')
var sourcemaps = require('gulp-sourcemaps')
var babel = require("gulp-babel");

sass.compiler = require('node-sass')

gulp.task('sass', function() {
    return gulp.src('css/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./css'))
})

gulp.task('sass:watch', function () {
    gulp.watch('css/*.scss', ['sass'])
})


gulp.task("babel", function () {
    return gulp.src("js/*.js")
        .pipe(babel())
        .pipe(gulp.dest("dist"));
})


gulp.task('babel:watch', function () {
    gulp.watch('js/*.js', ['babel'])
})

gulp.task('default', function() {
    gulp.start('sass:watch')
    gulp.start('babel:watch')
})