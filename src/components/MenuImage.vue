<template>
  <v-container >
        <v-card style="padding:12px">
          <v-img 
            :src="image"
            class="white--text align-end"
            height="118px"
          >
          </v-img>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon title="Favorite">
              <v-icon :color="color" @click="activeButton()">{{iconFav}}</v-icon>
            </v-btn>
            <v-btn icon title="Download" @click="viewFile()">
              <v-icon  @click="">mdi-download</v-icon>
            </v-btn>


            <Menu :items="itemsMenu" @click="execAction"></Menu>

          </v-card-actions>
        </v-card>

  </v-container>
</template>


<script>
  import store from "../store";
  import axios from "axios";
  import Menu from '@/components/Menu.vue'

  export default {
    name: 'MenuImage',
    props: ['image', 'id', 'url'],

    data() {
        return {
          showMenu: false,
          fileView: null,
          iconFav: 'mdi-heart-outline',
          color: 'gray',
          itemsMenu: [
            {'title': 'Edit', 'icon': 'mdi-pencil', 'action': 'actionEdit'},
            {'title': 'Delete', 'icon': 'mdi-delete', 'action': 'actionDelete'},
            {'title': 'Info', 'icon': 'mdi-information', 'action': 'actionInfo'},
          ]
        }
    },

    components: {
      Menu
    },
    
    computed: {

    },

    watch: {

    },
    
    methods:{
      actionEdit(){
        console.log('Editar');

      },
      actionDelete(){
        console.log('Borrar');

      },
      actionInfo(){
        console.log('informacion');

      },
      execAction(action){
        var EjecutarFuncion='this.' + action + '()';
        eval(EjecutarFuncion);
      },

      async viewFile(){
        let access_token = store.getters.user.token;
        let url_request = 'files/' + this.id + '/';
        let res = await axios.get(url_request, {
          headers: {
            'Authorization': `token ${access_token}` 
            }
        });
        if (res.data) {
          let link = document.createElement('a');
          let file_download = "http://localhost:8000" + this.url;
          let y=parseInt(window.screen.height/8);
          let x=parseInt(window.screen.width/4);
          let confWindow = "width=1000, height=800, screenY=" + y + " screenX=" + x;
          window.open(file_download,  "File", confWindow);
          
        }
      },

      activeButton(){
        if (this.iconFav == 'mdi-heart'){
          this.iconFav = 'mdi-heart-outline';
          this.color = 'gray';
        }
        else if (this.iconFav == 'mdi-heart-outline'){
          this.iconFav = 'mdi-heart';
          this.color = 'secondary';
        }
      }
    }
  }
</script>

<style>
  

</style>
