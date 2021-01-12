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
              <v-icon :color="color" @click="activeButton()">{{iconFavorite}}</v-icon>
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
    props: ['image', 'id', 'url', 'favorite'],

    data() {
        return {
          showMenu: false,
          iconFav: 'mdi-heart-outline',
          color: 'gray',
          itemsMenu: [
            {'title': 'Edit', 'icon': 'mdi-pencil', 'action': 'actionEdit'},
            {'title': 'Delete', 'icon': 'mdi-delete', 'action': 'actionDelete'},
            {'title': 'Info', 'icon': 'mdi-information', 'action': 'actionInfo'},
          ],
          file: null
        }
    },

    components: {
      Menu
    },
    
    computed: {
      iconFavorite(){
        if (this.file != null){
          if (this.file.favorite){
            this.color = 'secondary';
            this.iconFav = 'mdi-heart';
          } else{
            this.iconFav = 'mdi-heart-outline';
            this.color = 'gray';
          }
        }
        else if (this.favorite) {
          this.iconFav = 'mdi-heart';
          this.color = 'secondary';
        }
        return this.iconFav;
      }

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
        if (this.url) {
          let link = document.createElement('a');
          let file_download = "http://localhost:8000" + this.url;
          let fullWidth = window.screen.width;
          let fullHeight = window.screen.height;
          let y=parseInt(fullHeight/8);
          let x=parseInt(fullWidth/4);
          let width = fullWidth * (1/2);
          if (fullWidth<600){
            width = fullWidth;
          }
          let height = fullHeight * (3/4);
          let confWindow = "width=" + width + ", height=" + height + ", screenY=" + y + " screenX=" + x;
          window.open(file_download,  "File", confWindow);
        }
      },

      async activeButton(){
        let access_token = store.getters.user.token;
        let fav = false;
        if (this.iconFav == 'mdi-heart-outline'){
          fav = true;
        }
        let url_request = 'files/favorites/' + this.id + '/';
        let res = await axios.put(url_request, {
            'favorite': fav
          }, {
            headers: {
              'Authorization': `token ${access_token}` 
            }
        });
        this.file = res.data;
        console.log(res.data);
      }
    }
  }
</script>

<style>
  

</style>
