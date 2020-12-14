<template>
  <div v-if="session">
    <MenuNavigation></MenuNavigation>   
  </div>
  <div style="margin-left:80px; margin-right:80px" v-else>
    <Translations></Translations>
    <Title :title="'Cloud4Files'" :image="'https://res.cloudinary.com/cloud4files/image/upload/v1605574424/logo_wqlydh.png'"></Title>
    <v-divider></v-divider>
  </div>

</template>

<script>
import MenuNavigation from './Menu/MenuNavigation';
import Title from './Title';
import store from "../store";
import Translations from "./Translations";

export default {
  name: 'Dash',


  data: () => ({
    sessionAuthenticated: false,
    //
  }),

  components: {
    Title,
    Translations,
    MenuNavigation
  },

  computed: {
    session () {
      this.sessionAuthenticated = store.getters.isAuthenticated;
      return this.sessionAuthenticated;
  },
  }
};
</script>