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
        class="mb-12"
        align="center"
        justify="center"
        @click="loadPagination()"
      >
        <v-pagination
          v-model="page"
          :length="length"
          circle
          color='secondary'
        ></v-pagination>
      </v-row>


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
          search: null,
          caseSensitive: false,
          close: false,
          fields: [
            {'type': 'file', 'label': 'Subir Archivo', 'model': 'file', 'placeholder': 'Upload File', 'size': 1000},
            ],
          form: {'file': ''}
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

      async loadPagination () {
        let currentUrl = window.location.href;
        let url_ = new URL(currentUrl);
        if (url_.searchParams.get("project")){
          let project = url_.searchParams.get("project");
          let access_token = store.getters.user.token;
          let url = "files-project/?page=" + this.page;
          let objRequest = {
              "project": project,
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
      }
    },
  }
</script>

<style></style>

