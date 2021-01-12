<template>
  <v-app id="app">
    <Dash app></Dash> 

    <v-main style="background-color:#F6F8F9; ">
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer  
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

export default {
  name: 'App',

  components: {
    Dash,
  },

  data: () => ({
    langs: ['es', 'en']
  }),

  computed: {
      
  },
};
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@900&display=swap');
  @media screen and (max-width: 600px) {
    .hidden {
      display:none;
    }
    .extend {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .fixedContainer {
      position: fixed;
      width: 100%;
      z-index: 1;
      left: 75%;
      top: 20%
    }
    .lastLogin {
      display:none;
      
    }
  }
   @media screen and (min-width: 601px) {    
    .large {
      margin-left: 40px
    }
  }
  #app {
    font-family: 'Roboto', sans-serif;
    background-color:#F6F8F9;
  }

  .fixedColumn {
      position: fixed;
      width: 100%;
      z-index: 1;
      left: 75%;
      top: 20%
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
      /*display: flex;
      align-items: center;
      justify-content: center;*/
  }
  .main {
    align-self: center;
    margin-top: 3%;
    margin-left: 10%;
    margin-right: 10%
  }
  .home {
    padding-top: 15px;
  }
  
</style>
