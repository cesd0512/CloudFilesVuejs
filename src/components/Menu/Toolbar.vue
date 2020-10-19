<template>
  <v-sheet height="100%"> 
    <v-card 
    flat
    height="auto"
    tile >
      <v-toolbar class='indigo'>
        <v-app-bar-nav-icon @click="drawerMenu = !drawerMenu"></v-app-bar-nav-icon>

        <v-toolbar-title style='color: white'>Cloud4Files</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>
    <MenuNavigation :drawer = "drawerMenu"></MenuNavigation>
  </v-sheet>
</template>

<script>
import MenuNavigation from './MenuNavigation';
export default {
  name: 'Toolbar',
  
  components: {
    MenuNavigation,
  },
  
  data() {
    return {
      drawerMenu: false
    }
  },
  
  computed: {
    
  },
  
  methods:{

  }
  
}
</script>
