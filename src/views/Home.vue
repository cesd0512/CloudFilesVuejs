<template>
  <div class="home">
    <v-container class="grey lighten-5" >
      <h2>Página Principal</h2><br/>
      <Banner :title="title" :icon="icon"></Banner>
      <ListItems :items="projects"></ListItems>
    </v-container>
    <v-container class="grey lighten-5" >
      <Banner :title="'Recientes'" :icon="'mdi-file'"></Banner>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Banner from '@/components/Banner.vue'
import ListItems from '@/components/ListItems.vue'
import store from "../store";
import { mapActions } from "vuex";
import axios from "axios";

export default {
  name: 'Home',
  data() {
            return {
              icon: 'mdi-format-list-checks',
              title: 'Proyectos',
              // projects: [],
            }
  },
  components: {
    Banner,
    ListItems
  },
  computed: {
    // ...mapActions(["Projects"]),
    projects() {
      let projects = store.getters.projects;
      return projects;
    },
  },
  created () {},
  
  methods: {},

}
</script>


<style>
  .home {
    padding-top: 15px;
  }

</style>


