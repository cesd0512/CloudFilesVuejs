<template>
  <v-banner
    single-line
  >
    <v-icon
      slot="icon"
      color="indigo"
      size="36"
    >
      {{icon}}
    </v-icon>
    <h3>{{title}}</h3>
    

  </v-banner>
</template>


<script>
    export default {
        name: 'Banner',
        props: ['title', 'icon'],
        data() {
            return {
            }
        },
        
        computed: {
            
        },
        
        methods:{

    }
    
    }
</script>