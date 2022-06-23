 <template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
          {{ label }}
        </v-btn>
      </template>

      <v-card :class="{ 'error--container': !validateFileSize }">
        <v-card-title class="text-h5 grey lighten-2">
          {{ label }}
        </v-card-title>
        <v-divider />
        <v-card-text class="py-5">
          <v-file-input
            small-chips
            show-size
            counter
            outlined
            dense
            truncate-length="25"
            :multiple="multiple"
            :accept="acceptedTypes"
            :placeholder="placeholder"
            :prepend-icon="prependIcon"
            :label="label"
            :rules="rules"
            v-model="files"
            @change="onFileChange"        
            class="pa-3"    
          >
            <template v-slot:selection="item">
              <v-chip
                small
                label 
                :close="item.file.size > sizeAllowed"
                :color="item.file.size > sizeAllowed ? 'error' : 'success'"    
                @click:close="removeFile(item)"       
                class="my-5"      
              >
                {{ item.text }}
              </v-chip>
            </template>
          </v-file-input>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">
            close
          </v-btn>
          <v-btn color="primary" text @click="saveFiles()">
            Upload
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
 
<script>
import { labeledStatement } from "@babel/types";
const acceptFileTypes = [
  ".doc",
  ".docx",
  ".xls",
  ".xlsx",
  ".pdf",
  "image/*",
  ".zip"
];
const sizeAllowedConst = 2000000;

export default {
  name: "UploadDocument",
  props: {
    acceptedTypes: {
      type: Array,
      default: () => acceptFileTypes,
      validate: value => {
        if (value.length >= 1) {
          return true;
        }
        if (acceptFileTypes.includes(value)) {
          return true;
        }
      }
    },
    placeholder: {
      type: String,
      default: "Search and pick files"
    },
    prependIcon: {
      type: String,
      default: "mdi-paperclip"
    },
    label: {
      type: String,
      default: "Upload documents"
    },
    multiple: {
      type: Boolean,
      default: true
    },
    uploadUrl: {
      type: String,
      default: "/upload"
    }
  },
  data() {
    return {
      dialog: false,
      files: [],
      rules: [
        value =>
          !value ||
          value.size < this.sizeAllowed ||
          "File size should be less than 2 MB!"
      ]
    };
  },
  computed: {
    validateFileSize() {
      return this.files.every(file => file.size < this.sizeAllowed);
    },
    sizeAllowed() {
      return sizeAllowedConst;
    }
  },
  methods: {
    validate() {
      if (this.files.length < 1) return false;
      if (this.validateFileSize) return false;
      return true;
    },
    onFileChange() {
      this.validate();
    },
    removeFile(item) {
      this.files = this.files.filter(file => file.name !== item.file.name);
       console.log(item)
       console.log(this.files)
    },
    async saveFiles() {
      if (this.validate()) {
        try {
          const bodyFormData = new FormData();
          const filesRequest = this.files.map(file => {
            bodyFormData.append("files", file);
            return fetch(this.uploadUrl, {
              method: "POST",
              body: bodyFormData,
              headers: {
                "Content-Type": "multipart/form-data"
              }
            });
          });
          const response = await all(filesRequest);
          console.log(response);
        } catch (err) {
          console.log(err);
        }
      } else {
        console.log("Please select valid files");
      }
    }
  }
};
</script>
<style>
.py-5 {
  padding-top: 2rem !important;
  padding-bottom: 2rem !important;
}
.error {
  color: red !important;
  background: rgba(255, 0, 0, 0.043) !important;
  padding: 1rem !important;
  border-radius: 15px !important;
}
.success {
  color: green !important;
  background: rgba(0, 255, 0, 0.043) !important;
  padding: 1rem !important;
  border-radius: 15px !important;
}
.error--container{
  border: 2px solid  rgba(255, 0, 0, 0.225) !important;
}
</style>
