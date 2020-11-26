<template>
  <div class="text-center" >
    <v-menu transition="fab-transition" >
      <template v-slot:activator="{ on, attrs }">
        <v-img 
        :src="image"
        v-bind="attrs"
        v-on="on"
        >
        </v-img>
      </template>
      <div>
        <v-btn
          fab
          dark
          small
          color="green"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          fab
          dark
          small
          color="red"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn
          fab
          dark
          small
          color="indigo"
        >
          <v-icon>mdi-eye</v-icon>
        </v-btn>
      </div>
    </v-menu>
  </div>
</template>


<script>
  export default {
    name: 'MenuImage',
    props: ['image'],

    data() {
        return {
        }
    },
    
    computed: {

    },

    watch: {

    },
    
    methods:{

    }
  
  }
</script>

<style>
  

</style>
