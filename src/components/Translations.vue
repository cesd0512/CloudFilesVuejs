<template>
  <div style="width:10%; height:5px; float: right;">
    <v-select
      v-model="$i18n.locale"
      :items="langs"
      rounded
      style="margin-rigth: 120px"
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