<template>
  <v-btn @click="createDOC()" class="mx-2">
    <v-icon>mdi-update</v-icon>
    Update Document 
  </v-btn>
</template>

<script>
import docxtemplater from "docxtemplater";
import JSzip from "jszip";
import JSzipUtils from "jszip-utils";
import { saveAs } from "file-saver";

export default {
  name: "UpdateViewer",
  props: {
    fileUrl: {
      type: String,
      required: true
    },
    dataToFill: {
      type: Object,
      required: true // This is the data that will be filled in the document
    }
  },
  mounted() {
    this.createDOC();  
  },
  methods: {
    loadFile(url, callback) {
      JSzipUtils.getBinaryContent(url, callback);
    },
    createDOC() {
      let prev = this.dataToFill;
      let vm = this;
      this.loadFile(this.fileUrl, function(error, content) {
        if (error) {
          throw error;
        }
        let zip = new JSzip(content);
        let doc = new docxtemplater().loadZip(zip);
        doc.setData(prev);
        try {
          doc.render();
        } catch (error) {
          let e = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties
          };
          console.log(JSON.stringify({ error: e }));
          throw error;
        }
        let out = doc.getZip().generate({
          type: "blob",
          mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        });        
        vm.$emit("update:fileUrl", URL.createObjectURL(out));
         // saveAs(out, `${prev.fornavn}.docx`);
      });
    }
  }
};
</script>
