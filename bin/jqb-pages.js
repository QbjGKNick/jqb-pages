#!/usr/bin/env node

// console.log(process.argv);
// [ '/usr/local/bin/node', '/usr/local/bin/jqb-pages' ]
// 第一个是node的执行文件地址 第二是当前文件的地址
process.argv.push("--cwd");
process.argv.push(process.cwd()); // 当前命令行所在的目录
process.argv.push("--gulpfile");
process.argv.push(require.resolve(".."));

require("gulp/bin/gulp");
// console.log(process.argv);
