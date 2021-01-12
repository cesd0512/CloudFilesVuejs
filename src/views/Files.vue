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
          label="Search Files "
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
        <div class="large">
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
      <v-breadcrumbs v-if="linksMenu"
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
        
        <MenuImage 
        :image="getImgUrl(n.extension)" 
        :favorite="n.favorite" 
        :id="n.id" 
        :url="n.media_url" 
        :style="{'width': '169px'}">
        </MenuImage>
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
      class="mb-12"
      align="center"
      justify="center"
      onresize="myFunction()"
    >
      <v-btn 
      color="white" 
      fab
      x-small
      @click="pagPrev()"
      :disabled="prev"
      >
        <v-icon>mdi-chevron-double-left</v-icon>
      </v-btn>

      <v-pagination
        v-model="page"
        :length="length"
        :total-visible="pagesVisible"
        color='secondary'
        circle
        @input="loadPagination()"
      ></v-pagination>
      
      <v-btn 
      color="white" 
      fab
      x-small
      @click="pagNext()"
      :disabled="next"
      >
        <v-icon>mdi-chevron-double-right</v-icon>
      </v-btn>
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
          links: [],
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
          indPage: 0,
          pagevb: 7
          // rawHtml: 'ModalForm'

        }
    },

    components: {
      MenuImage,
      ModalForm
    },

    created() {
      window.addEventListener("resize", this.displayWindowSize);
    },
    destroyed() {
      window.removeEventListener("resize", this.displayWindowSize);
    },

    methods: {
      ...mapActions(["addFiles", "setFiles"]),

      displayWindowSize(){
        if (screen.width <= 600) {
          this.pagevb = 4;
        } else if(screen.width <=900){
          this.pagevb = 5;
        } else {
          this.pagevb = 7;
        }
      },

      getImgUrl (ext) {
        let image = getImgUrl(ext);
        return image;
      },

      async pagPrev(){
        this.page  = 1;
        this.loadPagination();
      },

      async pagNext(){
        this.page  = this.length;
        this.loadPagination();
      },

      async updatePagBtns(ind){
        this.pagBtns[this.indPage].color = 'white';
        this.pagBtns[ind].color = 'secondary';
        this.indPage = ind;
        this.page = this.pagBtns[ind].value;
        await this.loadPagination();
      },

      async loadPagination(){

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
          this.links = [{
                text: 'Projects',
                disabled: false,
                to: '/',
          }]
            this.links.push(
              {
                text: project.toString(),
                disabled: true,
                to: '/files',
              }
            );
          if (this.page) {
            this.links.push(
              {
                text: this.page.toString(),
                disabled: true,
                to: '/files',
              }
            );
          }
        }
        return this.links;
      },

      qtyPages(){
        let qtyBtns = this.pagBtns.length;
        let qtyPages = this.length - qtyBtns;
        let n = qtyBtns;

        for (let i=1; i <= qtyPages; i++){
          n += 1;
          this.pagBtns.push({
            'value': n, 'color': 'white'
            });
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
      },

      pagesVisible(){
        if (screen.width <= 600) {
          this.pagevb = 4;
        } else if(screen.width <=900){
          this.pagevb = 5;
        } else {
          this.pagevb = 7;
        }
        return this.pagevb;
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

