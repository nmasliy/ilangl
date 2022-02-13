import replace from "gulp-replace";
import plumber from "gulp-plumber";
import browsersync from "browser-sync";
import newer from "gulp-newer";
import gulpIf from "gulp-if";

export const plugins = {
    replace,
    plumber,
    browsersync,
    newer,
    gulpIf
}