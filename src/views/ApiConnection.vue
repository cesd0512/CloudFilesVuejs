<template>
  <div>
    <div class="text-center d-flex pb-4">
      <v-btn @click="all">
        Expand
      </v-btn>
      <v-btn @click="none">
        Collapse
      </v-btn>
    </div>

    <v-expansion-panels
      v-model="panel"
      multiple
    >
      <v-expansion-panel
        v-for="(item,i) in items"
        :key="i"
      >
        <v-expansion-panel-header>Header {{ item }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>

// import Alert from '@/components/Alert';
import store from "../store";
import { mapActions } from "vuex";
import axios from "axios";
import { setFiles, pagination, getImgUrl, getFileName } from '../functions';

export default {
  name: 'Home',
  data () {
      return {
        panel: [],
        items: 5,
      }
    },

    components:{
    },

    watch: {
    },

    methods: {
      all () {
        this.panel = [...Array(this.items).keys()].map((k, i) => i)
      },
      // Reset the panel
      none () {
        this.panel = []
      }

    },

    computed: {

    },

} 
</script>


<style>
</style>


