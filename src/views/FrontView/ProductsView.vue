<template>
      <div class="container">
        <div class="text-end mt-4">
          <button class="btn btn-primary" @click="openModal('new',{})">
            建立新的產品
          </button>
        </div>
        <table class="table mt-4">
          <thead>
            <tr>
              <th width="120">分類</th>
              <th>產品名稱</th>
              <th width="120">原價</th>
              <th width="120">售價</th>
              <th width="100">是否啟用</th>
              <th width="120">編輯</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="item in products" :key="item.id">
              <tr>
                <td>{{item.category}}</td>
                <td>{{item.title}}</td>
                <td class="text-end">{{item.origin_price}}</td>
                <td class="text-end">{{item.price}}</td>
                <td>
                  <span class="text-success" v-if="item.is_enabled == 1"
                    >啟用</span
                  >
                  <span v-else>未啟用</span>
                </td>
                <td>
                  <div class="btn-group">
                    <button
                      type="button"
                      class="btn btn-outline-primary btn-sm"
                      @click="openModal('edit',item)"
                    >
                      編輯
                    </button>
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm"
                      @click="openModal('delete',item)"
                    >
                      刪除
                    </button>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
        <pagination-component-vue :pagination="pagination" :get-products='getProducts'></pagination-component-vue>
      </div>
      <!-- Modal -->
      <product-modal
        :temp="temp"
        :update-product="updateProduct"
        :upload-photo="uploadPhoto"
        ref="pModal"
        ></product-modal>
      <del-product-modal
        :temp="temp"
        :delete-product="deleteProduct"
        ref="dModal"
        ></del-product-modal>






</template>
<script>
import axios from 'axios';
import PaginationComponentVue from '@/components/PaginationComponent.vue';
const {VITE_URL,VITE_PATH}=import.meta.env

  export default{
    data() {
      return {
        products: [],
        temp:{},
        productModal:null,
        delProductModal:null,
        pagination:{},

      }
    },
    // components:{
    //   pagination,productModal,delProductModal
    // },
    components:{
      PaginationComponentVue
    },
		mounted(){
      this.getProducts();
      // console.log(this.$refs);
      //build modal
      // console.log(this.$refs);
      // this.productModal = new bootstrap.Modal(this.$refs.productModal);
      // this.delProductModal = new bootstrap.Modal(this.$refs.delProductModal);

    },
    methods: {
      deleteProduct(){
        axios
          .delete(`${VITE_URL}/api/${VITE_PATH}/admin/product/${this.temp.id}`)
          .then((res) => {
            console.log(res);
            // alert('刪除成功');
            // window.location = './product.html';
            // this.products = res.data.products;
            this.getProducts();
            // this.delProductModal.hide();
            this.$refs.dModal.closeModal();
          }).catch((error) => {
            console.dir(error);
            alert(error.response);
          })
      },
      getProducts(page = 1){
          axios
          .get(
            `${VITE_URL}/api/${VITE_PATH}/products`
          )
          .then((res) => {
            console.log(res.data);
            this.products = res.data.products;
            this.pagination = res.data.pagination;
          }).catch((error) => {
            console.log(error.response);
            alert(error.response);
        })
      },
      updateProduct(){
        if(this.temp.isNew){

          axios
          .post(`${VITE_URL}/api/${VITE_PATH}/admin/product`, {'data':this.temp})
          .then((res) => {
            console.log(res);
            // this.products = res.data.products;
            this.getProducts();
            // this.productModal.hide();
            this.$refs.pModal.closeModal();
            // alert('修改成功');
            // window.location = './product.html';
          }).catch((error) => {
            console.dir(error);
          })
        }else{
          axios
          .put(`${VITE_URL}/api/${VITE_PATH}/admin/product/${this.temp.id}`, {'data':this.temp})
          .then((res) => {
            console.log(res);
            this.getProducts();
            // this.productModal.hide();
            this.$refs.pModal.closeModal();
            // this.products = res.data.products;
            // alert('新增成功');
            // window.location = './product.html';
          }).catch((error) => {
            console.dir(error);
          })
        }
      },
      uploadPhoto(){
        console.log('uploadPhoto');
        const formData = new FormData();
        formData.append('file-to-upload', document.getElementById('fileInput').files[0]);
        console.log(formData);
        axios
          .post(`${VITE_URL}/api/${VITE_PATH}/admin/upload`, formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
            }})
          .then((res) => {
            console.log(res.data.imageUrl);
            if(this.temp.imagesUrl[this.temp.imagesUrl.length-1]==''){
              this.temp.imagesUrl[this.temp.imagesUrl.length-1]=res.data.imageUrl
            }else{
              this.temp.imagesUrl.push(res.data.imageUrl)
            }
            // this.products = res.data.products;
            // this.getProducts();
            // this.productModal.hide();
            // this.$refs.pModal.closeModal();
            // alert('修改成功');
            // window.location = './product.html';
          }).catch((error) => {
            console.dir(error);
          })
      },
      openModal(status,product){
        if(status == 'new'){
          this.temp = {
            imagesUrl : [],
            isNew : true
          }
          // this.temp = {
          //   rating:10,
          //   isNew : true,
          //   category: "甜甜圈",
          //   content: "尺寸：14x14cm",
          //   description: "濃郁的草莓風味，中心填入滑順不膩口的卡士達內餡，帶來滿滿幸福感！",
          //   is_enabled: 1,
          //   origin_price: 150,
          //   price: 99,
          //   title: "草莓莓果夾心圈",
          //   unit: "個",
          //   num: 10,
          //   imageUrl: "https://images.unsplash.com/photo-1583182332473-b31ba08929c8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzR8fGRvbnV0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
          //   imagesUrl: [
          //     "https://images.unsplash.com/photo-1626094309830-abbb0c99da4a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2832&q=80",
          //     "https://images.unsplash.com/photo-1559656914-a30970c1affd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTY0fHxkb251dHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"
          //   ]
          // }

          // this.productModal.show();
          this.$refs.pModal.openModal();
        }else if(status == 'edit'){
          this.temp = {...product}
          if(!Array.isArray(this.temp.imagesUrl)){
            this.temp.imagesUrl = [];
          }
          // this.productModal.show();
          this.$refs.pModal.openModal();
        }else if(status == 'delete'){
          this.temp = {...product}
          // this.delProductModal.show();
          this.$refs.dModal.openModal();
        }
      }
      
    }
  }
</script>