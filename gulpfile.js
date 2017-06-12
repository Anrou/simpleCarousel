var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var reload = browserSync.reload;
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var del = require('del');


// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "dist/"
        }
    });
});


//html
gulp.task('html', function () {
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.stream());
});



//css
gulp.task('css', function () {
    gulp.src('src/scss/**/*.*')
        .pipe(sourcemaps.init())
        //.pipe(sass().on('error', sass.logError))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer('last 5 version', 'ie 9'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});


//img
gulp.task('img', function () {
    gulp.src('src/images/**/')
        .pipe(gulp.dest('dist/images'));
});


//js
gulp.task('js', function () {
    gulp.src('src/js/**/*.*')
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});


//fonts
gulp.task('fonts', function () {
    gulp.src('src/fonts/*.*')
        .pipe(gulp.dest('dist/fonts'))
        .pipe(browserSync.stream());
});




// clean
gulp.task('clean', function() {
    return del('dist');
});


// watch
gulp.task('watch', function () {
    gulp.watch('src/*.html', ['html', 'reload']);
   // gulp.watch('src/*.json', ['json', 'reload']);
    gulp.watch('src/**/*.scss', ['css', 'reload']);
    gulp.watch('src/js/**', ['js', 'reload']);
    gulp.watch('src/imgages/**', ['img', 'reload']);
    gulp.watch('src/fonts/**', ['fonts','reload']);

    
});

gulp.task('reload', function() {
      gulp.watch(['src/*.html', 'src/*.scss', 'public/*.js'],
        {cwd: ''},
        reload);
});

//default
gulp.task('default', [ 'browser-sync', 'css','html','img', 'js', 'fonts', 'watch','reload']);

