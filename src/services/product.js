import axios from 'axios';
import { IMPORT_PRODUCT_URL, CHECK_STATUS_URL } from '../share/constant';
import {Auth} from "./auth";
export class Product {
    static checkStatusImport() {
        return axios.get(CHECK_STATUS_URL)
    }
    static importProduct (files){
        var data = new FormData();
        data.append('file', files);
        data.append('isOverwriteFile', '1');
        data.append('isOverwriteProduct', '1')
        const token = Auth.getTokenStorage()
        if(!token && !token.accessToken) return  
        return axios({
            method: "POST",
            url:IMPORT_PRODUCT_URL,
            processData: false,
            contentType: false,
            data: data,
            headers: {
                "x-qhome-token": token.accessToken
            }
        })
    }
}
