<template>
  <v-list
    subheader
    two-line
    >
    <div v-if="searchInList">
      <v-text-field
        v-model="search"
        label="Buscar"
        class="mx-4"
      ></v-text-field>
    </div>
    <div v-if="scroller">
      <Scroller :items="allItems" :height="'500'" @click="selectedItem"></Scroller>
    </div>

  </v-list>
</template>

<script>
  import store from "../store";
  import axios from "axios";
  import Scroller from '@/components/Scroller.vue'

  export default {
    name: 'ListItems',
    props: ['items', 'scroller', 'searchInList'],

    data() {
        return {
          search: '',
          files: [],
          pagination: 8,
        }
    },

    components: {
      Scroller,
    },
    
    computed: {
      allItems () {
        var itemsfound = [];
        if (this.search != '' && this.items.length > 0){
          for (let i of this.items){
            if (i.name.includes(this.search)){
              itemsfound.push(i);
            }
          }
        }
        if (itemsfound.length > 0){
          return itemsfound;
        }
        return this.items;
      }
        
    },
    
    methods: {
      selectedItem(item) {
        this.$emit("click", item);
      }
    }
  
  }
</script>