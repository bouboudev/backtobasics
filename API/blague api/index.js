const header = document.getElementById("header");
const text = document.getElementById("content");
const pseu = document.getElementById("author");
const img = document.getElementById("img");

function getJoke() {
  fetch("https://api.blablagues.net/?rub=blagues")
    .then((res) => res.json())
    .then((data) => {
       const content = data.data.content; //pour une meilleur visibilité pas de data.data
       

      header.textContent = content.text_head;
      text.textContent =
        content.text !== "" ? content.text : content.text_hidden;
        pseu.textContent = data.data.author.pseudo;
        img.src = data.data.author.avatar;
        console.log(data.data.author.avatar);
    })
    
}


getJoke();
