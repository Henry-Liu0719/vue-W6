<template lang="">
    <div id="app">
      
      <loading-overlay :active="isLoading"></loading-overlay>
      <!-- <loading v-model:active="!isLoading"
                 :can-cancel="true"
                 :on-cancel="onCancel"
                 :is-full-page="fullPage"/> -->
      <user-product-modal
        :product="tempProduct"
        ref="userModal"
        @emit-modal-qty="addToCart"
      ></user-product-modal>
      <!-- {{this.products[2]}} -->
      <div class="container">
        <div class="mt-4">
          <div class="alert alert-primary position-fixed" role="alert" v-if="isCartAdded">
        {{ cartAddedMessage }}
      </div>
          <!-- 產品Modal -->

          <!-- 產品Modal -->

          <table class="table align-middle">
            <thead>
              <tr>
                <th>圖片</th>
                <th>商品名稱</th>
                <th>價格</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id">
                <td style="width: 200px">
                  <div
                    style="
                      height: 100px;
                      background-size: cover;
                      background-position: center;
                    "
                    :style="{'background-image': `url(${product.imageUrl})`}"
                  ></div>
                </td>
                <td>{{product.title }}</td>
                <td>
                  <del class="h6" v-if="product.origin_price != product.price"
                    >原價 {{product.origin_price }} 元</del
                  >
                  <div class="h5">現在只要 {{ product.price}} 元</div>
                </td>
                <td>
                  <div class="btn-group btn-group-sm">
                    <button
                      type="button"
                      class="btn btn-outline-secondary"
                      @click="openModal(product)"
                    >
                      <!-- <i class="fas fa-spinner fa-pulse" :style="{ opacity: isUpdating ? '1' : '0' }"></i> -->
                      查看更多
                    </button>
                    <i class="fas fa-spinner fa-pulse" :style="{ opacity: isUpdating ? '1' : '0' }"></i>
                    <button
                      type="button"
                      class="btn btn-outline-danger"
                      @click="addToCart(product.id)"
                      >
                      
                      加到購物車
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

      </div>
    </div>
  </div>
</template>
<script>
import UserProductModal from '@/components/UserProductModal.vue';
import axios from 'axios';

const {VITE_URL,VITE_PATH} = import.meta.env


export default {
  data() {
    return {
      products: [],
      carts: {},
      tempProduct: {},
      productModal: null,
      isLoading: true,
      isUpdating: true,
      isCartAdded: false,
      cartAddedMessage: '',
      qty:1,
      // orderData:{
      //   "data": {
      //     "user": {
      //       "name": "",
      //       "email": "",
      //       "tel": "",
      //       "address": ""
      //     },
      //     "message": ""
      //   }
      // },
      orderData:{
        "data": {
          "user": {
            "name": "test",
            "email": "test@gmail.com",
            "tel": "0912346768",
            "address": "kaohsiung"
          },
          "message": "這是留言"
        }
      },
    };
  },
  components: {
    UserProductModal
  },
  methods: {
    openModal(product) {
      this.tempProduct = product;
      this.$refs.userModal.open();
    },
    addToCart(id,value=1) {
      const data = {
        data: {
          product_id: id,
          qty: Number(value),
        },
      };
      // console.log(data);
      this.isUpdating = true;
      axios
        .post(`${VITE_URL}/api/${VITE_PATH}/cart`, data)
        .then((res) => {
          console.log(res);
          this.isUpdating = false;
          this.cartAddedMessage = `${res.data.data.product.title}加入購物車成功。`
          this.isCartAdded = true
          setTimeout(()=>{
            this.isCartAdded = false
          },3000);
          this.$refs.userModal.close();
          // this.getCarts();
        })
        .catch((error) => {
          console.dir(error);
        });
    },
    getAllProducts() {
      axios
        .get(`${VITE_URL}/api/${VITE_PATH}/products/all`)
        .then((res) => {
          // console.log(res);
          this.isLoading = false;
          this.isUpdating = false;
          this.products = res.data.products;
        })
        .catch((error) => {
          console.dir(error);
        });
    },
  },
  mounted() {
    this.getAllProducts();
  },  
}

</script>