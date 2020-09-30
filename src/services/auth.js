export class Auth {
    static getAccessToken() {
        const data_login = JSON.parse(localStorage.getItem("data_login"));
        if(data_login){
            return data_login.accessToken;
        }
    }

    static isExpToken(){
        const data_login = JSON.parse(localStorage.getItem("data_login"));
        if(data_login){
            const now = new Date().getTime();
            if (now < data_login.exp) return false;
        }
        return true;
    }
}