#! /usr/bin/env node

import inquirer from 'inquirer'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { readdir, writeFileSync } from 'fs'
import { renderFile } from 'ejs'

// 获取 __dirname 的 ESM 写法
const __dirname = dirname(fileURLToPath(import.meta.url));

inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: '输入项目名称：',
        default: 'mvp-cli',
    },
]).then(answers => {
    // 模板url
    const temUrl = join(__dirname, 'templates');

    // 控制台所在url为生成文件url
    const cwdUrl = process.cwd();

    console.log("answers", answers);
    console.log("temUrl", temUrl);
    console.log("cwdUrl", cwdUrl);

    readdir(temUrl, (err, files) => {
        if(err) throw err;

        files.forEach((file) => {
            
            // 使用 ejs.renderFile 渲染对应的模版文件
            // renderFile（模版文件地址，传入渲染数据）
            renderFile(join(temUrl, file), answers).then(data => {

                // 生成 ejs 处理后的模版文件
                writeFileSync(join(cwdUrl, file), data)
            })
        })
    })
})