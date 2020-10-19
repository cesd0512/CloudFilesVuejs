<template>
  <div style="padding-top: 15px">
    <v-container class="grey lighten-5">
      <v-breadcrumbs class=""
        :items="links"
        large
      >
      </v-breadcrumbs>
      <v-row
        class="mb-6"
        no-gutters
      >
        <v-col
          v-for="n in files"
          :key="n.id"
          cols="3"
          xs="12"
          sm="6"
          md="3"
          lg="2"
          xl="2"
        >
        <div style="padding: 15px">
          <v-img
              :src="n.src"
              class="white--text align-end"
              height="auto"
            >
          </v-img>
          <v-card-text>
              <b>{{n.id}}</b>
          </v-card-text>
        </div>
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
              files:[
                {src: 'https://www.okporters.net/wp-content/uploads/2015/03/pdf-icon-png-pdf-zum-download-2.png', id: 1},
                {src: 'https://img.icons8.com/color/452/microsoft-word-2019--v2.png', id: 2},
                {src: 'https://www.okporters.net/wp-content/uploads/2015/03/pdf-icon-png-pdf-zum-download-2.png', id: 3},
                {src: 'https://img.icons8.com/color/452/microsoft-word-2019--v2.png', id: 4},
                {src: 'https://www.okporters.net/wp-content/uploads/2015/03/pdf-icon-png-pdf-zum-download-2.png', id: 5},
                {src: 'https://www.tangaroa.school.nz/wp-content/uploads/2019/07/wb-doc-icon.png', id: 6},
                {src: 'https://img.icons8.com/color/452/microsoft-word-2019--v2.png', id: 7},
                {src: 'https://www.okporters.net/wp-content/uploads/2015/03/pdf-icon-png-pdf-zum-download-2.png', id: 8},
                {src: 'https://www.okporters.net/wp-content/uploads/2015/03/pdf-icon-png-pdf-zum-download-2.png', id: 9},
                {src: 'https://img.icons8.com/color/344/image.png', id: 10},
              ]
            }
          },
    methods: {
          getImgUrl (ext) {
            console.log('../assets/' + ext + '.png');
            return '../assets/' + ext + '.png';
          }
            
        },
  
  }
</script>

<style>
  .items {
    margin-top: 15px;
  }

</style>

