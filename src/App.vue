<template>
    <div id="app">
        <div class="ega-container">
            <div class="ega-row">
                <div class="ega-col-6">
                    <div id="input">
                        <div class="input_wrapper">
                            <Header />
                            <div v-if="!login">
                                <button @click="logInAction" type="button" class="nano-btn">Đăng nhập</button>
                            </div>
                            <div v-if="login">
                                <Form />
                                <button @click="logOut" type="button" class="nano-btn logout-btn">Đăng xuất</button>
<p> Hoặc </p>
                                <a @click="viewCampaignProcess">Xem tiến trình nhập sản phẩm</a>
                                <!-- <button @click="getList" type="button" class="nano-btn">Lấy thông tin campain mới nhất</button>
                                <button @click="getOne" type="button" class="nano-btn">Lấy một</button>
                                <button @click="getProducts" type="button" class="nano-btn">Get products</button>
                                <button @click="testProduct" type="button" class="nano-btn">Test product</button> -->


                                

<div class="summary" v-bind:class="{ active: detail_show }">
    <div class="summary_item">
        <span class="summary_title">Số sản phẩm:</span>
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
    <button @click="viewDetail" type="button" class="nano-btn">Xem chi tiết</button>
</div>



<!-- <div class="summary_item">Số nhóm sản phẩm: 12/100</div>
    <div class="summary_item">Số hình ảnh sản phẩm 5/20</div> -->


                            </div>
                        </div>
                    </div>
                </div>
                <div class="ega-col-6">
                    <div id="output">
                        <ul class="product_list">
                            <li v-for="item in items" :class="item.status"> {{ item.title }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <svg aria-hidden="true" style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <defs>
                <symbol id="ega-ic-checkmark" viewBox="0 0 32 32">
                    <title>checkmark</title>
                    <path d="M28.998 8.531l-2.134-2.134c-0.394-0.393-1.030-0.393-1.423 0l-12.795 12.795-6.086-6.13c-0.393-0.393-1.029-0.393-1.423 0l-2.134 2.134c-0.393 0.394-0.393 1.030 0 1.423l8.924 8.984c0.393 0.393 1.030 0.393 1.423 0l15.648-15.649c0.393-0.392 0.393-1.030 0-1.423z"></path>
                </symbol>
            </defs>
        </svg>
    </div>
</template>
<script>
import Vue from "vue";
import VueSweetalert2 from "vue-sweetalert2";

import Header from "./components/Header.vue";
import Form from "./components/Form.vue";
import { Auth } from "./services/auth";
import axios from 'axios';
import { APP_URL } from "./share/constant";
import { LOGIN_URL } from "./share/constant";
import { APP_ORGID } from "./share/constant";
import { IMPORT_PRODUCT_URL } from "./share/constant";

const options = {
    confirmButtonColor: "#ffa600",
    cancelButtonColor: "#ffa600"
};

const getQuery = (queryString, key) => {
    queryString = queryString.split("&");
    let value = queryString.find(query => query.indexOf(key) !== -1);
    if (value) {
        return value.split("=")[1];
    } else {
        return "";
    }
};

var access_Token_old = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaG9wSWQiOiI1ZjZkNWY5YjA5N2ZiMjg0YWFkYjc3YTMiLCJpYXQiOjE2MDEwMDM0NjYsImV4cCI6MTYwMTI2MjY2Nn0.5npP9UfPOy9Dyowmz6avzocI1zaFopuve2ElIXIWcT4";

var access_Token_new111 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaG9wSWQiOiI1ZjZkNWY5YjA5N2ZiMjg0YWFkYjc3YTMiLCJpYXQiOjE2MDEyNjk5NTksImV4cCI6MTYwMTUyOTE1OX0.M3ZydJp9Hm-fLrd4ZAC6NPBayIzis28CvsnJk4EJWTo";

var access_Token_new = localStorage.getItem("access_token");

Vue.use(VueSweetalert2, options);
export default {
    components: {
        Header,
        Form
    },
    data: function() {
        return {
            login: false,
            detail_show: false,
            items: null,
            pd_total: 0,
            pd_success: 0,
            coll_total: 0,
            coll_success: 0,
            img_total: 0,
            img_success: 0,
            access_Token_new: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaG9wSWQiOiI1ZjZkNWY5YjA5N2ZiMjg0YWFkYjc3YTMiLCJpYXQiOjE2MDEyNjk5NTksImV4cCI6MTYwMTUyOTE1OX0.M3ZydJp9Hm-fLrd4ZAC6NPBayIzis28CvsnJk4EJWTo"
        }
    },
    methods: {
        testProduct: async function(e) {
            var campaignId = "5f6d608b7457fd0018f1274d";
            this.getProducts(campaignId);
        },
        getList: async function(e) {
            debugger;
            axios({
                "url": "https://nanostcktest.egany.com/api/campaigns?sort=-id&status=completed&limit=1&page=1",
                "method": "GET",
                "headers": {
                    "x-nanostick-token": this.access_Token_new,
                    "cache-control": "no-cache"
                }
            }).then(res => {
                console.log("thành công", JSON.stringify(res));
                this.$swal({
                    title: "",
                    html: `<p>THÀNH CÔNG!. Hiện Có tổng cộng ${res.data.total} Campaigns</p>`,
                    confirmButtonText: "Đóng"
                });
            }).catch(err => {
                //console.log("err here", JSON.parse(err));
                console.log("err here", err.response.data);
                console.log("có lỗi", err.response.data.message);
            });
        },
        getOne: async function(e) {
            debugger;
            console.log("đang chạy111");
            axios({
                "url": "https://nanostcktest.egany.com/api/campaigns/5f719db00c388a0018f961fb",
                "method": "GET",
                "headers": {
                    "x-nanostick-token": this.access_Token_new,
                    "cache-control": "no-cache"
                }
            }).then(res => {
                debugger;
                console.log("thành công", JSON.stringify(res));
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
        },
        getProducts: async function(e) {
            axios({
                "url": `https://nanostcktest.egany.com/api/products-progress?campaignId=5f6d608b7457fd0018f1274d&limit=100`,
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
        viewDetail: async function(e) {
            var id = localStorage.getItem("current_id");
            if (id == null) {
                this.$swal({
                    title: "",
                    html: `<p>Chưa có thông tin</p>`,
                    confirmButtonText: "Đóng"
                });
            } else {
                await axios({
                    "url": `${APP_URL}/products-progress?campaignId=${id}&limit=100`,
                    "method": "GET",
                    "headers": {
                        "x-nanostick-token": localStorage.getItem("access_token"),
                        "cache-control": "no-cache",
                    }
                }).then(res => {
                    debugger;
                    console.log("viewDetail success")
                    this.items = res.data.data;
                }).catch(err => {
                    //console.log("err here", JSON.parse(err));
                    console.log("err here", err.response.data);
                    console.log("có lỗi", err.response.data.message);
                });
            }
        },
        logIn: function(code,orgId) {
            debugger;
            console.log("zzzzz",LOGIN_URL);
            axios({
                "url": "https://nanostcktest.egany.com/api/auth/login",
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json",
                    "cache-control": "no-cache"
                },
                "processData": false,
                "data": {
                    "code": code,
                    "orgId": orgId,
                    "status": "login"
                }
            }).then(res => {
                localStorage.setItem("access_token", res.data.accessToken);
                this.login = true;
                location = location.origin;
            }).catch(err => {
                this.$swal({
                    title: "",
                    html: `<p>${err.response.data.message}</p>`,
                    confirmButtonText: "Đóng111"
                });
            });
        },
        logOut: function(e) {
            localStorage.removeItem("access_token");
            this.login = false;
        },
        logInAction: function() {
            window.location = APP_ORGID;
        },
        viewCampaignProcess: async function(){
            if(localStorage.getItem("current_id") == null){
                this.$swal({
                    title: "",
                    html: `<p>Chưa có thông tin</p>`,
                    confirmButtonText: "Đóng"
                });
            } else {
            var id = localStorage.getItem("current_id");
            await axios({
                "url": `https://nanostcktest.egany.com/api/campaigns/${id}`,
                "method": "GET",
                "headers": {
                    "x-nanostick-token": localStorage.getItem("access_token"),
                    "cache-control": "no-cache"
                }
            }).then(res => {
                debugger;
                this.detail_show = true;
                console.log("thành công - getone", res.data.status);
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
    },
    mounted: function() {
        debugger;
        console.log("mounted");
        let loginQuery = decodeURIComponent(location.search).substring(1);
        if (loginQuery.length) {
            debugger;
            //alert("mounted work")
            let status = getQuery(loginQuery, "status");
            let code = getQuery(loginQuery, "code");
            let orgId = getQuery(loginQuery, "orgid");

            this.logIn(code, orgId);
            //Auth.login(code, orgId)
            //return;
        }
        debugger;
        if(location.hostname == "localhost"){
            var localToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaG9wSWQiOiI1ZjZkNWY5YjA5N2ZiMjg0YWFkYjc3YTMiLCJpYXQiOjE2MDEzMTkzMTIsImV4cCI6MTYwMTU3ODUxMn0.BTAhrpz9yePPEoE5iQ5HdXSFzkm5whLW-Gv4bsEf1jc";
            localStorage.setItem("access_token", localToken);
        }

        if(localStorage.getItem("access_token") != null){
            this.login = true;
        }

        //localStorage.removeItem("current_id");
    }
}
</script>
<style>
* {
    box-sizing: border-box;
}

.ega-col,
[class*=ega-col-] {
    padding-left: 15px;
    padding-right: 15px;
}

.ega-col-6 {
    -ms-flex: 0 0 50%;
    flex: 0 0 50%;
    max-width: 50%;
}

.ega-text--center {
    text-align: center !important;
}

label {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* margin: 40px auto 20px; */
    border: 2px dashed;
    padding: 10px;
    cursor: pointer;
}

label+label {
    margin-top: 15px;
}

#output {
    height: calc(100vh - 20px);
    background: #eee;
    border: 2px solid;
    border-color: var(--card-bg);
    width: 100%;
    padding: 20px;
    border-radius: 8px;
}

.product_list {
    list-style-type: none;
    padding: 0;
    margin: 0;
    height: 100%;
    overflow: auto;
}

.product_list li {
    padding-left: 25px;
    position: relative;
}

.product_list li+li {
    margin-top: 10px;
}

.product_list li svg {
    color: red;
}

[class^=ega-ic-],
[class*=" ega-ic-"] {
    display: inline-block;
    width: 1em;
    height: 1em;
    stroke-width: 0;
    stroke: currentColor;
    fill: currentColor;
    color: inherit;
    -webkit-font-smoothing: initial;
    -moz-osx-font-smoothing: initial;
}

.product_list li:before {
    position: absolute;
    top: -8px;
    left: 0;
    font-size: 25px;
}

.product_list li.created:before {
    content: "\2611";
    color: #28a745;
}

.product_list li.pending:before,
.product_list li.error:before {
    content: "\2612";
    color: #dc3545;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    --ui-01: #f4f4ec;
    --base-color: #939041;
    --card-bg: #ffa600;
    padding: 10px 0;
    --btn-color: #333;
}

#app .ega-row {
    margin-left: -5px;
    margin-right: -5px;
}

#app .ega-col,
[class*=ega-col-] {
    padding-left: 5px;
    padding-right: 5px;
}

body {
    line-height: 1.5;
    font-size: 1rem;
    color: #333;
    width: 100%;
    min-height: 100%;
    margin: 0;
    scroll-behavior: smooth;

}

.ega-row {
    display: flex;
    flex-wrap: wrap;
    margin-left: -15px;
    margin-right: -15px;
}

.ega-container {
    padding-left: 15px;
    padding-right: 15px;
    margin: 0 auto;
    width: 100%;
}

.ega-container--fluid {
    padding-left: 15px;
    padding-right: 15px;
    width: 100%;
}

#input {
    position: relative;
    background: var(--card-bg);
    width: 100%;
    padding: 20px;
    min-height: 40vh;
    height: calc(100vh - 20px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 8px;
    box-shadow: 0px 4rem 6rem rgba(16, 42, 67, 0.1);
    text-align: center;
}

#input .input_wrapper {
    height: 100%;
    overflow: auto;
}

.swal2-popup {
    font-family: Avenir, Helvetica, Arial, sans-serif;
}

.nano-btn {
    display: inline-block;
    margin-top: 20px;
    padding: 10px 24px;
    text-decoration: none;
    color: var(--btn-color);
    border: 2px solid var(--btn-color);
    font-weight: bold;
    line-height: 1;
    border-radius: 4px;
    cursor: pointer;
    box-shadow: 0px 4rem 6rem rgba(16, 42, 67, 0.1);
    border-radius: 8px;
    font-size: 16px;
}

.nano-btn:hover {
    background: var(--btn-color);
    color: #fff;
}

.logout {
    position: fixed;
    top: 20px;
    left: 20px;
    font-weight: bold;
    color: #939041;
    cursor: pointer;
}

.logout-btn{
    position: absolute;
    top: 20px;
    right: 20px;
    margin: 0;
    padding: 8px 15px;
}
a{
    cursor: pointer;
    color: #0b67c1;
    font-weight: bold;
    margin:  auto;
    display:inline-block
}
</style>