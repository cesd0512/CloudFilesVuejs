<template>
  <v-container >
    <v-menu transition="fab-transition" >
      <template v-slot:activator="{ on, attrs }">
        <v-img 
        :src="image"
        v-bind="attrs"
        v-on="on"
        >
        </v-img>
      </template>
      <v-btn-toggle
      mandatory
      light
      >
      <v-btn
        fab
        small
        icon
        title='edit'
        color="success"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn
        fab
        small
        icon
        title='delete'
        color="secondary"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-btn
        fab
        small
        icon
        title='view'
        color="warning"
      >
        <v-icon>mdi-eye</v-icon>
      </v-btn>
      </v-btn-toggle>
    </v-menu>
  </v-container>
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
