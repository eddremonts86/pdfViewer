<template>
  <v-card>
    <v-card-title>
      <h2>Edit Document</h2>
      <v-spacer />
      <upload-document />
    </v-card-title>
    <v-divider />
    <v-card-text>
      <v-form key="DownloadDocsForm">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.fornavn"
              label="Fornavn"
              dense
              outlined
            />
            <v-text-field
              v-model="form.fuldt_navn"
              label="Fuldt navn"
              dense
              outlined
            />
            <v-text-field
              v-model="form.vej_og_nummer"
              label="Vej og nummer"
              dense
              outlined
            />
            <v-text-field
              v-model="form.postnummer"
              label="Postnummer"
              dense
              outlined
            />
            <v-text-field v-model="form.by" label="By" dense outlined />
            <v-text-field v-model="form.dato" label="Dato" dense outlined />
            <v-text-field
              v-model="form.bruger_fornavn"
              label="Bruger fornavn"
              dense
              outlined
            />
            <v-text-field
              v-model="form.din_dit_jeres"
              label="Din/dit jeres"
              dense
              outlined
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.ejendomstype"
              label="Ejendomstype"
              dense
              outlined
            />
            <v-text-field
              v-model="form.den_det"
              label="Den/det"
              dense
              outlined
            />
            <v-text-field
              v-model="form.ejendomstype_flertal"
              label="Ejendomstype flertal"
              dense
              outlined
            />
            <v-text-field
              v-model="form.i_paa_by"
              label="I paa by"
              dense
              outlined
            />
            <v-text-field
              v-model="form.dig_jer"
              label="Dig/jer"
              dense
              outlined
            />
            <v-text-field
              v-model="form.bruger_fuldt_navn"
              label="Bruger fuldt navn"
              dense
              outlined
            />
            <v-text-field
              v-model="form.bruger_email"
              label="Bruger email"
              dense
              outlined
            />
            <v-text-field
              v-model="form.bruger_tel"
              label="Bruger tel"
              dense
              outlined
            />
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <v-btn depressed @click="form = {}">
        <v-icon>mdi-cached</v-icon>Resect
      </v-btn>
      <v-spacer />
      <client-only>
        <update-viewer
          :data-to-fill="form"
          :fileUrl="fileUrl"
          @update:fileUrl="downloadDocx"
        />
        <download-docx :data-to-fill="form" :fileUrl="fileUrl" />
      </client-only>
    </v-card-actions>
  </v-card>
</template>

<script>
import uploadDocument from "./uploadDocument.vue"; 

export default {
  name: "pdfFormEditor",
  components: {
    updateViewer: () => {
      if (process.client) {
        return import("./ updateViewer.vue");
      }
    },
    downloadDocx: () => {
      if (process.client) {
        return import("./downloadDocx.vue");
      }
    },
    uploadDocument
  },
  mounted() {
    this.$emit("fileUrl", this.fileUrl);
    this.$emit("update:formData", this.form);
  },
  data: () => ({
    form: {
      fornavn: "Eduardo Inerarte",
      fuldt_navn: "Emilio Emiliano",
      vej_og_nummer: "Købmagergade 52A, 1150 København",
      postnummer: "4571",
      by: "Resights",
      dato: "17/05/2020",
      bruger_fornavn: "Mikkel Mikkelsen",
      din_dit_jeres: "din", // from din-dit-jeres
      ejendomstype: "Hus",
      den_det: "den", // from den-det
      ejendomstype_flertal: "1 542 145 dk",
      i_paa_by: "1 852 222", // from i-paa_by
      dig_jer: "jer", // from dig-jer
      bruger_fuldt_navn: "Resights",
      bruger_email: "resights@google.dk",
      bruger_tel: "+45 546 454"
    },
    fileUrl: "/docs/Real_estate_agent_case.docx"
  }),
  methods: {
    downloadDocx(fileUrl) {
      this.$emit("fileUrl", fileUrl), this.$emit("update:formData", this.form);
    }
  }
};
</script>

<style>
.mx-2 {
  margin-left: 2px;
  margin-right: 2px;
}
</style>
