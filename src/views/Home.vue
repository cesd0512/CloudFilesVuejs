<template>
      <v-container class="grey lighten-5" >
        <h5 class="lastLogin" style="height:5px; float: right; color:#B0B4B4">Last Login: {{lastLogin}}</h5>
        <h2>Página Principal</h2><br/>
        <v-container class="grey lighten-5" >
          <v-divider></v-divider>

          <v-item-group mandatory>
            <v-container >
              <v-row class="justify-center">
                <v-col
                cols="12"
                md="6"
                xl="6"
                >
                  <v-card
                    class="mx-auto text-center"
                    color="white"
                    max-width="600"
                  >
                    <v-card-text >
                      <v-sheet color="primary">
                        <v-sparkline
                          :value="value"
                          color="rgba(255, 255, 255, .7)"
                          height="100"
                          padding="24"
                          stroke-linecap="round"
                          smooth
                          auto-draw
                        >
                          <template v-slot:label="item">
                            ${{ item.value }}
                          </template>
                        </v-sparkline>
                      </v-sheet>
                    </v-card-text>

                    <v-card-text>
                      <div class="display-1 font-weight-thin">
                        Downloads Last months
                      </div>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions class="justify-center">
                      <v-btn
                        block
                        text
                      >
                        print Report
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
                <v-col
                cols="6"
                >
                  <v-row >
                    <v-col
                      v-for="n, i in indicators"
                      :key="i"
                      cols="12"
                      md="4"
                    >
                      <v-card
                      class="mx-auto center"
                      min-width="180"
                      >
                        <v-card-text>
                          <h2 class="center" style="color: #2E86C1">
                            {{Object.keys(n)[0]}}
                          </h2>
                          <br>
                          <div class="center" style="#999999">
                            {{Object.values(n)[0]}}
                          </div>
                        </v-card-text>

                      </v-card>

                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </v-item-group>

          
          <Banner :title="'Ultimas Descargas'" :icon="'mdi-cloud-download'"></Banner>
          <v-row>
            <v-col
            v-for="n in recentFiles"
            :key="n.id"
            cols="6"
            md="3"
            xl="2"
            >
              <MenuImage 
              :image="getImgUrl(n.extension)" 
              :favorite="n.favorite" 
              :id="n.id" 
              :url="n.media_url" 
              :style="{'width': '159px'}">
              </MenuImage>
              <v-card-text>
                <v-row
                align="center"
                justify="center"
                >
                  <b>{{getFileName(n.name)}}</b>
                </v-row>
              </v-card-text>
            </v-col>
          </v-row>
          
          <!--
          <Banner :title="'Projectos Recientes'" :icon="'mdi-format-list-checks'"></Banner>
          <br>
          <v-row no-gutters>
            <v-col
              cols="12"
              sm="6"
              md="12"
            >
              <ListItems 
              :items="recentProjects" 
              :scroller="true" 
              @click="selectedItem">
              </ListItems>
            </v-col>
          </v-row>-->
        </v-container>
      </v-container>
</template>

<script>
// @ is an alias to /src
import Banner from '@/components/Banner.vue';
import ListItems from '@/components/ListItems.vue';
import ModalForm from '@/components/ModalForm.vue';
import MenuImage from '@/components/MenuImage.vue';
import store from "../store";
import { mapActions } from "vuex";
import axios from "axios";
import { setFiles, pagination, getImgUrl, getFileName } from '../functions';

export default {
  name: 'Home',
  data() {
    return {
      icon: 'mdi-briefcase',
      title: 'Proyectos',
      fields: [
        {'type': 'text', 'label': 'Nombre', 'model': 'name',
        'placeholder': null, 'size': null
        },
        {'type': 'textarea', 'label': 'Descripción', 'model': 'description',
        'placeholder': null, 'size': null
        }
      ],
      form: {'name': '', 'description': ''},
      folders: [
        {
          subtitle: 'Jan 9, 2014',
          title: 'Photos',
        },
        {
          subtitle: 'Jan 17, 2014',
          title: 'Recipes',
        },
        {
          subtitle: 'Jan 28, 2014',
          title: 'Work',
        },
      ],
      totalDownloads: 0,
      indicators: [{Downloads: 0},{Files: 0}, {Projects: 0}],
      totalFiles: 0,
      value: [
        5,
        446,
        10,
        10,
        590,
        610,
        760,
      ],
    }
  },

  components: {
    Banner,
    ListItems,
    ModalForm,
    MenuImage
  },

  computed: {
    projects() {
      let projects = store.getters.projects;
      return projects;
    },

    recentProjects(){
      let projects = store.getters.recentProjects;
      console.log(projects);
      return projects;
    },

    recentFiles(){
      let files = store.getters.recentFiles;
      console.log(files);
      return files;
    },

    lastLogin(){
      let lastLogin = 'LastLogin';
      if (store.getters.user){
        lastLogin = store.getters.user.last_login;
        lastLogin = lastLogin.split('T')[0] + ' ' + lastLogin.split('T')[1].split('.')[0]
        return lastLogin;
      }
    }

  },
  
  methods: {
    ...mapActions(["addProject", "setFiles"]),

    getImgUrl (ext) {
        return getImgUrl(ext);
    },

    getFileName(name){
      return getFileName(name);
    },

    async selectedItem(item) {
      var token = store.getters.token;
      var object = {'token': token, 'projectId': item.id, 'pagination': pagination};
      await this.setFiles(object);
      let res = await axios.post("recent/projects/", {'project': item.id}, {
        headers: {
            'Authorization': `token ${token}` 
          }
      });
      console.log(res.data);
      this.$router.push("/files/?project="+item.id+'&n='+item.name);
    },

    async saveProject(){
      var token = store.state.auth.user.token;
      var object = {'token': token, 'form': this.form}
      var res = this.addProject(object);
      
      if (res.data){
        this.form.name = '';
        this.form.description = '';
      }
    },

    execAction(action){
      var EjecutarFuncion='this.' + action + '()';
      eval(EjecutarFuncion);
    }
  }
}
</script>


<style>
  .v-sheet--offset {
    top: -24px;
    position: relative;
  }
</style>


