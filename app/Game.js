import { Quote } from "./Quote.js";

class Game {
  currentStep = 0;
  lastStep = 7;
  quotes = [
    { text: "kudlaty durnowaty", category: "ziomek" },
    { text: "pablito guencito", category: "ziomek" },
    { text: "pitero bajero", category: "ziomek" },
  ];
  constructor({ lettersWrapper, categoryWrapper, wordWrapper, outputWrapper }) {
    this.lettersWrapper = lettersWrapper;
    this.categoryWrapper = categoryWrapper;
    this.wordWrapper = wordWrapper;
    this.outputWrapper = outputWrapper;

    const { text, category } =
      this.quotes[Math.floor(Math.random() * this.quotes.length)];
    this.categoryWrapper.innerHTML = category;
    this.quote = new Quote(text.toUpperCase());
  }
  guessLetter(letter, event ) {
    event.target.disabled = true
    if(this.quote.guessLetter(letter)){
      this.drawContent();
    }
    else{
      this.currentStep++
      document.getElementsByClassName('step')[this.currentStep].style.opacity = 1;
      if(this.currentStep === this.lastStep) {
        this.loosing();
      }
    }
  }
  drawLetters() {
    for (let i = 0; i < 26; i++) {
      const label = (10 + i).toString(36).toUpperCase();
      const button = document.createElement("button");
      button.innerHTML = label;
      button.addEventListener("click", (event) => this.guessLetter(label, event));
      this.lettersWrapper.appendChild(button);
    }
  }
  drawContent() {
    const content = this.quote.getContent();
    this.wordWrapper.innerHTML = content;
    if(!content.includes("_")){
      this.winning();
    }
  }
  winning(){
    this.wordWrapper.innerHTML = "GRATULACJE! WYGRYWASZ! KONIEC GRY!";
    this.lettersWrapper.innerHTML = "";
  }
  loosing(){
    this.wordWrapper.innerHTML = "NIESTETY PRZEGRYWASZ KONIEC GRY!";
    this.lettersWrapper.innerHTML = "";
  }
  start() {
    document.getElementsByClassName('step')[this.currentStep].style.opacity = 1;
    this.drawLetters();
    this.drawContent();
  }
}

const game = new Game({
  lettersWrapper: document.getElementById("letters"),
  categoryWrapper: document.getElementById("category"),
  wordWrapper: document.getElementById("word"),
  outputWrapper: document.getElementById("output"),
});
game.start();
