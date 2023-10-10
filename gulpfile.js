const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require('sass')),
    cssnano = require ("gulp-cssnano"),
    autoprefixer = require ('gulp-autoprefixer'),
    imagemin = require ('gulp-imagemin'),
    concat = require ("gulp-concat"),
    rename = require ("gulp-rename");
function taskJs() {
    return src(['app/js/*.js'])
        .pipe(dest('dist/js'))
}
function taskHtml() {
    return src("app/*.html")
        .pipe (dest ("dist"));
}
function taskSass() {
    return src ("app/sass/*.scss")
        .pipe (concat ('styles.scss'))
        .pipe (sass())
        .pipe (autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe (cssnano())
        .pipe (rename({suffix: '.min'}))
        .pipe (dest ("dist/css"));
}
function taskImages() {
    return src ("app/img/*.+(jpg|jpeg|png|gif)")
        .pipe (imagemin ({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true
        }))
        .pipe (dest ("dist/images"))
}
function taskWatch(){
    watch ( "app/*.html", series([taskHtml])),
    watch ( "app/js/*.js", series([taskJs])),
    watch ( "app/sass/*.scss", series([taskSass])),
    watch ( "app/images/*.+(jpg|jpeg|png|gif)", series([taskImages]))
}
//exports.task_js = taskJs

exports.default = series([taskJs, taskHtml, taskImages, taskSass, taskWatch])