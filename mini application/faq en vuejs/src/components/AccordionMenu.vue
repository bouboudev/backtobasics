<template>
  <div>
    <h2 class="title">Foire aux questions sur le Web</h2>
    <div class="accordion-item">
      <h2 class="header">Qu'est-ce que le développement web ?</h2>
      <p class="answer">
        Le développement Web désigne de manière générale les tâches associées au
        développement de sites Web destinés à être hébergés via un intranet ou
        Internet. Le processus de développement web comprend, entre autres, la
        conception de sites web, le développement de contenu web, l’élaboration
        de scripts côté client ou côté serveur et la configuration de la
        sécurité du réseau. Le développement Web est le codage ou la
        programmation qui permet de faire fonctionner un site Web, selon les
        exigences du propriétaire. Il traite principalement de l’aspect
        non-conceptuel de la création de sites Web, qui comprend le codage et
        l’écriture du balisage. Le développement Web va de la création de pages
        en texte brut à des applications Web complexes, des applications de
        réseaux sociaux et des applications commerciales électroniques. Dans cet
        article, nous examinerons les types de développeurs web, et nous nous
        pencherons sur le débat entre conception web et développement web. Nous
        aborderons également certains des langages de programmation les plus
        populaires pour les développeurs web, notamment Python, JavaScript et
        HTML.
      </p>
    </div>
    <div class="accordion-item">
      <h2 class="header">Qu'est ce qu'une API ?</h2>
      <p class="answer">
        Une API est une interface de programmation qui permet de se « brancher »
        sur une application pour échanger des données. Une API est ouverte et
        proposée par le propriétaire du programme. Les API sont utilisées dans
        différents domaines du webmarketing ; Adword, Google Map…
      </p>
    </div>
    <div class="accordion-item">
      <h2 class="header">Qu'est ce qu'un Framework ?</h2>
      <p class="answer">
        Un framework est, comme son nom l’indique en anglais, un « cadre de
        travail ». L’objectif d’un framework est généralement de simplifier le
        travail des développeurs informatiques (les codeurs si vous préférez),
        en leur offrant une architecture « prête à l’emploi » et qui leur
        permette de ne pas repartir de zéro à chaque nouveau projet.
      </p>
    </div>
    <div class="accordion-item">
      <h2 class="header">Le responsive design c'est quoi ?</h2>
      <p class="answer">
        Un site responsive est un site web ayant un rendu optimal pour une
        accessibilité mobile soit sur PC, tablette, smartphone et autres
        terminaux.
      </p>
    </div>
    <div class="accordion-item">
      <h2 class="header">Qu'est ce que le SSL ?</h2>
      <p class="answer">
        Protocole utilisé par les boutiques en ligne permettant d’établir une
        connexion sécurisée sur Internet, afin d’empêcher toute tentative de
        fraude lors d’une transaction bancaire. La sécurisation se fait par un
        cryptage des données envoyées par le navigateur au serveur.
      </p>
    </div>
    <div class="accordion-item">
      <h2 class="header">L'hypertexte c'est quoi ?</h2>
      <p class="answer">
        Un concept de structuration de données permettant d’établir des liens
        entre divers éléments au sein d’un ensemble de documents. On peut ainsi
        directement accéder depuis un document aux documents connexes référencés
        par l’auteur en suivant les liens hypertexte. Ce concept, permis par le
        langage HTML et le protocole HTTP est à l’origine du succès du Web.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    // recuperer l'ensemble des questions
    const accordioHeaders = document.querySelectorAll(".header");

    // recuperer la question/accordéon au clique
    accordioHeaders.forEach((accordioHeader) => {
      accordioHeader.addEventListener("click", () => {
        if (accordioHeader.classList.contains("header-active")) {
          accordioHeader.nextElementSibling.style.maxHeight = `0px`;
        } else {
          // pour fermer automatiquer les autres questions
          accordioHeaders.forEach((item) => {
            item.nextElementSibling.style.maxHeight = "0px";
            item.classList.remove("header-active");
          });
        }
        // recuperer la reférence de la hauteur de la réponse afin d'avoir une height dynamique et non static
        const height = accordioHeader.nextElementSibling.scrollHeight;
        // ajouter ou supprimer la classe active
        accordioHeader.classList.toggle("header-active");

        if (accordioHeader.classList.contains("header-active")) {
          accordioHeader.nextElementSibling.style.maxHeight = `${height}px`;
        }
      });
    });
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Raleway", sans-serif;
}

body {
  background-color: #474787;
}

.title {
  text-align: center;
  color: #fff;
  margin-bottom: 32px;
  font-size: 50px;
}

.accordion {
  padding: 50px;
  max-width: 1200px;
  margin: 0 auto;
}

.accordion-item {
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  background-color: #fff;
}

.header {
  align-items: center;
  display: flex;
  cursor: pointer;
  color: #2c2c54;
}

.header::after {
  content: "+";
  font-size: 40px;
  margin-left: auto;
}

.header-active::after {
  content: "-";
}

.answer {
  transition: 1000ms ease max-height;
  /* astuce pour cacher les réponses */
  max-height: 0;
  overflow: hidden;
}
</style>
