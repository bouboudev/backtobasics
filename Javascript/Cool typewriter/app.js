const textDisplay = document.getElementById("text");
const phrases = [
  "Hello, c'est Bouzid 👋",
  "Je suis développeur Full Stack 😊 ",
  "Et je kiffe coder ! 🤖",
];
let i = 0;
let j = 0;
let currentPhrase = [];
let isDeleting = false;
let isEnd = false;
function loop() {
  isEnd = false;
  textDisplay.innerHTML = currentPhrase.join("");
  if (i < phrases.length) {
    //   ajouter la phrase
    if (!isDeleting && j <= phrases[i].length) {
      currentPhrase.push(phrases[i][j]);
      j++;
      textDisplay.innerHTML = currentPhrase.join("");
    }
    // Supprimer la phrase
    if (isDeleting && phrases[i].length) {
      currentPhrase.pop(phrases[i][j]);
      j--;
      textDisplay.innerHTML = currentPhrase.join("");
    }
    if (j == phrases[i].length) {
      isEnd = true;
      isDeleting = true;
    }
    // afficher la phrase suivante
    if (isDeleting && j === 0) {
      currentPhrase = [];
      isDeleting = false;
      i++;
    }
    // repeter la function du debut
    if (i == phrases.length) {
      i = 0;
    }
  }
  // gerer vitesse curseur
  const speedUp = Math.random() * (80 - 50) + 50;
  const normalSpeed = Math.random() * (300 - 200) + 200;
  const time = isEnd ? 2000 : isDeleting ? speedUp : normalSpeed;

  setTimeout(loop, time);
}

loop();
