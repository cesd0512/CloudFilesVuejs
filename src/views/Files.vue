<template>
    <v-container class="white lighten-5 ">
    <!--<component :is="rawHtml" />-->
      <v-row>
        <v-col 
        cols="12"
        md="10"
        >
          <v-text-field
            append-icon="mdi-magnify"
            v-model="search"
            label="Search Files In Project"
            color="indigo"
            outlined
            clearable
            clear-icon="mdi-close-circle-outline"
            @click:append="loadPagination()"
            @click:clear="loadPagination(close=true)"
            @keyup.enter="loadPagination()"
          ></v-text-field>
        </v-col>
        <v-col
          cols="6"
          md="2"
          class="fixedContainer"
        >
          <div style="margin-left: 40px">
              <ModalForm 
              :titleButton="'Upload File'" 
              :iconButton="'mdi-upload'" 
              :title="'Upload File'" 
              :color="'secondary'" 
              :iconBar="'mdi-cloud-upload'"
              :okMessage="'File Uploaded successfull'"
              :errorMensaje="'Error'"
              :nomButton= "'Upload'"
              :fields="fields"
              :form="form"
              :action="'uploadFiles'"
              @click="execAction"
              ></ModalForm>
          </div>
        </v-col>
        <v-breadcrumbs
          :items="linksMenu"
          large
        >
        </v-breadcrumbs>
      </v-row>

      <v-row
        class="mb-12"
      >
        <v-col
          v-for="n in files"
          :key="n.id"
          cols="6"
          md="3"
          xl="6"
          align="center"
          justify="center"
        >
          
          <MenuImage :image="getImgUrl(n.extension)" :id="n.id" :url="n.media_url" :style="{'width': '169px'}"></MenuImage>
          <v-card-text>
            <v-row
              align="center"
              justify="center"
            >
              <b >{{getFileName(n.name)}}</b>
            </v-row>
          </v-card-text>
        </v-col>
      </v-row>
      <v-row
      align="center"
      justify="center"
      >
        <v-card
          flat
          class="py-12"
        >
          <v-card-text>
            <v-row
            align="center"
            justify="center"
            >
              <v-col
              style="padding:5px"
              >
                <v-btn 
                color="white" 
                fab
                small
                @click="pagPrev()"
                :disabled="prev"
                >
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
              </v-col>
              <v-col
                v-for="(b, i) in qtyPages"
                style="padding:5px"
              >
                <v-btn 
                :color="b.color" 
                fab
                small
                @click="updatePagBtns(i)"
                >
                  {{b.value}}
                </v-btn>

              </v-col>
              <v-col
              style="padding:5px"
              >
                <v-btn 
                  color="white" 
                  fab
                  small
                  @click="pagNext()"
                  :disabled="next"
                  >
                    <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-row>
      <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>

    </v-container>
</template>

<script>
import MenuImage from '@/components/MenuImage.vue';
import ModalForm from '@/components/ModalForm.vue';
import store from "../store";
import { mapActions } from "vuex";
import axios from "axios";
import { getImgUrl, pagination } from '../functions';

export default {
  name: 'Files',
    data() {
        return {
          links: [
            {
              text: 'Projects',
              disabled: false,
              to: '/',
            }
          ],
          files: store.getters.files,
          length: store.getters.lengthPages,
          page: 1,
          nextPage: 1,
          search: null,
          caseSensitive: false,
          close: false,
          fields: [
            {'type': 'file', 'label': 'Subir Archivo', 'model': 'file', 'placeholder': 'Upload File', 'size': 1000},
            ],
          form: {'file': ''},
          overlay: false,
          pagBtns: [{'value': 1, 'color': 'secondary'}],
          indPage: 0
          // rawHtml: 'ModalForm'

        }
    },

    components: {
      MenuImage,
      ModalForm
    },

    methods: {
      ...mapActions(["addFiles", "setFiles"]),

      getImgUrl (ext) {
        let image = getImgUrl(ext);
        return image;
      },

      async pagPrev(){
        var page = this.indPage - 1;
        await this.updatePagBtns(page);
      },

      async pagNext(){
        var page = this.indPage + 1;
        await this.updatePagBtns(page);
      },

      async updatePagBtns(ind){
        this.pagBtns[this.indPage].color = 'white';
        this.pagBtns[ind].color = 'secondary';
        this.indPage = ind;
        this.page = this.indPage + 1;
        await this.loadPagination();

      },

      async loadPagination () {

        let currentUrl = window.location.href;
        let url_ = new URL(currentUrl);
        if (url_.searchParams.get("project")){
          let project = url_.searchParams.get("project");
          let access_token = store.getters.user.token;
          let url = "files-project/?page=" + this.page;
          let objRequest = {
              "project": project,
              "pagination": pagination,
              "search": ''
          }
          if (this.search){
            objRequest.search = this.search;
          }
          if (this.close){
            this.search = '';
            this.close = false;
            objRequest.search = '';
          }
          let res = await axios.post(url, objRequest, {
            headers: {
              'Authorization': `token ${access_token}` 
            }
          });
          if (res.data) {
            this.files = res.data.results;
          }
        }
      },

      getFileName(name){
        if (name.length > 15){
          name = name.substr(0, 18) + '...'
        }
        return name;
      },

      execAction(action){
        var EjecutarFuncion='this.' + action + '()';
        eval(EjecutarFuncion);
      },

      async uploadFiles(){
        console.time('uploadFiles')

        this.overlay = true;
        var files = store.state.inputFiles;
        let currentUrl = window.location.href;
        let url_ = new URL(currentUrl);
        let projectId = url_.searchParams.get("project");
        let nameProject = url_.searchParams.get("n");
        let token = store.getters.token;
        var object = {'files': files, 'token': token, 'projectId': projectId};
        await this.addFiles(object);
        object = {'token': token, 'projectId': projectId, 'pagination': pagination};
        await this.setFiles(object);

        this.files = store.getters.files;
        this.length = store.getters.lengthPages;
        
        console.timeEnd('uploadFiles')
      }

    },

    computed: {
      linksMenu() {
        let currentUrl = window.location.href;
        let url_ = new URL(currentUrl);
        let project = url_.searchParams.get("n");
        if (project) {
          this.links.push(
            {
              text: project.toString(),
              disabled: true,
              to: '/files',
            }
          );

        }
        return this.links;
      },

      qtyPages(){
        var qtyPags = this.length - this.pagBtns.length;
        for (let i=1; i <= qtyPags; i++){
          this.pagBtns.push({'value': Number(i)+1, 'color': 'white'});
        }
        return this.pagBtns;
      },

      next(){
        if (this.page == this.length){
          return true;
        }
        return false;
      },

      prev(){
        if (this.page == 1){
          return true;
        }
        return false;

      }

    },

    watch: {
      overlay (val) {
        val && setTimeout(() => {
          this.overlay = false;
          // location.reload(); 
        }, 3000)
      },
    }
    
  }
</script>

<style></style>

