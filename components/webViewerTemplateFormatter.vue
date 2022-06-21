<template>
  <div>
    <div v-show="loading">
      <v-card color="primary" dark>
        <v-card-text>
          Please stand by
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </div>
    <div id="webviewer" ref="viewer" v-show="!loading"></div>
  </div>
</template>
<script>
export default {
  name: "webViewerTemplateFormatter",
  props: {
    path: {
      type: String,
      default: "../webviewer"
    },
    templateFileUrl: {
      type: String,
      required: true
    },
    extension: {
      type: String,
      default: "docx"
    },
    jsonData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loading: false
    };
  },
  mounted: function() {
    this.loading = true;
    import("@pdftron/webviewer").then(() => {
      WebViewer(
        {
          path: this.path,
          initialDoc: this.templateFileUrl,
          extension: this.extension
        },
        this.$refs.viewer
      )
        .then(instance => {
          // instance.UI.loadDocument(this.templateFileUrl);
          const { documentViewer } = instance.Core;
          documentViewer.addEventListener("documentLoaded", async () => {
            const doc = documentViewer.getDocument();
            await doc.documentCompletePromise();
            await doc.applyTemplateValues(this.jsonData);
            await documentViewer.updateView();
          });
        })
        .then(() => {
          this.loading = false;
        });
    });
  }
};
</script>
<style>
#webviewer {
  height: 100vh;
}
</style>