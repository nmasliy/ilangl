import svgSprite from "gulp-svg-sprite";

export const svg = () => {
    return app.gulp.src(app.path.src.svgicons)
        .pipe(app.plugins.plumber())
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: `../icons/icons.svg`,
                    example: true
                }
            }
        }))
        .pipe(app.gulp.dest(app.path.build.images))
}