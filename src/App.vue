<template>
  <v-app style="background-color:#F6F8F9">
  <div v-if="session">
    <Dash app></Dash> 
  </div>
  <div style="margin-left:12%; margin-right:12%;" v-else>
  <v-row
      align="center"
      justify="center"
    >
      <v-img
        src="computacion-en-la-nube.png"
        max-height="100"
        max-width="50"
      ></v-img>
      <h1 class="font-title">Cloud4files</h1>
    </v-row>
      <v-divider height="120"></v-divider>
  </div>

  <!-- Sizes your content based upon application components -->
    <v-main style="background-color:#F6F8F9">

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
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@900&display=swap');
  .font-title {
    color: #2D353D; 
    padding: 10px;
    font-family: 'Roboto', sans-serif;
    font-size: 200%;
  }
</style>
