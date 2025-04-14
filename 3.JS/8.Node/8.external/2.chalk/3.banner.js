import chalk from 'chalk';
import figlet from 'figlet';

figlet('Hello Coding World!', (err, data) => {
  if (err) {
    console.log('에러:', err);
    return;
  }
  console.log(chalk.cyan(data));
  console.log();
  console.log(chalk.bgYellow.greenBright(data));
})