<template>
  <form id="import-product" v-on:submit="submit">
    <div class="ega-m--4">
      <label>
        <img src="../assets/file.svg" />
        <input
          @change="handleFileChange"
          value="files"
          name="file"
          id="product_file"
          type="file"
          accept=".xlsx"
          class="ega-form-control"
          :disabled="isUploading"
        />
        <small v-if="this.files">{{this.files.name}}</small>
        <b>Nhập file sản phẩm (*.xlsx)</b>
      </label>
    </div>
    <div>
    <button :disabled="isUploading" type="submit" class="qhome-btn">Nhập sản phẩm</button>
    </div>
    <p style="color: #9e9e9e"> Hoặc </p>
    <a @click="showImportStatus">Xem tiến trình nhập sản phẩm</a>

  </form>
</template>
<script>
import Vue from "vue";
import VueSweetalert2 from "vue-sweetalert2";
import { Product } from "../services/product";

// If you don't need the styles, do not connect
import "sweetalert2/dist/sweetalert2.min.css";

const options = {
  confirmButtonColor: "#939041",
  cancelButtonColor: "#ff7674"
};

Vue.use(VueSweetalert2, options);
export default {
  name: "Form",
  data: function() {
    return {
      files: null,
      isUploading: false
    };
  },
  methods: {
    submit: async function(e) {
      e.preventDefault();
      if (this.files) {
        const res = await Product.checkStatusImport();
        this.isUploading = true
        try {
          const isCompleted = res.data.result.status;
          if (isCompleted === "completed") {
            Product.importProduct(this.files).then(res => {
             this.isUploading = false;
              if (res.data.message === "Product will be processing") {
                // Use sweetalert2
                this.$swal({
                  title: "",
                  html: "<p>Hệ thống đang thực hiện nhập dữ liệu sản phẩm vào website của bạn</p>",
                  confirmButtonText: "Đóng"
                });
              }
            }).catch(err =>{
              let message = 'Đã có sự cố xảy ra vui lòng thử lại sau hoặc liên hệ kỹ thuật'
              let onClose;
              if(err.response && err.response.data){
                message =  err.response.data.message === 'unauthorized' ? 'Phiên đăng nhập đã hết vui lòng đăng nhập lại' : message
                onClose = this.$emit('logOut')
              }
                   this.$swal({
                  title: "",
                  html: `<p>${message}</p>`,
                  confirmButtonText: "Đóng",
                  onClose: ()=> onClose()
                });
            });
          }else{
             this.isUploading = false;
              this.$swal({
                  title: "",
                  html: "<p>Quá trình nhập dữ liệu sản phẩm trước đang diễn ra<br> Vui lòng đợi quá trình trước kết thúc</p>",
                  confirmButtonText: "Đóng"
                });
          }
        } catch (err) {
            this.$swal({
                  title: "",
                  html: `<p>${err.message}</p>`,
                  confirmButtonText: "Đóng"
                });
        }
      }else{
           this.$swal({
          html: `<p>Bạn chưa nhập file sản phẩm</p>`,
          confirmButtonText: "Đóng"
        });
      }
    },
    handleFileChange: function(e) {
      e.stopPropagation();
      e.preventDefault();
      this.reader = new FileReader();
      this.files = e.target.files[0];
    },
    showImportStatus: async function() {
      const res = await Product.checkStatusImport();
      try {
        const process = res.data.result;
        let status = process.status === 'completed' ? 'Hoàn thành' : 'Sản phẩm đang được import';
        const products = process.processing;
        this.$swal({
          title: `${status}`,
          html: `<p>${products}</p>`,
          confirmButtonText: "Đóng"
        });
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
<style scoped>
#import-product img {
  width: 40px;
  margin-bottom: 10px;
}
#import-product input {
  display: none;
}
label {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 250px;
  margin: 40px auto 20px;
  border: 2px dashed;
  padding: 30px;
  cursor: pointer;
}
small{
     white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;  
  max-width: 200px;
}
a{
    cursor: pointer;
    color: #428AD0;
    font-weight: bold;
    margin:  auto;
    display:inline-block
}
</style>