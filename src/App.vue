<template>
  <v-app style="background-color: white">
  <div v-if="session">
    <Dash app></Dash> 
  </div>
  <div v-else>
  </div>

  <!-- Sizes your content based upon application components -->
    <v-main style=" margin-left: 10%; margin-right: 10%" >

      <!-- Provides the application the proper gutter -->
      <v-container fluid>

        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app
        class="font-weight-medium indigo " dark app
      >
        <v-col
          class="text-center"
          cols="12"
        >
          {{ new Date().getFullYear() }} — <strong>Unidades Tecnológicas de Santander</strong>
        </v-col>
      </v-footer>
  </v-app>
</template>


<script>

import Dash from './components/Dash';
import Login from './views/Login';
import store from "./store";

export default {
  name: 'App',

  components: {
    Dash,
    Login,
  },

  data: () => ({
    sessionAuthenticated: false,
    class_main: "color-fond",
  }),

  computed: {
    session () {
      this.sessionAuthenticated = store.getters.isAuthenticated;
      // if (!this.sessionAuthenticated ){
      //   this.class_main = "image-fond";
      // }
      return this.sessionAuthenticated;
    },
      
  },
};
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Merienda&display=swap');
</style>
