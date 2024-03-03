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
                      <i class="fas fa-spinner fa-pulse" v-if="isUpdating"></i>
                      查看更多
                    </button>
                    <button
                      type="button"
                      class="btn btn-outline-danger"
                      @click="addToCart(product.id)"
                    >
                      <i class="fas fa-spinner fa-pulse" v-if="isUpdating"></i>
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
    postOrder(){
      const data=this.orderData;
      // console.log(data);
      axios
        .post(`${VITE_URL}/api/${VITE_PATH}/order`,data)
        .then((res) => {
          // console.log(res);
          alert(res.data.message);
          // deleteCarts();
          window.location = '/'
          // getCart();
        })
        .catch((error) => {
          console.dir(error);
        });      
    },
    openModal(product) {
      this.tempProduct = product;
      this.$refs.userModal.open();
      // console.log(this.tempProduct.title);
    },
    getCart() {
      axios
        .get(`${VITE_URL}/api/${VITE_PATH}/cart`)
        .then((res) => {
          // console.log(res);
          this.carts = res.data.data;
          this.isLoading = false;
          this.isUpdating = false;
        })
        .catch((error) => {
          console.dir(error);
        });
    },
    deleteCart(id) {
      // console.log(id);
      this.isUpdating = true;
      axios
        .delete(`${VITE_URL}/api/${VITE_PATH}/cart/${id}`)
        .then((res) => {
          // console.log(res);
          this.getCart();
          // this.carts = res.data.data;
        })
        .catch((error) => {
          console.dir(error);
        });
    },
    deleteCarts() {
      this.isLoading = true;
      axios
        .delete(`${VITE_URL}/api/${VITE_PATH}/carts`)
        .then((res) => {
          // console.log(res);
          this.getCart();
          alert("購物車已清空");
          // this.carts = res.data.data;
        })
        .catch((error) => {
          console.dir(error);
        });
    },
    updateCart(cart, qty) {
      // console.log(id);
      const data = {
        data: {
          product_id: cart.product_id,
          qty: Number(qty),
        },
      };
      // console.log(data.data.product_id);
      this.isUpdating = true;
      axios
        .put(`${VITE_URL}/api/${VITE_PATH}/cart/${cart.id}`, data)
        .then((res) => {
          // console.log(res);
          this.getCart();
          // this.carts = res.data.data;
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
          this.products = res.data.products;
        })
        .catch((error) => {
          console.dir(error);
        });
    },
    isPhone(value) {
    const phoneNumber = /^(09)[0-9]{8}$/
    return phoneNumber.test(value) ? true : '需要正確的電話號碼'
    },
    minLength8(value) {
    // 檢查字串長度是否大於等於8
      return value.length >= 8?true:'電話須超過8碼';
    },
    // isPhoneOrMinLength8(value) {
    //   // 使用 || 运算符组合两个条件
    //   if(value.length < 8)return '電話須超過8碼'
    //   return this.isPhone(value)==true || this.minLength8(value)==true?true:'需要正確的電話號碼';
    // },
  },
  mounted() {
    this.getAllProducts();
    this.getCart();
    // console.log(VueLoading);
  },  
}

</script>