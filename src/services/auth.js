import axios from 'axios';
import { LocalStorage } from './localstorage'
import { LOGIN_URL } from '../share/constant';

export class Auth {
    static loginShop() {
        return axios.get(LOGIN_URL)
    }
    static getTokenStorage() {
        return LocalStorage.getObjectItem('qhome')
    }
    static isTokenExpired() {
        const session = this.getTokenStorage('qhome');
        if (session) {
            const now = new Date().getTime();
            if (now < +session.exp) return false;
        }
        return true;
    }

    static login111(code, orgid) {
        const data = {
            code,
            orgid,
            status: 'login'
        }

        return axios({
            method: 'post',
            url: LOGIN_URL,
            data: data,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }


    static login(code, orgId) {
        const data = {
            code,
            orgId,
            status: 'login'
        }
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
        })
    }


}