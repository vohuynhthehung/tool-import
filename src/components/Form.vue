<template>
    <form id="import-product" v-on:submit="submit">
        <label>
            <img src="../assets/file.svg" />
            <input @change="handleProductFile" value="files" name="file" id="product_file" type="file" accept=".xlsx" class="ega-form-control" />
            <small v-if="this.pd_files">{{this.pd_files.name}}</small>
            <b>Nhập file product.xlsx (*.xlsx)</b>
        </label>
        <label>
            <img src="../assets/file.svg" />
            <input @change="handleSKUFile" value="files" name="file" id="sku_file" type="file" accept=".xlsx" class="ega-form-control" />
            <small v-if="this.sku_files">{{this.sku_files.name}}</small>
            <b>Nhập file sku-code-manager.xlsx (*.xlsx)</b>
        </label>
        <label>
            <img src="../assets/file.svg" />
            <input @change="handleVariantFile" value="files" name="file" id="variant_file" type="file" accept=".xlsx" class="ega-form-control" />
            <small v-if="this.variant_files">{{this.variant_files.name}}</small>
            <b>Nhập file variant-manager.xlsx (*.xlsx)</b>
        </label>
        <button type="submit" class="nano-btn">Nhập sản phẩm</button>
    </form>
</template>
<script>
import Vue from "vue";
import VueSweetalert2 from "vue-sweetalert2";
import { Auth } from "../services/auth";
import { CAMPAIGNS_URL } from "../share/constant";

const options = {
    confirmButtonColor: "#ffa600",
    cancelButtonColor: "#ffa600"
};

Vue.use(VueSweetalert2, options);

import axios from 'axios';
export default {
    name: "Form",
    data: function() {
        return {
            pd_files: null,
            sku_files: null,
            variant_files: null,
            isUploading: false
        };
    },
    methods: {
        handleProductFile: function(e) {
            e.preventDefault();
            this.pd_files = e.target.files[0];
            this.pd_id = e.target.id;
        },
        handleSKUFile: function(e) {
            e.preventDefault();
            this.sku_files = e.target.files[0];
            this.sku_id = e.target.id;
        },
        handleVariantFile: function(e) {
            e.preventDefault();
            this.variant_files = e.target.files[0];
            this.variant_id = e.target.id;
        },
        submit: async function(e) {
            e.preventDefault();
            var import_time = this.getImportTime(Date.now());

            if (this.pd_files != null && this.sku_files != null && this.variant_files != null) {
                var data = new FormData();
                data.append('product_file', this.pd_files);
                data.append('sku_code_file', this.sku_files);
                data.append('variant_file', this.variant_files);
                data.append("title", `import from app at ${import_time}`);

                const access_token = Auth.getAccessToken();

                await axios({
                    "async": true,
                    "crossDomain": true,
                    method: "POST",
                    url: CAMPAIGNS_URL,
                    data: data,
                    headers: {
                        "x-nanostick-token": access_token
                    },
                    "processData": false,
                    "contentType": false,
                    "mimeType": "multipart/form-data"
                }).then(res => {
                    localStorage.setItem("current_campaign_id", res.data.id)

                    this.$swal({
                        title: "",
                        html: `<p>Đang tiến hành nhập liệu!</p>`,
                        confirmButtonText: "Đóng"
                    });
                }).catch(err => {
                    this.$swal({
                        title: "",
                        html: `<p>${err.response.data.message}</p>`,
                        confirmButtonText: "Đóng"
                    });
                });
            } else {
                this.$swal({
                    title: "",
                    html: `<p>Bạn chưa nhập đủ Files</p>`,
                    confirmButtonText: "Đóng"
                });
            }
        },
        getImportTime: function(date) {
            var d = new Date(date),
                month = (d.getMonth() + 1),
                day = d.getDate(),
                year = d.getFullYear(),
                hour = d.getHours(),
                minute = d.getMinutes(),
                second = d.getSeconds();

            if (month.toString().length == 1) month = '0' + month;
            if (day.toString().length == 1) day = '0' + day;
            if (hour.toString().length == 1) hour = '0' + hour;
            if (minute.toString().length == 1) minute = '0' + minute;
            if (second.toString().length == 1) second = '0' + second;

            return [hour, minute, second].join(':') + " " + [year, month, day].join('-');
        }
    }
}
</script>
<style>
#import-product input {
    display: none;
}

#import-product img {
    width: 40px;
    margin-bottom: 10px;
}

.summary {
    display: none;
    margin-top: 20px;
    padding: 10px;
    border: 2px dotted;
}

.summary.active {
    display: block;
}
</style>