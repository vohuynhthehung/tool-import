<template>
    <div>
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
<!--         <div class="summary">
            <div class="summary_item">
                <span class="summary_title">22222Số sản phẩm:</span>
                <span class="summary_number">{{this.pd_success}}/{{this.pd_total}}</span>
            </div>
            <div class="summary_item">
                <span class="summary_title">Số nhóm sản phẩm:</span>
                <span class="summary_number">{{this.coll_success}}/{{this.coll_total}}</span>
            </div>
            <div class="summary_item">
                <span class="summary_title">Số hình ảnh sản phẩm:</span>
                <span class="summary_number">{{this.img_success}}/{{this.img_total}}</span>
            </div>
        </div> -->
    </div>
</template>
<script>
import Vue from "vue";
import VueSweetalert2 from "vue-sweetalert2";
import { Auth } from "../services/auth";

const options = {
    confirmButtonColor: "#ffa600",
    cancelButtonColor: "#ffa600"
};

var access_Token_new = localStorage.getItem("access_token");

Vue.use(VueSweetalert2, options);

import axios from 'axios';
export default {
    name: "Form",
    data: function() {
        return {
            pd_files: null,
            sku_files: null,
            variant_files: null,
            isUploading: false,
            pd_total: 0,
            pd_success: 0,
            coll_total: 0,
            coll_success: 0,
            img_total: 0,
            img_success: 0,
            items: [{ title: 'Foookokok', status: 'created' }, { title: 'Barokokokok', status: 'error' }],
        };
    },
    methods: {
        testFile: function(e) {
            e.stopPropagation();
            e.preventDefault();
            this.reader = new FileReader();
            this.files = e.target.files[0];
        },

        handleProductFile: function(e) {
            e.stopPropagation();
            e.preventDefault();
            debugger;
            this.reader = new FileReader();
            this.pd_files = e.target.files[0];
            this.pd_id = e.target.id;
        },
        handleSKUFile: function(e) {
            e.stopPropagation();
            e.preventDefault();
            debugger;
            this.reader = new FileReader();
            this.sku_files = e.target.files[0];
            this.sku_id = e.target.id;
        },
        handleVariantFile: function(e) {
            e.stopPropagation();
            e.preventDefault();
            debugger;
            this.reader = new FileReader();
            this.variant_files = e.target.files[0];
            this.variant_id = e.target.id;
        },
        submit: async function(e) {
            debugger;


            e.preventDefault();
            if (this.pd_files != null && this.sku_files != null && this.variant_files != null) {
                var data = new FormData();
                data.append('product_file', this.pd_files);
                data.append('sku_code_file', this.sku_files);
                data.append('variant_file', this.variant_files);
                data.append("title", "upload from app");

                var accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaG9wSWQiOiI1ZjZkNWY5YjA5N2ZiMjg0YWFkYjc3YTMiLCJpYXQiOjE2MDEyNjk5NTksImV4cCI6MTYwMTUyOTE1OX0.M3ZydJp9Hm-fLrd4ZAC6NPBayIzis28CvsnJk4EJWTo";
                await axios({
                    "async": true,
                    "crossDomain": true,
                    method: "POST",
                    url: "https://nanostcktest.egany.com/api/campaigns",
                    data: data,
                    headers: {
                        "x-nanostick-token": accessToken
                    },
                    "processData": false,
                    "contentType": false,
                    "mimeType": "multipart/form-data"
                }).then(res => {
                    debugger;
                    
                    var campaignStatus = res.data.status;
                    var campaignId = res.data.id;
                    //var campaignId = "5f6d608b7457fd0018f1274d";
                    //this.getProducts111(campaignId);

                    this.$swal({
                            title: "",
                            html: `<p>Đang tiến hành nhập liệu!</p>`,
                            confirmButtonText: "Đóng"
                        });

                    console.log("thành công - submit", campaignStatus);
                    console.log("thành công - submit", campaignId);

                    localStorage.setItem("current_id", campaignId)

                    if (campaignStatus == "completed") {

                        localStorage.setItem("current_id", campaignId)
                        this.$swal({
                            title: "",
                            html: `<p>Nhập sản phẩm thành công!</p>`,
                            confirmButtonText: "Đóng"
                        });

                        var id = localStorage.getItem("current_id");
                        this.getOneFromForm(id);
                    }

                    if (campaignStatus == "error") {
                    	this.$swal({
                            title: "",
                            html: `<p>Lỗi trong quá trình nhập liệu!</p>`,
                            confirmButtonText: "Đóng"
                        });
                    }

                }).catch(err => {
                    /*this.$swal({
                        title: "",
                        html: `<p>${err.response.data.message}</p>`,
                        confirmButtonText: "Đóng"
                    });*/
                    //debugger;
                    var campaignId = "5f6d608b7457fd0018f1274d";
                    //this.getProducts111(campaignId);

                    localStorage.setItem("current_id", campaignId);

                    debugger;

                    //this.getOneFromForm();
                });


            } else {
                debugger;
                /*var campaignId = "5f6d608b7457fd0018f1274d";
				this.getProducts111(campaignId);*/

                this.$swal({
                    title: "",
                    html: `<p>Bạn chưa nhập đủ Files</p>`,
                    confirmButtonText: "Đóng"
                });


            }
        },
        getProducts111: async function(campaignId) {
            console.log("eeeee")
            axios({
                "url": `https://nanostcktest.egany.com/api/products-progress?campaignId=${campaignId}&limit=100`,
                "method": "GET",
                "headers": {
                    "x-nanostick-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaG9wSWQiOiI1ZjZkNWY5YjA5N2ZiMjg0YWFkYjc3YTMiLCJpYXQiOjE2MDEyNjk5NTksImV4cCI6MTYwMTUyOTE1OX0.M3ZydJp9Hm-fLrd4ZAC6NPBayIzis28CvsnJk4EJWTo",
                    "cache-control": "no-cache",
                }
            }).then(res => {
                this.items = res.data.data;
            }).catch(err => {
                //console.log("err here", JSON.parse(err));
                console.log("err here", err.response.data);
                console.log("có lỗi", err.response.data.message);
            });
        },

        getOneFromForm: async function(id) {
            debugger;
            await axios({
                "url": `https://nanostcktest.egany.com/api/campaigns/${id}`,
                "method": "GET",
                "headers": {
                    "x-nanostick-token": localStorage.getItem("access_token"),
                    "cache-control": "no-cache"
                }
            }).then(res => {
                debugger;
                console.log("thành công - getone", JSON.stringify(res));
                this.pd_success = res.data.totalProductCreateComplated;
                this.pd_total = res.data.totalProductCreate;
                this.coll_success = res.data.totalMappingCollectCompleted;
                this.coll_total = res.data.totalMappingCollect;
                this.img_success = res.data.totalMappingImageCompleted;
                this.img_total = res.data.totalMappingImage;
            }).catch(err => {
                //console.log("err here", JSON.parse(err));
                console.log("err here", err.response.data);
                console.log("có lỗi", err.response.data.message);
            });
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
.summary.active{
	display: block;
}
</style>