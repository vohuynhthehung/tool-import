<template>
    <div id="app">
        <div class="wrapper">
            <div class="card">
                <Header />
                <h1>
                    HELLO VUE! - VERCEL OK
                </h1>
                <Form />
                <div v-if="!login">
                    <h1>Chưa Login</h1>
                </div>
                <div v-if="login">
                    <h1>Đã Login</h1>
                </div>

                <button @click="dangnhap" type="button" class="qhome-btn">Đăng nhập</button>

                <button @click="getList" type="button" class="qhome-btn">Lấy tất cả</button>
                <button @click="getOne" type="button" class="qhome-btn">Lấy một</button>
            </div>
        </div>
    </div>
</template>
<script>
import Header from "./components/Header.vue";
import Form from "./components/Form.vue";
import axios from 'axios';


export default {
    components: {
        Header,
        Form
    },
    data: function() {
        return {
            login: true
        }
    },
    methods: {
        getList: async function(e) {
            debugger;
            axios({
                "url": "https://nanostcktest.egany.com/api/campaigns?sort=-id&status=completed&limit=1&page=1",
                "method": "GET",
                "headers": {
                    "x-nanostick-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaG9wSWQiOiI1ZjZkNWY5YjA5N2ZiMjg0YWFkYjc3YTMiLCJpYXQiOjE2MDEwMDM0NjYsImV4cCI6MTYwMTI2MjY2Nn0.5npP9UfPOy9Dyowmz6avzocI1zaFopuve2ElIXIWcT4",
                    "cache-control": "no-cache",
                    "Postman-Token": "8e96cae6-01bd-4387-b2be-4976161bb7e2"
                }
            }).then(res => {
                console.log("thành công", res);
            }).catch(err => {
                //console.log("err here", JSON.parse(err));
                console.log("err here", err.response.data);
                console.log("có lỗi", err.response.data.message);
            });
        },

        getOne: async function(e) {
            debugger;
            console.log("đang chạy");
            axios({
                "url": "https://nanostcktest.egany.com/api/campaigns/5f6f79550c388a0018f96177",
                "method": "GET",
                "headers": {
                    "x-nanostick-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaG9wSWQiOiI1ZjY5YjVhYTY2N2Q5NTQ5M2E3Yjk1Y2UiLCJpYXQiOjE2MDA3NjM0NjUsImV4cCI6MTYwMTAyMjY2NX0.9bjD5AcMbsyX_ujQrvCaL33KHxwucKr1LffnE3ipoeI",
                    "cache-control": "no-cache",
                    "Postman-Token": "0e67938b-7491-4c0e-b87b-d03b52910039"
                }
            }).then(res => {
                console.log("thành công", res);
            }).catch(err => {
                //console.log("err here", JSON.parse(err));
                console.log("err here", err.response.data);
                console.log("có lỗi", err.response.data.message);
            });
        },

        dangnhap: function(e){
        	axios({
                "url": "https://nanostcktest.egany.com/api/auth/login",
"method": "POST",
"headers": {
    "Content-Type": "application/json",
    "cache-control": "no-cache",
    "Postman-Token": "8e6524fc-ad5b-4a18-9713-1616b512236c"
},
"processData": false,
"data": "{\n    \"code\": \"Ew3wt9A6InmCPA5OTsF7YBlZEUS28_Y5VgKsdzTLxhk\",\n    \"orgId\": \"1000074001\",\n    \"status\": \"login\"\n}"
            }).then(res => {
                console.log("đăng nhập thành công", res);
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
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    --ui-01: #f4f4ec;
    --base-color: #939041;
    --card-bg: #ffa600;
}

body {
    overflow-x: hidden;
}

.wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    background: var(--ui-01);
}

.card {
    max-width: 600px;
    background: var(--card-bg);
    width: 100%;
    padding: 20px;
    min-height: 40vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 8px;
    box-shadow: 0px 4rem 6rem rgba(16, 42, 67, 0.1);
}

.swal2-popup {
    font-family: Avenir, Helvetica, Arial, sans-serif;
}

.qhome-btn {
    display: inline-block;
    margin-top: 20px;
    padding: 10px 24px;
    text-decoration: none;
    color: var(--base-color);
    border: 2px solid var(--base-color);
    font-weight: bold;
    line-height: 1;
    border-radius: 4px;
    cursor: pointer;
    box-shadow: 0px 4rem 6rem rgba(16, 42, 67, 0.1);
    border-radius: 8px;
    font-size: 16px;
}

.qhome-btn:hover {
    background: var(--base-color);
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
</style>
