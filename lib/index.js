const { src, dest, parallel, series, watch } = require("gulp");

const del = require("del");
const browserSync = require("browser-sync");
const loadPlugins = require("gulp-load-plugins"); // 自动加载所有gulp插件
const plugins = loadPlugins();
const bs = browserSync.create();
const cwd = process.cwd();
let config = {
  // default config
  build: {
    src: "src",
    dist: "dist",
    temp: "temp",
    public: "public",
    paths: {
      styles: "assets/styles/*.scss",
      scripts: "assets/scripts/*.js",
      pages: "*.html",
      image: "assets/images/**",
      fonts: "assets/fonts/**",
    },
  },
};
try {
  const loadConfig = require(`${cwd}/pages.config.js`);
  config = Object.assign({}, config, loadConfig);
} catch (e) {}
// const sass = require('gulp-sass')(require('sass'))
// const plugins.babel = require('gulp-babel')
// const plugins.swig = require('gulp-swig')
// const plugins.imagemin = require('gulp-imagemin')

const clean = () => {
  return del([config.build.dist, config.build.temp]);
};

const style = () => {
  // { base: 'src'} 保留原有目录结构
  return (
    src(config.build.paths.styles, {
      base: config.build.src,
      cwd: config.build.src,
    })
      // .pipe(sass({ outputStyle: 'expanded' }))
      .pipe(plugins.sass(require("sass"))({ outputStyle: "expanded" }))
      .pipe(dest(config.build.temp))
      .pipe(bs.reload({ stream: true }))
  );
};

const script = () => {
  return src(config.build.paths.scripts, {
    base: config.build.src,
    cwd: config.build.src,
  })
    .pipe(
      plugins.babel({
        presets: [require("@babel/preset-env")],
      })
    )
    .pipe(dest(config.build.temp))
    .pipe(bs.reload({ stream: true }));
};

const page = () => {
  return src(config.build.paths.pages, {
    base: config.build.src,
    cwd: config.build.src,
  })
    .pipe(plugins.swig({ data: config.data, defaults: { cache: false } })) // 防止模板缓存导致页面不能及时更新
    .pipe(dest(config.build.temp))
    .pipe(bs.reload({ stream: true }));
};

const image = () => {
  return src(config.build.paths.image, {
    base: config.build.src,
    cwd: config.build.src,
  })
    .pipe(plugins.imagemin())
    .pipe(dest(config.build.dist));
};

const font = () => {
  return src(config.build.paths.fonts, {
    base: config.build.src,
    cwd: config.build.src,
  })
    .pipe(plugins.imagemin())
    .pipe(dest(config.build.dist));
};

const extra = () => {
  return src("**", {
    base: config.build.public,
    cwd: config.build.public,
  }).pipe(dest(config.build.dist));
};

const serve = () => {
  watch(config.build.paths.styles, { cwd: config.build.src }, style);
  watch(config.build.paths.scripts, { cwd: config.build.src }, script);
  watch(config.build.paths.pages, { cwd: config.build.src }, page);
  // watch('src/assets/images/**', image)
  // watch('src/assets/fonts/**', font)
  // watch('public/**', extra)
  watch(
    [config.build.paths.image, config.build.paths.fonts],
    { cwd: config.build.src },
    bs.reload
  );

  watch("**", { cwd: config.build.public }, bs.reload);

  bs.init({
    notify: false, // 关闭开启浏览器页面 browser-sync连接提示
    port: 2090,
    // open: false, // 自动打开浏览器
    // files: 'dist/**', // dist下文件修改浏览器自动变化
    /**
     * routes 配置优先于baseDir,会先去寻找routes中是否有配置，然后再去baseDir
     */
    server: {
      baseDir: [config.build.temp, config.build.src, config.build.public],
      routes: {
        "/node_modules": "node_modules",
      },
    },
  });
};

const useref = () => {
  return (
    src(config.build.paths.pages, {
      base: config.build.temp,
      cwd: config.build.temp,
    })
      .pipe(plugins.useref({ searchPath: [config.build.temp, "."] }))
      // html js css
      .pipe(plugins.if(/\.js$/, plugins.uglify()))
      .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
      // 压缩空格符
      .pipe(
        plugins.if(
          /\.html$/,
          plugins.htmlmin({
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true,
          })
        )
      )
      .pipe(dest(config.build.dist))
  );
};

const compile = parallel(style, script, page);

// 上线之前执行的任务
const build = series(
  clean,
  parallel(series(compile, useref), image, font, extra)
);

const develop = series(compile, serve);

module.exports = {
  clean,
  build,
  develop,
};
