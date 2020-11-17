<template>
  <v-col
    cols="12"
    sm="12"
    align="center"
    justify="center"
    >
    <v-alert 
      :value="message ? true : false"
      :type="type" 
      dense
      :color="color"
      outlined>
      {{ $t(message) }}
    </v-alert>
  </v-col>
</template>

<script>
export default {
  name: 'Alert',
  props: ['message', 'color', 'type'],
  data () {
    return {
      // showError: false,
    }
  },
  // computed: {
  //   showError() {
  //     let error = this.error;
  //     return reset;
  //   }
  // },
} 
</script>