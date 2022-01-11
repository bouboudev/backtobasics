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
    ],
  },
  mutations: {
    ADD_RECIPE(state, recipe) {
      state.recipes.push(recipe);
    },
  },
});
