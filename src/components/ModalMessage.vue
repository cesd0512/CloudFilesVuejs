<template>
  <div>
    <v-dialog
    v-model="dialog"
    max-width="500px">
      <v-card>
          <v-card-title style="justify-content: center; padding: 20px">
              {{ $t(title)}}
          </v-card-title>
          <v-card-text 
          align="center"
          justify="center">
              <v-img v-if="image"
              :src="image"
              max-width="80"
              ></v-img>
          </v-card-text>

          <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
              text
              color="primary"
              @click="closeModal()"
              >
              {{ $t('close')}}
              </v-btn>
          </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
  export default {
    name: 'ModalMessage',
    props: ['dialog', 'title', 'image', 'redirect'],
    data() {
        return {
            // modal: false,
        }
    },
    
    computed: {
    },
    
    methods:{
        closeModal(info){
          this.dialog = false;
          if (this.redirect){
            this.$router.push(this.redirect);
          }
        }
    }
  
  }
</script>

<style>  
</style>