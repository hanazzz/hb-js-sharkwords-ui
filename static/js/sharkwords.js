const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

const WORDS = [
  'strawberry',
  'orange',
  'apple',
  'banana',
  'pineapple',
  'kiwi',
  'peach',
  'pecan',
  'eggplant',
  'durian',
  'peanut',
  'chocolate',
];

let numWrong = 0;
let numRight = 0;

// Loop over the chars in `word` and create divs.
// The divs should be appended to the section with id="word-container".
const createDivsForChars = (word) => {
  for (const char of word) {
    const divElement = `<div class="letter-box ${char}"></div>`;
    document.querySelector('#word-container').insertAdjacentHTML('beforeend', divElement);
  }
};

// Loop over each letter in the alphabet and generate a button for each letter
// The buttons should be appended to the section with id="letter-buttons"
const generateLetterButtons = () => {
  for (const letter of ALPHABET) {
    const letterButton = `<button class="letter-button">${letter}</button>`;
    document.querySelector('#letter-buttons').insertAdjacentHTML('beforeend', letterButton);
  }
};

// Set the `disabled` property of `buttonEl` to `true.
//
// `buttonEl` is an `HTMLElement` object.
//
const disableLetterButton = (buttonEl) => {
  // const disabledButton = document.querySelector(buttonEl);
  buttonEl.setAttribute('disabled', 'true');
};

// This is a helper function we will use in the future
// It should return `true` if `letter` is in the word
// For now, you should test it out to make sure it works

const isLetterInWord = (letter) => {
  if (document.querySelector(`.${letter}`)) {
    return true;
  }
};

const handleCorrectGuess = (letter) => {
  // get array of elements with matching letter class
  const letterDivs = document.querySelectorAll(`.${letter}`)

  for (const letterDiv of letterDivs) {
    // letterDiv.insertAdjacentHTML("afterbegin", `${letter}`);
    letterDiv.insertAdjacentText("afterbegin", `${letter}`);
    numRight += 1;
  }

};

const handleWrongGuess = () => {
  numWrong += 1;
  
  const photo = document.querySelector('img');
  photo.setAttribute('src', `/static/images/guess${numWrong}.png`);
  
  if (numWrong === 5) {
    const allLetterButtons = document.querySelectorAll('.letter-button');
    for (const button of allLetterButtons) {
      disableLetterButton(button);
    }
    document.querySelector('#play-again').style.display = '';
  }
};

//  Reset game state. Called before restarting the game.
const resetGame = () => {
  window.location = '/sharkwords';
};


// Called when `letter` is not in word.
//
// Increment `numWrong` and update the shark image.
// If the shark gets the person (5 wrong guesses), disable
// all buttons and show the "play again" message.

// This is like if __name__ == '__main__' in Python
// It will be called when the file is run (because
// we call the function on line 66)
(function startGame() {
  // For now, we'll hardcode the word that the user has to guess
  // You can change this to choose a random word from WORDS once you
  // finish this lab but we hard code it so we know what the word is
  // and can tell if things look correct for this word
  const word = 'hello';

  // call the function that makes an empty line for each letter in the word
  createDivsForChars(word);

  // call the function that makes a button for each letter in the alphabet
  generateLetterButtons();

  // in the next lab, you will be adding functionality to handle when
  // someone clicks on a letter

  const allLetterButtons = document.querySelectorAll('.letter-button')

  for (const button of allLetterButtons) {
    button.addEventListener('click', (evt) => {
      const letter = button.innerHTML;
  
      const targetBtn = evt.target;
  
      disableLetterButton(targetBtn);
  
      if (isLetterInWord(letter)) {
        handleCorrectGuess(letter);
      } else {
        handleWrongGuess();
      }

      if (word.length === numRight) {
        alert('You won!!');
        document.querySelector('#play-again').style.display = '';
      }
  
    });
  }

  

  // reset game when secret play again link is clicked
  const secretLink = document.querySelector('#play-again');

  secretLink.addEventListener('click', resetGame);
  

})();
