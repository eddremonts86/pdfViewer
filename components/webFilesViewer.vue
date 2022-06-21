<template>
  <div>
    <div v-show="loading">
      <v-card
        color="primary"
        dark
      >
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
  name: "WebFilesViewer",
  props: {
    path: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    extension: {
      type: String,
      default: "docx"
    },
    instance: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      loading: true,
     };
  },
  mounted: function () {
    this.loading = true;
    import("@pdftron/webviewer").then(() => {
      WebViewer(
        {
          path: "../webviewer",
          initialDoc: this.url,
          extension: this.extension
        },
        this.$refs.viewer
      ).then(instance => this.instance).then(() => {
         this.loading = false
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