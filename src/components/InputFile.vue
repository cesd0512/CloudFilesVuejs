<template>
  <v-container
      class="mx-auto"
    >
      <input type="file" id="fileinput" multiple hidden @change="processFile($event)" />
      <label class="labelFile" for="fileinput">Choose File
        <v-icon
            right
            dark
          >
            mdi-paperclip
          </v-icon>
      </label>
      
      <v-btn
        class="ma-2"
        color="#828686"
        large
        dark
        hover
        @click="clear()"
      >
        Clear
        <v-icon
          right
          dark
        >
          mdi-eraser
        </v-icon>
      </v-btn>

      <v-virtual-scroll
        :bench="benched"
        :height="height"
        :items="files"
        item-height="70"
        style="margin-top:20px"
        class="mx-auto"
      >
        <template v-slot:default="{ item, index }">
          <v-list-item
            :key="index"
          >
            <v-avatar tile>
              <img
                :src="getImgUrl(item.name)" 
                :alt="item.name"
              >
            </v-avatar>
            <v-spacer></v-spacer>

            <v-list-item-content>
              <v-list-item-title v-text="item.name"></v-list-item-title>

              <v-list-item-subtitle v-text="convertToKb(item.size)"></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn icon 
              @click="deleteFile(index)">
                <v-icon color="grey lighten-1">mdi-close</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </template>
      </v-virtual-scroll>
      <h5
      v-if="files.length > 0" 
      style="height:10px; margin:20px; float: right; color:#4E5252"
      >
        {{totalFiles + ' (' + convertToKb(totalSize) + ' in total)'}}
      </h5>
  </v-container>
</template>

<script>
import { getImgUrl } from '../functions';
import axios from "axios";

export default {
    name: 'InputFile',
    props: ['color', 'label', 'placeholder', 'size'],
    data() {
        return {
            files: [],
            benched: 0,

        }
    },

    computed: {
      height(){
        var heightList = 0;
        var windowHeight = window.screen.height/3;
        if (this.files.length > 0){
          if ((this.files.length * 70) < windowHeight){
            heightList = this.files.length * 70;
          } else {
            heightList = windowHeight;
          }
        }
        return heightList;
      },

      totalFiles(){
        return this.files.length + ' files';
      },

      totalSize(){
        let size = 0;
        for (let i=0; i<this.files.length; i++){
          console.log(this.files[i].size);
          size += this.files[i].size;
        }
        return size;
      }
    },

    methods:{
      processFile(event) {
        var files = event.target.files;
        for (let i = 0; i < files.length; i++){
          this.files.push(files[i]);
        }
        this.$store.state.inputFiles = this.files;
      },

      clear() {
        this.files = [];
      },

      deleteFile(index) {
        this.files.splice(index, 1);
      },

      getImgUrl (name) {
        let list_ = name.split('.');
        let length_ = list_.length;
        let index_ = length_ - 1;

        let ext = list_[index_];
        let image = getImgUrl(ext);
        return image;
      },

      convertToKb(size){
        return Math.round(size/1000) + ' Kb';

      },

    }
}
</script>

<style>
  .labelFile{
    background-color: #42A5F5;
    color: white;
    padding: 12.5px;
    border-radius: 0.3rem;
    margin: 10px;
  }
  .labelFile:hover {
    background-color: #1a73e8;
  }
</style>