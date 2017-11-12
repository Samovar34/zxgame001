// gulp & plugins
const gulp        = require("gulp"),
      zpath       = require("zpath"),
      cleanCSS    = require("gulp-clean-css"),
      fileInclude = require("gulp-file-include"),
      htmlMin     = require("gulp-htmlmin"),
      ifElse      = require("gulp-if-else"),
      sourcemaps  = require("gulp-sourcemaps"),
      uglify      = require("gulp-uglify"),
      sass        = require("gulp-sass");

// node modules
const http = require("http");

// http static server
const fileServer = new (require("node-static")).Server("./build", {
    cache: 0,
    headers: {"Cache-Control": "no-cache, must-revalidate"}
});

// paths
let srcFolder   = zpath.create("src"),
    buildFolder = zpath.create("build");

let srcViewFolder   = srcFolder.make("*.html"),
    srcStyleFolder  = srcFolder.make("style *.scss"),
    srcJsFolder     = srcFolder.make("js *.js"),
    srcAssetsFolder = srcFolder.make("assets ** *.*");

let buildViewFolder   = buildFolder.make(),
    buildStyleFolder  = buildFolder.make("style"),
    buildJsFolder     = buildFolder.make("js"),
    buildAssetsFolder = buildFolder.make("assets");

let watchViewFolder   = srcViewFolder,
    watchStyleFolder  = srcStyleFolder,
    watchJsFolder     = srcFolder.make("js ** *.js"),
    watchAssetsFolder = srcAssetsFolder;

// tasks

// build
gulp.task("build:view", () => {
    gulp.src(srcViewFolder)
        .pipe(ifElse(process.env.NODE_ENV === "production", function () {
            return htmlMin({collapseWhitespace: true});
        }))
        .pipe(gulp.dest(buildViewFolder));
});

gulp.task("build:style", () => {
    gulp.src(srcStyleFolder)
        .pipe(ifElse(process.env.NODE_ENV !== "production", sourcemaps.init))
        .pipe(sass.sync().on("error", sass.logError))
        .pipe(ifElse(process.env.NODE_ENV === "production", function () {
            return cleanCSS({compatibility: "ie9"});
        }))
        .pipe(ifElse(process.env.NODE_ENV !== "production", sourcemaps.write))
        .pipe(gulp.dest(buildStyleFolder));
});

gulp.task("build:js", () => {
    gulp.src(srcJsFolder)
        .pipe(ifElse(process.env.NODE_ENV !== "production", sourcemaps.init))
        .pipe(fileInclude("//@@"))
        .pipe(ifElse(process.env.NODE_ENV === "production", uglify))
        .pipe(ifElse(process.env.NODE_ENV !== "production", sourcemaps.write))
        .pipe(gulp.dest(buildJsFolder));
});

gulp.task("build:assets", () => {
    gulp.src(srcAssetsFolder)
        .pipe(gulp.dest(buildAssetsFolder));
});

gulp.task("build", ["build:view", "build:style", "build:js", "build:assets"], (done) => {
    done();
});

// serve
gulp.task("serve", (done) => {
    var server = http.createServer((req, res) => {
        req.addListener("end", () => {
            
            fileServer.serve(req, res, (err, result) => {
                if (err) {
                    res.writeHead(err.status, err.headers);
                    res.end(err.message);
                }
            });
        }).resume();
    });

    server.listen(8080, () => {
        done();
        console.log("Listening...");
    });
});

// watch
gulp.task("watch", (done) => {
    gulp.watch(watchViewFolder, ["build:view"]);
    gulp.watch(watchStyleFolder, ["build:style"]);
    gulp.watch(watchJsFolder, ["build:js"]);
    gulp.watch(watchAssetsFolder, ["build:assets"]);
    done();
    setTimeout(function () {
        console.log("Watching...");
    }, 1);
});


//default
gulp.task("default", ["build"], (done) => {
    gulp.start("watch");
    gulp.start("serve");
    done();
});


