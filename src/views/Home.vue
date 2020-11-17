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

export default {
  name: 'Home',
  data() {
            return {
              icon: 'mdi-format-list-checks',
              title: 'Proyectos',
              folders: [
                {
                  id: 1,
                  subtitle: 'Jan 9, 2014',
                  title: 'Photos',
                  files: [
                  ],
                },
                {
                  id: 2,
                  subtitle: 'Jan 17, 2014',
                  title: 'Recipes',
                  files: [
                  ],
                },
                {
                  id: 3,
                  subtitle: 'Jan 28, 2014',
                  title: 'Work',
                  files: [
                  ],
                },
              ],
            }
  },
  components: {
    Banner,
    ListItems
  },
  computed: {
    ...mapActions(["Projects"]),
    projects() {
      let projects = store.getters.projects;
      return projects;
    },
  },
}
</script>


<style>
  .home {
    padding-top: 15px;
  }

</style>


