<template>
  <div class="container">
    <AccordionMenu />
  </div>
</template>

<script>
import AccordionMenu from "../components/AccordionMenu";
export default {
  name: "home",
  components: {
    AccordionMenu,
  },
};
</script>

<style>
.container {
  max-width: 1140px;
  margin: 0 auto;
  padding: 30px 20px;
}
</style>
