const game = () => {
  let pScore = 0;
  let cScore = 0;

  //   lancer le jeu
  const startGame = () => {
    const playBtn = document.querySelector(".intro button");
    const introScreen = document.querySelector(".intro");
    const match = document.querySelector(".match");

    playBtn.addEventListener("click", () => {
      introScreen.classList.add("fadeOut");
      match.classList.add("fadeIn");
    });
  };

  // duel
  const playMatch = () => {
    const options = document.querySelectorAll(".options button");
    const playerHand = document.querySelector(".player-hand");
    const computerHand = document.querySelector(".computer-hand");
    const hands = document.querySelectorAll(".hands img");

    // recommencer l'animation à chaque partie
    hands.forEach((hand) => {
      hand.addEventListener("animationend", function () {
        this.style.animation = "";
      });
    });

    // choix de l'ordinateur
    const computerOptions = ["Pierre", "Feuille", "Ciseau"];

    // recuperer le choix du joueur
    options.forEach((option) => {
      option.addEventListener("click", function () {
        // choix de l'ordinateur
        const computerNumber = Math.floor(Math.random() * 3);
        const computerChoice = computerOptions[computerNumber];

        setTimeout(() => {
          // comparer les choix et remplacer le text par la réponse
          compareHands(this.textContent, computerChoice);

          //mise à jour des images
          playerHand.src = `./assets/${this.textContent}.png`;
          computerHand.src = `./assets/${computerChoice}.png`;
        }, 2000);
        //Animation
        playerHand.style.animation = "shakePlayer 2s ease";
        computerHand.style.animation = "shakeComputer 2s ease";
      });
    });
  };

  //   mise à jour du score
  const updateScore = () => {
    const playerScore = document.querySelector(".player-score p");
    const computerScore = document.querySelector(".computer-score p");
    playerScore.textContent = pScore;
    computerScore.textContent = cScore;
  };

  // comparaison joueur ordinateur
  const compareHands = (playerChoice, computerChoice) => {
    //mise à jour text
    const winner = document.querySelector(".winner");
    //égalité
    if (playerChoice === computerChoice) {
      winner.textContent = "C'est une égalité";
      return;
    }

    //pierre
    if (playerChoice === "Pierre") {
      if (computerChoice === "Ciseau") {
        winner.textContent = "Le joueur gagne";
        pScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "L'ordinateur gagne";
        cScore++;
        updateScore();
        return;
      }
    }
    //feuille
    if (playerChoice === "Feuille") {
      if (computerChoice === "Ciseau") {
        winner.textContent = "L'ordinateur gagne";
        cScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "Le joueur gagne";
        pScore++;
        updateScore();
        return;
      }
    }
    //ciseau
    if (playerChoice === "Ciseau") {
      if (computerChoice === "Pierre") {
        winner.textContent = "L'ordinateur gagne";
        cScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "Le joueur gagne";
        pScore++;
        updateScore();
        return;
      }
    }
  };
  startGame();
  playMatch();
};
//   lancer la fonction du jeu
game();
