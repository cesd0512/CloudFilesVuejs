<template>
  <div style="width:12%; height:5px; float: right;">
        <v-select
          v-model="$i18n.locale"
          :items="langs"
          rounded
        ></v-select>
  </div>
</template>

<script>
export default {
  name: 'Translations',
  data () {
    return {
    langs: [
      {
        text: 'Español',
        value: 'es',
      },
      {
        text: 'Ingles',
        value: 'en',
      },
    ]}
  }
}
</script>