<template>
  <div id="app">
    <v-row>
      <v-col>
        <pdf-form-editor class="ma-8" @fileUrl="fileUrl" @update:formData="updateJsonData" />
      </v-col>
      <v-col>
        <!-- <web-files-viewer :path="`${publicPath}webviewer`" :url="url" :key="url" /> -->
        <web-viewer-template-formatter :jsonData="formData" :templateFileUrl="templateFile" :key="url"   />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import webViewerTemplateFormatter from "@/components/webViewerTemplateFormatter.vue"; 
// import webFilesViewer from "~/components/webFilesViewer.vue"; 
import pdfFormEditor from "@/components/pdfFormEditor.vue";
export default {
  name: "app",
  components: {
   // webFilesViewer,
    pdfFormEditor,
    webViewerTemplateFormatter
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
      url: "",
      templateFile: '/docs/Resights_ApS.docx',
      formData:{}
    };
  },
  methods: {
    fileUrl: function(fileUrl) {
      this.url = fileUrl;
    },
    updateJsonData(form) {
       this.formData = form;
    }
  }
};
</script>
<style>
html,
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 auto;
  height: 100vh;
  padding: 15px 25px;
}
#webviewer {
  height: 100vh;
}
</style>
