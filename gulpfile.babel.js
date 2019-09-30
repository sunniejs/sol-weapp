import path from 'path'
import gulp from 'gulp'
import babel from 'gulp-babel'
import uglify from 'gulp-uglify'
import sass from 'gulp-sass'
import cleanCSS from 'gulp-clean-css'
import rename from 'gulp-rename'
import postcss from 'gulp-postcss'
import cssnano from 'gulp-cssnano'
import util from 'gulp-util'
import through2 from 'through2'
import autoprefixer from 'autoprefixer'
import del from 'del'
// Log for output msg.
function log() {
    var data = Array.prototype.slice.call(arguments)
    util.log.apply(false, data)
}
// 配置环境
const ENV = process.env.NODE_ENV
const isDev = ENV === 'development' || ENV === 'dev'
const isProd = ENV === 'production' || ENV === 'prod'
const buildPath = path.join(__dirname, isProd ? 'dist/' : 'example/dist/')
const format = isProd ? false : 'beautify'

const paths = {
    styles: {
        src: ['src/**/*.scss'],
        dest: buildPath
    },
    scripts: {
        src: 'src/**/*.js',
        dest: buildPath
    },
    copy: {
        src: ['src/**', '!src/**/*.scss', '!src/icon/fonts/**'],
        dest: buildPath
    }
}

/**
 * 自定义插件 - px to rpx
 */
const px2Rpx = () => {
    // 正则匹配
    const pxReplace = (value = '') => {
        const pxRegExp = /(\d*\.?\d+)px/gi
        const pxReplace = strArg => {
            const str = parseFloat(strArg)
            return str === 0 ? 0 : `${2 * str}rpx`
        }
        return value.replace(pxRegExp, pxReplace)
    }

    return through2.obj(function(file, encoding, cb) {
        // 如果文件为空，不做任何操作，转入下一个操作，即下一个pipe
        if (file.isNull()) {
            this.push(file)
            return cb()
        }

        // 插件不支持对stream直接操作，抛出异常
        if (file.isStream()) {
            this.emit('error', new util.PluginError('px2Rpx', 'Streaming not supported'))
            return cb()
        }

        // 内容转换，处理好后，再转成 Buffer 形式
        const content = pxReplace(file.contents.toString())

        file.contents = typeof Buffer.from === 'function' ? Buffer.from(content) : new Buffer(content)

        // 下面这两句基本是标配，可参考 through2 的 API
        this.push(file)
        cb()
    })
}

export const clean = () => del([buildPath])

// Sass 编译
export const styles = () =>
    gulp
        .src(paths.styles.src, { base: 'src' })
        .pipe(sass({ errLogToConsole: true, outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(px2Rpx())
        .pipe(postcss())
        .pipe(cleanCSS({ format }))
        .pipe(rename(path => (path.extname = '.wxss')))
        .pipe(gulp.dest(paths.styles.dest))

export const scripts = () =>
    gulp
        .src(paths.scripts.src, { base: 'src' })
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest(paths.scripts.dest))

export const copy = () => gulp.src(paths.copy.src, { base: 'src' }).pipe(gulp.dest(paths.copy.dest))

const watchFiles = () => {
    gulp.watch(paths.styles.src, styles).on('unlink', function(file) {
        log(util.colors.yellow(file) + ' is deleted')
        var tmp = file.replace(/src\\/, 'dist\\')
        del([tmp])
    })
    gulp.watch(paths.copy.src, copy).on('unlink', function(file) {
        log(util.colors.yellow(file) + ' is deleted')
        var tmp = file.replace(/src\\/, 'dist\\')
        del([tmp])
    })
}
export { watchFiles as watch }

export default gulp.series(gulp.parallel(styles, copy), watchFiles)

export const build = gulp.series(clean, gulp.parallel(styles, copy), scripts)
