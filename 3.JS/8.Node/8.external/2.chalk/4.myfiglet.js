// 아스키 아트를 내가 직접 만든다면??

// printAsciiArt('hello');

const asciiFont = {
  H: [
    ,
    '|_|',
    '| |',
  ],
  E: [
    ' _',
    '|_',
    '|_',
  ],
  L: [
    '| ',
    '| ',
    '|_',
  ],
  O: [
    
    ' _',
    '| |',
    '|_|',
  ]
}

function printAsciiArt(text) {
  const chars = text.toUpperCase().split('');

  for (let line = 0; line < 3; line++){
    let output = '';
    for (const ch of chars) {
      output += (asciiFont[ch] ? asciiFont[ch][line] : '  ') + ' ';
    }
    console.log(output);
  }
}

printAsciiArt('hello');