<template>
  <div style="padding: 15px;">
    <v-container class="grey lighten-5 ">
      <v-breadcrumbs class=""
        :items="links"
        large
      >
      </v-breadcrumbs>
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
          
          <MenuImage :image="getImgUrl(n.extension)" :id="n.id" :url="n.url" :style="{'width': '175px'}"></MenuImage>
          <v-card-text>
            <v-row
              align="center"
              justify="center"
            >
              <b >{{n.name.substr(0, 15) + '.' + n.extension}}</b>
            </v-row>
          </v-card-text>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import MenuImage from '@/components/MenuImage.vue'

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
          links: [
            {
              text: 'Projects',
              disabled: false,
              to: '/',
            },
            {
              text: 'Files',
              disabled: true,
              to: '/files',
            },
          ],
          files: this.$store.state.files,
        }
    },

    components: {
      MenuImage,
    },

    methods: {
          getImgUrl (ext) {
            let icon = this.other;
            if (['png', 'jpg', 'jpeg', 'gif'].includes(ext)) {
              icon = this.image;
            } else if (['pdf'].includes(ext)){
              icon = this.pdf;
            } else if (['doc', 'docx', 'dotm', 'dotx', 'docm'].includes(ext)){
              icon = this.word;
            } else if (['xlsx', 'xls', 'xlsm', 'xlsb', 'xltx'].includes(ext)){
              icon = this.excel;
            } else if (['rar', 'zip'].includes(ext)){
              icon = this.compressed;
            }
             else if (['pptx', 'pptm', 'ppt', 'pdf'].includes(ext)){
              icon = this.powerPoint;
            }
            return icon;
          },
    },

    computed: {},
  }
</script>

<style></style>

