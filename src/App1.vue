<template>
  <div id="app">
    <div class="wrapper">
      <div class="card">
        <Header />
        <div v-if="!login">
          <a class="qhome-btn" @click="loginUrlShop">Đăng nhập</a>
        </div>
        <div v-if="login">
          <a @click="logOut" class="logout">Đăng xuất</a>
          <Form v-on:logOut="logOut" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueSweetalert2 from "vue-sweetalert2";

import Header from "./components/Header.vue";
import Form from "./components/Form.vue";
import { Auth } from "./services/auth";
import { LocalStorage } from "./services/localstorage";
import { APP_ORGID } from "./share/constant";

const getQuery = (queryString, key) => {
  queryString = queryString.split("&");
  let value = queryString.find(query => query.indexOf(key) !== -1);
  if (value) {
    return value.split("=")[1];
  } else {
    return "";
  }
};
const options = {
  confirmButtonColor: "#939041",
  cancelButtonColor: "#ff7674"
};
Vue.use(VueSweetalert2, options);
export default {
  name: "App",
  components: {
    Header,
    Form
  },
  data: function() {
    return {
      logo: require("./assets/logo.png"),
      login: false
    };
  },
  methods: {
    loginShop: Auth.loginShop,
    loginUrlShop: function() {
      window.location = APP_ORGID;
    },
    loginFromUrl (code, orgid)  {
      const _this = this;
      Auth.login(code, orgid)
        .then(res => {
          location.search = "";
          let data = res.data;
          data.exp = data.exp * 1000;
          LocalStorage.setObjectItem("qhome", res.data);
        })
        .catch(err => {
          this.$swal({
            title: "",
            html: err.response.data.message,
            icon: "error",
            confirmButtonText: "Đóng",
            onClose: _this.logOut
          });
        });
    },
    logOut: function() {
      location.search = "";
      localStorage.removeItem("qhome");
      this.login = false;
    }
  },
  mounted: function() {
    let loginQuery = decodeURIComponent(location.search).substring(1);
    if (loginQuery.length) {
      let status = getQuery(loginQuery, "status");
      if (status && status === "error") {
        let message = getQuery(loginQuery, "message");
        if (message === "not-permisson") {
          message = "Bạn không có quyền truy cập";
        } else {
          message = "Đã có lỗi xảy ra ";
        }
        this.$swal({
          title: "",
          html: message,
          icon: "error",
          confirmButtonText: "Đóng",
          onClose: this.logOut
        });
        return;
      }
      let code = getQuery(loginQuery, "code");
      let orgid = getQuery(loginQuery, "orgid");
      this.loginFromUrl(code, orgid);
      return;
    }
    const isTokenExpired = Auth.isTokenExpired();
    if (!isTokenExpired) {
      this.login = true;
    }
  }
};
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
  background: #ffff;
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
