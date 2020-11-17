<template>
  <v-app id="app">
    <div v-if="session">
      <Dash app></Dash> 
    </div>
    <div style="margin-left:12%; margin-right:12%;" v-else>
      <Translations></Translations>
      <Title :title="'Cloud4Files'" :image="'https://res.cloudinary.com/cloud4files/image/upload/v1605574424/logo_wqlydh.png'"></Title>
      <v-divider></v-divider>
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
import Translations from "./components/Translations";

export default {
  name: 'App',

  components: {
    Dash,
    Login,
    Title,
    Translations,
  },

  data: () => ({
    sessionAuthenticated: false,
    langs: ['es', 'en']
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
    .extend{
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  #app {
    font-family: 'Roboto', sans-serif;
    background-color:#F6F8F9;
  }

  .forgot-password-link {
      font-size: 16px;
      font-weight: normal;
      font-family: "AtlasGrotesk","Open Sans",sans-serif;
      text-align: left;
      -webkit-font-smoothing: antialiased;
      box-sizing: border-box;
      cursor: pointer;
      outline: none;
      color: #0061ff;
      text-decoration: none;
      text-decoration-style:dotted;
      display: block;
      margin-bottom: 4px;
      padding-top: 15px;
  }
  .main {
    align-self: center;
    margin-top: 3%;
    margin-left: 10%;
    margin-right: 10%
  }
  
</style>
