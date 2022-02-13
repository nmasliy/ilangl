import del from 'del';
import toZip from "gulp-zip";

export const zip = () => {
    del(`./${app.path.rootFolder}.zip`);
    return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {})
        .pipe(app.plugins.plumber())
        .pipe(toZip(`${app.path.rootFolder}.zip`))
        .pipe(app.gulp.dest('./'))
}