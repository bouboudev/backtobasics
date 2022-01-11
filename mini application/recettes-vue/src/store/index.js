import { createStore } from "vuex";

export default createStore({
  state: {
    recipes: [
      {
        slug: "Gratin Dauphinois",
        title: "Gratin Dauphinois",
        description: "La recette originelle du Gratin Dauphinois",
        ingredients: [
          "1kg de pomme de terre ",
          "2 gousses d'ail",
          "sel",
          "poivre",
          "muscade",
          "500ml lait entier",
          "500ml creme liquide",
        ],
        method: [
          "Préchauffez votre four à 170°C Pelez vos pommes de terre lavez-les puis essuyez-les Coupez-les en tranches très fines et régulières si possible à l aide d une mandoline Mettez les dans une casserole ajoutez le lait et la crème afin que le liquide recouvre tout juste les pommes de terre salez et ajoutez la noix de muscade Portez à ébullition baissez le feu et laissez mijoter pendant 10 minutes Frottez un plat à gratin avec la gousse d ail coupée en deux puis beurrez le plat Versez le contenu de la casserole dans le plat puis enfournez pour 45 minutes environ",
        ],
      },
      {
        slug: "Tagliatelles au saumon",
        title: "Tagliatelles au saumon",
        description: "La recette originelle des Tagliatelles au saumon",
        ingredients: [
          "500g de agliatelles ",
          "35cl de crème fraiche",
          "1 noix de beurre",
          "poivre",
          "muscade",
          "sel",
          "parmesan râpé",
          "1filet de saumon",
        ],
        method: [
          "Cuire les pâtes à l'eau bouillante salée selon le temps indiqué sur le paquet.",
          "Pendant ce temps, faire fondre le beurre dans une casserole et y ajouter la crème.",
          "Quand la crème est bien chaude, y plonger les dés de saumon, ils doivent cuire à la chaleur de la crème.",
          "Quand ils sont cuits (ils doivent se détacher), ajouter le sel, le poivre et la muscade moulue.",
          "Egoutter les pâtes, les disposer dans un grand plat ronde et napper de crème au saumon.",
          "Servir avec du parmesan.",
        ],
      },
    ],
  },
  mutations: {
    ADD_RECIPE (state, recipe) {
      state.recipes.push(recipe);
    },
  },
});
