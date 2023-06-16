#!/usr/bin/env node
const { program } = require('commander');
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');

const catTemplate = `
░░░░░░░░░░██░░░░░░░░░░██░░░░░░░░
░░░░░░░░██░░██░░░░░░██░░██░░░░░░
░░░░░░░░██░░░░██████░░░░██░░░░░░
░░░░░░░░██░░░░░░░░░░░░░░██░░░░░░
░░░░██████░░██░░░░░░██░░██████░░
░░░░██░░░░░░██░░░░░░██░░░░░░██░░
░░░░░░██░░░░░░░░██░░░░░░░░██░░░░
░░░░░░░░██░░░░██░░██░░░░██░░░░░░
░░░░░░░░░░██████████████░░░░░░░░
░░░░░░░░░░██░░░░░░░░██░░░░░░░░░░
░░░░░░░░██░░░░░░░░████░░░░░░░░░░
░░░░░░░░██░░░░░░░░██░░░░░░░░░░░░
██░░░░██░░░░░░██░░██░░░░░░░░░░░░
██░░░░██░░██░░██░░████░░░░░░░░░░
██░░██░░░░██░░██░░██░░██░░░░░░░░
░░░░██░░░░██░░██░░██░░██░░░░░░░░
`;

const heartTemplate = `
┈┈┈┈┈┈┈┈┈┈┈┈
┈┈◢▇◣┈┈◢▇◣┈┈
┈┈▇▇▇◣◢▇▇▇┈┈
┈┈◥▇▇▇▇▇▇◤┈┈
┈┈┈◥▇▇▇▇◤┈┈┈
┈┈┈┈◥▇▇◤┈┈┈┈
┈┈┈┈┈◥◤┈┈┈┈┈
`;

const teaTemplate = `
░░░░░░░░░░░░░░░░▄█░░░░░░░░░░░░░░
░░░░░░░░░░░░░░▄▄█▀░░░░░░░░░░░░░░
░░░░░░░░░░░░███▀░█░░░░░░░░░░░░░░
░░░░░░░░░░░▄██░▄█▀░░░░░░░░░░░░░░
░░░░░░░░░░░▀████░░░░░░░░░░░░░░░░
░░░░░░░░░░░░▀█░█░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄░░░░░░░░
░░░░░░██████████████████▀▀▄░░░░░
░░░░░░██████████████████░░██░░░░
░░░░░░██████████████████▄▄▀░░░░░
░░░░░░▀████████████████▀░░░░░░░░
░░░░░░░░▀█████████████░░░░░░░░░░
░░░▄▄▄▄▄▄▄██████████▄▄▄▄▄▄▄░░░░░
░░░▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
`;

const houseTemplate = `
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░████░░░░░░░░░░░░░░
░░░░░░░░░░░░████████░░░░░░░░░░░░
░░░░░░░░░░████████████░░░░░░░░░░
░░░░░░░░████████████████░░░░░░░░
░░░░░░████████████████████░░░░░░
░░░░████████████████████████░░░░
░░████████████████████████████░░
░░████████████████████████████░░
░░██░░░░░░░░░░░░░░░░░░░░░░░░██░░
░░██░░██████░░░░░░░░██████░░██░░
░░██░░██████░░░░░░░░██████░░██░░
░░██░░██████░░░░░░░░██████░░██░░
░░██░░░░░░░░░░████░░░░░░░░░░██░░
░░██░░░░░░░░░░████░░░░░░░░░░██░░
░░████████████████████████████░░
`;


const exist = (dir) => {
  try {
    fs.accessSync(dir, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK);
    return true;
  } catch (e) {
    return false;
  }
};

const mkdirp = (dir) => {
  const dirname = path
    .relative('.', path.normalize(dir))
    .split(path.sep)
    .filter(p => !!p);
  dirname.forEach((d, idx) => {
    const pathBuilder = dirname.slice(0, idx + 1).join(path.sep);
    if (!exist(pathBuilder)) {
      fs.mkdirSync(pathBuilder);
    }
  });
};

const makeTemplate = (type, name, directory) => {
  mkdirp(directory);
  if (type === 'cat') {
    const pathToFile = path.join(directory, `${name}.cat`);
    if (exist(pathToFile)) {
      console.error(chalk.bold.red('이미 해당 파일이 존재합니다'));
    } else {
      fs.writeFileSync(pathToFile, catTemplate);
      console.log(chalk.green(pathToFile, '생성 완료'));
    }
  } else if (type === 'heart') {
    const pathToFile = path.join(directory, `${name}.heart`);
    if (exist(pathToFile)) {c
      console.error(chalk.bold.red('이미 해당 파일이 존재합니다'));
    } else {
      fs.writeFileSync(pathToFile, heartTemplate);
      console.log(chalk.green(pathToFile, '생성 완료'));
    }
  } else if (type === 'tea') {
    const pathToFile = path.join(directory, `${name}.tea`);
    if (exist(pathToFile)) {c
      console.error(chalk.bold.red('이미 해당 파일이 존재합니다'));
    } else {
      fs.writeFileSync(pathToFile, teaTemplate);
      console.log(chalk.green(pathToFile, '생성 완료'));
    }
  } else if (type === 'house') {
    const pathToFile = path.join(directory, `${name}.house`);
    if (exist(pathToFile)) {c
      console.error(chalk.bold.red('이미 해당 파일이 존재합니다'));
    } else {
      fs.writeFileSync(pathToFile, houseTemplate);
      console.log(chalk.green(pathToFile, '생성 완료'));
    }
  } else {
    console.error(chalk.bold.red('cat, heart, tea, house  중 하나를 입력하세요.'));
  }
};

program
  .version('0.0.1', '-v, --version')
  .name('cli');

program
  .command('template <type>')
  .usage('<type> --filename [filename] --path [path]')
  .description('템플릿을 생성합니다.')
  .alias('tmpl')
  .option('-f, --filename [filename]', '파일명을 입력하세요.', 'index')
  .option('-d, --directory [path]', '생성 경로를 입력하세요', '.')
  .action((type, options, command) => {
    makeTemplate(type, options.filename, options.directory);
  });

program
  .action((options, command) => {
    if (command.args.length !== 0) {
      console.log(chalk.bold.red('해당 명령어를 찾을 수 없습니다.'));
      program.help();
    } else {
      inquirer.prompt([{
        type: 'list',
        name: 'type',
        message: '템플릿 종류를 선택하세요.',
        choices: ['cat', 'heart', 'tea', 'house'],
      }, {
        type: 'input',
        name: 'name',
        message: '파일의 이름을 입력하세요.',
        default: 'index',
      }, {
        type: 'input',
        name: 'directory',
        message: '파일이 위치할 폴더의 경로를 입력하세요.',
        default: '.',
      }, {
        type: 'confirm',
        name: 'confirm',
        message: '생성하시겠습니까?',
      }])
        .then((answers) => {
          if (answers.confirm) {
            makeTemplate(answers.type, answers.name, answers.directory);
            console.log(chalk.rgb(128, 128, 128)('터미널을 종료합니다.'));
          }
        });
    }
  })
  .parse(process.argv);
