const { src, dest, series, watch } = require('gulp'),
    fileinclude = require('gulp-file-include'),
    rename = require("gulp-rename"),
    sass = require('gulp-sass'),
    clean = require('gulp-clean'),
    livereload = require('gulp-livereload'),
    autoprefixer = require('gulp-autoprefixer'),
    csso = require('gulp-csso');
sass.compiler = require('node-sass')

function html() {
    return src('./src/pages/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(dest('dist/'))
        .pipe(livereload())
}

function scss() {
    return src('./src/pages/index.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(csso())
        .pipe(rename({
            basename: 'style',
            extname: '.min.css'
        }))
        .pipe(dest('dist/'))
        .pipe(livereload())
}

function deleteFiles() {
    return src('./dist', {read: false})
        .pipe(clean())
}

function copyImg() {
    return src('./src/img/*.(png|svg)')
        .pipe(dest('dist/img/'))
}

exports.default = function() {
    livereload.listen()
    watch('./src/**/*.html', html)
    watch('./src/**/*.scss', scss)
    watch('./src/**/*.svg', copyImg)
    watch('./src/**/*.png', copyImg)
}
exports.scss = scss;
exports.html = html;