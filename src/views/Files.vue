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
              :okMessage="'Proyecto creado existosamente'"
              :errorMensaje="'Error'"
              :fields="fields"
              :form="form"
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
import axios from "axios";

export default {
  name: 'Files',
    data() {
        return {
          pdf: 'https://res.cloudinary.com/cloud4files/image/upload/v1606182071/iconos%20reducidos/pdf_opt_p5fh0g.png',
          word: 'https://res.cloudinary.com/cloud4files/image/upload/v1606182071/iconos%20reducidos/word_opt_dlfjsr.png',
          other: 'https://res.cloudinary.com/cloud4files/image/upload/v1606182071/iconos%20reducidos/other_opt_blxamk.png',
          image: 'https://res.cloudinary.com/cloud4files/image/upload/v1606182071/iconos%20reducidos/image_opt_ejbolh.png',
          excel: 'https://res.cloudinary.com/cloud4files/image/upload/v1606182071/iconos%20reducidos/excel_opt_kmuzhr.png',
          powerPoint: 'https://res.cloudinary.com/cloud4files/image/upload/v1606182071/iconos%20reducidos/powerPoint_opt_ckbzoc.png',
          compressed: 'https://res.cloudinary.com/cloud4files/image/upload/v1607301993/zip_tu1ki8.png',
          video: 'https://res.cloudinary.com/cloud4files/image/upload/v1607455867/video_s7p213.png',
          audio: 'https://res.cloudinary.com/cloud4files/image/upload/v1607459187/audio-file_xsze45.png',
          links: [
            {
              text: 'Projects',
              disabled: false,
              to: '/',
            }
          ],
          files: this.$store.state.files,
          length: this.$store.state.lengthPages,
          page: 1,
          search: null,
          caseSensitive: false,
          close: false,
          fields: [
            {'type': 'file', 'label': 'Subir Archivo', 'model': 'file', 'placeholder': 'archivo', 'size': 1000},
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
      getImgUrl (ext) {
        let icon = this.other;
        if (['png', 'jpg', 'jpeg', 'gif', 'bmp', 'psd', 'ai', 'cdr', 'dwg',
          'svg', 'raw', 'net'].includes(ext)) {
          icon = this.image;
        } else if (['pdf'].includes(ext)){
          icon = this.pdf;
        } else if (['doc', 'docx', 'dotm', 'dotx', 'docm'].includes(ext)){
          icon = this.word;
        } else if (['xlsx', 'xls', 'xlsm', 'xlsb', 'xltx'].includes(ext)){
          icon = this.excel;
        } else if (['rar', 'zip'].includes(ext)){
          icon = this.compressed;
        } else if (['pptx', 'pptm', 'ppt', 'pdf'].includes(ext)){
          icon = this.powerPoint;
        } else if (['mp4', 'MKV', 'asf', 'QT', 'QTL', 'avi', 'mov', 'MPEG',
          'MPG', 'WebM', 'FLV ', 'SWF', 'wmv', 'asf', 'VOB', 'DVD', 'rpm'].includes(ext)){
          icon = this.video;
        } else if (['mp3', 'mid ', 'midi', 'wav', 'wma', 'cda', 'ogg',
          'ogm', 'aac', 'ac3', 'flac', 'aym'].includes(ext)){
          icon = this.audio;
        }
        return icon;
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
              "pagination": 8,
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

