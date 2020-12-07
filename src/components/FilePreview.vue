<template>
  <v-container >
    <v-dialog
          v-model="show"
          width="auto">
      <v-row no-gutters>
        <v-col
          cols="12"
          sm="12"
          align="center"
          justify="center"
          >
          <VueDocPreview :value="file" type="office" />
        </v-col>
      </v-row>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import VueDocPreview from 'vue-doc-preview'

  export default {
    name: 'FilePreview',
    props: ['file', 'show'],
    data: () => ({
    }),

    components: {
      VueDocPreview
    },

    methods: {
    },
  }
</script>
