<template>
  <v-app>
  <div v-if="session">
    <Dash app></Dash> 
  </div>
  <div v-else>
  </div>

  <!-- Sizes your content based upon application components -->
    <v-main>

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
  }),

  computed: {
    session () {
      this.sessionAuthenticated = store.getters.isAuthenticated;
      return this.sessionAuthenticated;
    }
      
  },
};
</script>
