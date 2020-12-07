<template>
  <v-container >
    <v-menu
    offset-x
    v-model="showMenu"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-card style="padding:12px">
          <v-img 
            :src="image"
            class="white--text align-end"
            height="125px"
          >
          </v-img>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon title="Favorite">
              <v-icon :color="color" @click="activeButton()">{{iconFav}}</v-icon>
            </v-btn>
            <v-btn icon title="Download">
              <v-icon  @click="">mdi-download</v-icon>
            </v-btn>


            <v-btn icon title="Show Menu">
              <v-icon @click="showMenu = !showMenu">mdi-dots-vertical</v-icon>
            </v-btn>

          </v-card-actions>
        </v-card>
      </template>

      <v-list>
        <v-list-item
            @click=""
            link
            >
            <v-list-item-icon >
                <v-icon medium color="indigo">mdi-pencil</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>Edit</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-list-item
            @click=""
            link
            >
            <v-list-item-icon >
                <v-icon medium color="indigo">mdi-delete</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>Delete</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-list-item
            @click="viewFile()"
            link
            >
            <v-list-item-icon >
                <v-icon medium color="indigo">mdi-arrow-down-bold</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>Download</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>


    <!--<FilePreview :show="show" :file="fileView"></FilePreview>-->
  </v-container>
</template>


<script>
  import store from "../store";
  import axios from "axios";
  // import FilePreview from '@/components/FilePreview.vue';

  export default {
    name: 'MenuImage',
    props: ['image', 'id', 'url'],

    data() {
        return {
          showMenu: false,
          fileView: null,
          iconFav: 'mdi-heart-outline',
          color: 'gray'
        }
    },

    components: {
      // FilePreview,
    },
    
    computed: {

    },

    watch: {

    },
    
    methods:{

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
          let confWindow = "width=1000, height=800, screenY=" + y + " screenX=" + x + ", directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=0,resizable=0";
          window.open(file_download,  "File", confWindow);
          
          // calculamos la posicion x e y para centrar la ventana
  

          // this.fileView = file_download;
          // this.show = true;
        }

      },
      activeButton(){
        if (this.iconFav == 'mdi-heart'){
          this.iconFav = 'mdi-heart-outline';
          this.color = 'gray';
        }
        else if (this.iconFav == 'mdi-heart-outline'){
          this.iconFav = 'mdi-heart';
          this.color = 'indigo';
        }

      },
      show (e) {
        e.preventDefault()
        this.showMenu = false
        this.x = e.clientX
        this.y = e.clientY
        this.$nextTick(() => {
          this.showMenu = true
        })
      },


    }
  
  }
</script>

<style>
  

</style>
