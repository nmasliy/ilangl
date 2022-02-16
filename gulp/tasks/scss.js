import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";
import cleanCss from "gulp-clean-css";
import webpCss from "gulp-webpcss";
import autoprefixer from "gulp-autoprefixer";
import groupCssMediaQueries from "gulp-group-css-media-queries";

const sass = gulpSass(dartSass);

export const scss = () => {
	return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
		// .pipe(app.plugins.plumber())
		.pipe(app.plugins.replace(/@img\//g, '../img/'))
		.pipe(sass({
			outputStyle: 'expanded',
		}))
		.pipe(
			app.plugins.gulpIf(
				app.isBuild,
				webpCss({})
			)
		)
		.pipe(
			app.plugins.gulpIf(
				app.isBuild,
				groupCssMediaQueries()
			)
		)
		.pipe(
			app.plugins.gulpIf(
				app.isBuild,
				autoprefixer({
					grid: true,
					overrideBrowserslist: ['last 5 versions'],
					cascade: true
				})
			)
		)
		.pipe(
			app.plugins.gulpIf(
				!app.isBuild,
				app.gulp.dest(app.path.build.css) // Не сжатый файл стилей
			)
		)
		// .pipe(
		// 	app.plugins.gulpIf(
		// 		app.isBuild,
		// 		cleanCss()
		// 	)
		// )
		// .pipe(rename({
		// 	extname: '.min.css'
		// }))
		.pipe(app.gulp.dest(app.path.build.css))
		.pipe(app.plugins.browsersync.stream())
}