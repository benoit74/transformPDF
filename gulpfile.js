var gulp = require('gulp');
var ts = require('gulp-typescript');
var mocha = require('gulp-mocha');

gulp.task('scripts', function () {
  var tsProject = ts.createProject('tsconfig.json');
  var tsResult = tsProject.src() 
    .pipe(ts(tsProject));
  return tsResult.js.pipe(gulp.dest('lib'))
});


function handleError(err) {
    console.log(err.toString());
      this.emit('end');
}

gulp.task("tests", function() {
    return gulp.src('lib/**/*Spec.js')
        .pipe(mocha({ reporter: "spec" })
            .on("error", handleError));
});

gulp.task('default', function() {
  gulp.watch('src/**/*.ts', ['scripts']);
  gulp.watch('lib/**/*Spec.js', ['tests']);
});
