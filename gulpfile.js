var gulp = require('gulp');
var typescript = require('gulp-typescript');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');

gulp.task('minify-asyncss', function() {
    gulp.src('src/Asyncss.js')
        .pipe(uglify({
            preserveComments: 'some'
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/'))
});

gulp.task('minify-jq-asyncss', function() {
    var src = [
        'src/Asyncss.js',
        'src/jquery.asyncss.js'
    ];

    gulp.src(src)
        .pipe(concat('jquery.asyncss.min.js'))
        .pipe(uglify({
            preserveComments: 'some'
        }))
        .pipe(gulp.dest('dist/'))
});

gulp.task('dist', ['minify-asyncss', 'minify-jq-asyncss']);
gulp.task('default', ['dist']);