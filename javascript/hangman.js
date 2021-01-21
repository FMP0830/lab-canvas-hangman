class Hangman {
  constructor(words) {
    this.words = words;
    this.secretword = String(
      this.words[Math.floor(Math.random() * this.words.length)]
    );
    this.letters = [];
    this.guessedLetters = '';
    this.errorsLeft = 10;
  }

  pickWord() {
    let word = this.words[Math.floor(Math.random() * this.words.length)];
    return String(word);
  }

  checkIfLetter(keyCode) {
    if (keyCode >= 65 && keyCode <= 90) {
      console.log('keyCode', keyCode, true);
      return true;
    } else {
      console.log('keyCode', keyCode, false);
      return false;
    }
  }

  checkClickedLetters(letter) {
    if (this.letters.includes(letter)) {
      return false;
    } else {
      return true;
    }
  }

  addCorrectLetter(letter) {
    if (this.secretword.includes(letter)) {
      this.guessedLetters += letter;
    } else {
      this.addWrongLetter(letter);
    }
  }

  addWrongLetter(letter) {
    this.errorsLeft--;
    hangmanCanvas.drawLines(this.errorsLeft);
    this.letters.push(letter);
  }

  checkGameOver() {
    if (this.errorsLeft > 0) {
      return false;
    } else {
      return true;
    }
  }

  checkWinner() {
    if (this.guessedLetters.length === this.secretword.length) {
      return true;
    } else {
      return false;
    }
  }
}

let hangman;

const startGameButton = document.getElementById('start-game-button');

if (startGameButton) {
  startGameButton.addEventListener('click', (event) => {
    hangman = new Hangman([
      'node',
      'javascript',
      'react',
      'miami',
      'paris',
      'amsterdam',
      'lisboa',
    ]);

    hangman.secretWord = hangman.pickWord();
    hangmanCanvas = new HangmanCanvas(hangman.secretWord);

    hangmanCanvas.createBoard();
  });
}

document.addEventListener('keydown', (event) => {
  if (hangman.checkIfLetter(event.keyCode)) {
    hangman.addCorrectLetter(event.key);
    if(hangman.checkWinner()) {
      hangmanCanvas.winner()
    }
    if(hangman.checkGameOver()) {
      hangmanCanvas.gameOver()
    }
    console.log(event.key);
    console.log(hangman.letters);
    console.log(hangman.guessedLetters);
    console.log('Errors left ' + hangman.errorsLeft);
  } else {
    console.log('invalid letter');
  }
});

//const Game = new Hangman(['hello', 'world', 'foo', 'bar']);
