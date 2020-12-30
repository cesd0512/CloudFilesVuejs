<template>
  <v-file-input
    v-model="files"
    :color="color"
    counter
    :label="label"
    multiple
    :placeholder="placeholder"
    prepend-icon="mdi-paperclip"
    outlined
    dense
    :show-size="size"
  >
    <template v-slot:selection="{ index, text }">
      <v-chip
        v-if="index < 2"
        color="deep-purple accent-4"
        dark
        label
        small
      >
        {{ text }}
      </v-chip>

      <span
        v-else-if="index === 2"
        class="overline grey--text text--darken-3 mx-2"
      >
        +{{ files.length - 2 }} File(s)
      </span>
    </template>
  </v-file-input>
</template>

<script>
export default {
    name: 'InputFile',
    props: ['color', 'label', 'placeholder', 'size'],
    data() {
        return {
            files: [],
        }
    },
    methods:{}
}
</script>