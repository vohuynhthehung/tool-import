<template>
  <form id="import-product" v-on:submit="submit">
  	  	<input
          @change="testFile"
          value="files"
          name="file"
          id="product_file111"
          type="file"
          accept=".xlsx"
          class="ega-form-control"
        />
        <b>Nhập file TESST</b>

  	<input
          @change="handleProductFile"
          value="files"
          name="file"
          id="product_file"
          type="file"
          accept=".xlsx"
          class="ega-form-control"
        />
        <b>Nhập file product.xlsx (*.xlsx)</b>

    <input
          @change="handleSKUFile"
          value="files"
          name="file"
          id="sku_file"
          type="file"
          accept=".xlsx"
          class="ega-form-control"
        />
        <b>Nhập file sku-code-manager.xlsx (*.xlsx)</b>

    <input
          @change="handleVariantFile"
          value="files"
          name="file"
          id="variant_file"
          type="file"
          accept=".xlsx"
          class="ega-form-control"
        />
        <b>Nhập file variant-manager.xlsx (*.xlsx)</b>

        <button type="submit" class="qhome-btn">Nhập sản phẩm</button>


  </form>

</template>

<script>
	import axios from 'axios';
	export default {
		name: "Form",
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
				//if(this.files){
					var data = new FormData();
       				data.append('product_file', this.pd_files);
       				data.append('sku_code_file', this.sku_files);
       				data.append('variant_file', this.variant_files);
       				data.append("title", "upload from app");


					/*var data = new FormData();
					data.append('file', this.files);
					data.append('isOverwriteFile', '1');
					data.append('isOverwriteProduct', '1')


       				console.log("this file?",this.files)
       				console.log("data?",data)*/



       				var accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaG9wSWQiOiI1ZjZkNWY5YjA5N2ZiMjg0YWFkYjc3YTMiLCJpYXQiOjE2MDEwMDM0NjYsImV4cCI6MTYwMTI2MjY2Nn0.5npP9UfPOy9Dyowmz6avzocI1zaFopuve2ElIXIWcT4";
					axios({
						"async": true,
  						"crossDomain": true,
						method: "POST",
						url:"https://nanostcktest.egany.com/api/campaigns",
						data: data,
						headers: {
						    "x-nanostick-token": accessToken
						},
						"processData": false,
						"contentType": false,
						"mimeType": "multipart/form-data"
					}).then(res => {
						console.log("thành công");
					}).catch(err =>{
						//console.log("err here", JSON.parse(err));
						console.log("err here", err.response.data);
						console.log("có lỗi", err.response.data.message);
					});


				//}
			}

			
		}
	}
</script>