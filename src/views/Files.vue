<template>
  <div style="padding: 15px; margin: 0">
    <v-container class="grey lighten-5">
      <v-breadcrumbs class=""
        :items="links"
        large
      >
      </v-breadcrumbs>
      <v-row
        class="mb-6"
      >
        <v-col
          v-for="n in files"
          :key="n.id"
          cols="6"
          md="2"
          align="center"
          justify="center"
        >
          <v-img
              :src="getImgUrl(n.extension)"
              class="white--text align-end"
              height="auto"
            >
          </v-img>
          <v-card-text>
              <b>{{n.name.substr(0, 15) + '.' + n.extension}}</b>
          </v-card-text>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>

export default {
  name: 'Files',
    data() {
        return {
          pdf: 'https://res.cloudinary.com/cloud4files/image/upload/v1606099130/pdf_gh7hrz.png',
          word: 'https://res.cloudinary.com/cloud4files/image/upload/v1606099130/word_lhowbf.png',
          other: 'https://res.cloudinary.com/cloud4files/image/upload/v1606099130/other_eed6xc.png',
          image: 'https://res.cloudinary.com/cloud4files/image/upload/v1606099130/image_twxbsz.png',
          excel: 'https://res.cloudinary.com/cloud4files/image/upload/v1606099130/excel_wcprf3.png',
          powerPoint: 'https://res.cloudinary.com/cloud4files/image/upload/v1606099130/powerPoint_bcklw6.png',
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
            }
             else if (['pptx', 'pptm', 'ppt', 'pdf'].includes(ext)){
              icon = this.powerPoint;
            }
            return icon;
          }
    },
    computed: {},
  }
</script>

<style>
  .items {
    margin-top: 15px;
  }

</style>

