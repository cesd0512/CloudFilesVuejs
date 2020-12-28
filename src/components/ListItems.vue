<template>
  <v-list
    subheader
    two-line
    >
    <div>
      <v-text-field
        v-model="search"
        label="Buscar"
        class="mx-4"
      ></v-text-field>
    </div>
    <div>
      <Scroller :items="allItems" :height="'350'" @click="handleClick"></Scroller>
     
    </div>

    <v-divider inset></v-divider>
  </v-list>
</template>

<script>
  import store from "../store";
  import axios from "axios";
  import Scroller from '@/components/Scroller.vue'

  export default {
    name: 'ListItems',
    props: ['items'],

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
      handleClick(item) {
      this.$emit("click", item);
    }
    }
  
  }
</script>