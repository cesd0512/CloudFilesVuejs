<template>
  <v-app style="background-color:#F6F8F9">
    <div v-if="session">
      <Dash app></Dash> 
    </div>
    <div style="margin-left:12%; margin-right:12%;" v-else>
      <Title app :title="'Cloud4Files'" :image="'logo.png'"></Title>
    </div>

    <v-main style="background-color:#F6F8F9">
      <v-container fluid>
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
import Title from './components/Title';
import Login from './views/Login';
import store from "./store";

export default {
  name: 'App',

  components: {
    Dash,
    Login,
    Title,
  },

  data: () => ({
    sessionAuthenticated: false,
  }),

  computed: {
    session () {
      this.sessionAuthenticated = store.getters.isAuthenticated;
      return this.sessionAuthenticated;
    },
      
  },
};
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@900&display=swap');
  @media screen and (max-width: 600px) {
    .hidden{
      display:none;
    }
  }
  
</style>
