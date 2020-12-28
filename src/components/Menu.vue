<template>
    <div>
        <v-menu
            bottom
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
              >
                <v-icon >
                mdi-dots-vertical
                </v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="(item, i) in items"
                :key="i"
                link
              >
                <v-list-item-title @click="execAction(item.action)">
                <v-icon color="primary" style="padding:5px">{{ item.icon }}</v-icon>
                {{ item.title }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
    </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: 'Menu',
    props: ['items'],

    data () {
      return {

      }

    },

    components: {
    },
    
    computed: {},

    watch: {},
    
    methods:{
      execAction(action){
        this.$emit('click', action);
      }
    }
  
  }
</script>

<style></style>
