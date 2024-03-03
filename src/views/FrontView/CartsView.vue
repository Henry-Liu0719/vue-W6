<template>
  <h1>購物車</h1>
  <div id="app">
    <!-- {{ carts.carts[1] }} -->
    <loading-overlay :active="isLoading"></loading-overlay>
    <!-- 購物車列表 -->
    <div class="text-end">
      <button
        class="btn btn-outline-danger"
        type="button"
        @click="deleteCarts()"
        :disabled="isLoading"
      >
        清空購物車
      </button>
    </div>
    <table class="table align-middle">
      <!-- {{carts}} -->
      <thead>
        <tr>
          <th class="col-1"></th>
          <th class="col-5">品名</th>
          <th class="col-2">數量/單位</th>
          <th class="col-4">單價</th>
        </tr>
      </thead>
      <tbody v-if="this.carts.carts">
        <template
          v-for="cart in carts.carts"
          :key="cart.id"
        >
          <tr>
            <td>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="deleteCart(cart.id)"
                :disabled="isUpdating"
              >
                <i class="fas fa-spinner fa-pulse" v-if="isUpdating"></i>
                x
              </button>
            </td>
            <td>
              {{ cart.product.title}}
              <div class="text-success">已套用優惠券</div>
            </td>
            <td>
              <div class="input-group input-group-sm">
                <div class="input-group mb-3">
                  <button
                    type="button"
                    class="btn btn-outline-primary"
                    @click="cart.qty--;updateCart(cart,cart.qty)"
                    :disabled="cart.qty == 1"
                  >
                    -
                  </button>
                  <!-- <div class="mx-a">

                  </div> -->
                    <input
                      min="1"
                      type="number"
                      class="form-control"
                      v-model="cart.qty"
                      readonly
                    />
                  <button
                    type="button"
                    class="btn btn-outline-primary"
                    @click="cart.qty++;updateCart(cart,cart.qty)"
                  >
                    +
                  </button>
                  <span class="input-group-text" id="basic-addon2"
                    >{{ cart.product.unit}}</span
                  >
                </div>
              </div>
            </td>
            <td class="">
              <small class="text-success">折扣價：</small>
              {{ cart.final_total}}
            </td>
          </tr>
        </template>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" class="text-end">總計</td>
          <td class="">{{ carts.total}}</td>
        </tr>
        <tr>
          <td colspan="3" class="text-end text-success">折扣價</td>
          <td class=" text-success">{{carts.final_total }}</td>
        </tr>
      </tfoot>
    </table>
  <div class="my-5 row justify-content-center" style="margin-right: 0;">
    <v-form ref="form" class="col-md-6" v-slot="{ errors }">
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <v-field
          id="email"
          name="email"
          type="email"
          class="form-control"
          :class="{ 'is-invalid': errors['email'] }"
          placeholder="請輸入 Email"
          rules="email|required"
          v-model="orderData.data.user.email"
        ></v-field>
        <error-message
          name="email"
          class="invalid-feedback"
        ></error-message>
      </div>

      <div class="mb-3">
        <label for="name" class="form-label">收件人姓名</label>
        <v-field
          id="name"
          name="姓名"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors['姓名'] }"
          placeholder="請輸入姓名"
          rules="required"
          v-model="orderData.data.user.name"
        ></v-field>
        <error-message
          name="姓名"
          class="invalid-feedback"
        ></error-message>
      </div>

      <div class="mb-3">
        <label for="tel" class="form-label">收件人電話</label>
        <v-field
          id="tel"
          name="電話"
          type="tel"
          class="form-control"
          :class="{ 'is-invalid': errors['電話'] }"
          placeholder="請輸入電話"
          :rules="isPhone"
          v-model="orderData.data.user.tel"
        ></v-field>
        <error-message
          name="電話"
          class="invalid-feedback"
        ></error-message>
      </div>

      <div class="mb-3">
        <label for="address" class="form-label">收件人地址</label>
        <v-field
          id="address"
          name="地址"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors['地址'] }"
          placeholder="請輸入地址"
          rules="required"
          v-model="orderData.data.user.address"
        ></v-field>
        <error-message
          name="地址"
          class="invalid-feedback"
        ></error-message>
      </div>

      <div class="mb-3">
        <label for="message" class="form-label">留言</label>
        <textarea id="message" class="form-control" cols="30" rows="10" v-model="orderData.data.message">
</textarea
        >
      </div>
      <div class="text-end">
        <button
          type="button"
          class="btn btn-danger"
          @click="postOrder"
          :disabled="carts.carts==''"
        >
          {{carts.carts==''?'購物車無商品':'送出訂單'}}
        </button>
      </div>
    </v-form>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

const {VITE_URL,VITE_PATH} = import.meta.env
import {debounce,throttle} from 'lodash';
import _ from 'lodash';

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
    // UserProductModal
  },
  methods: {
    postOrder(){
      const data={...this.orderData};
      console.log(data);
      // axios
      //   .post(`${VITE_URL}/api/${VITE_PATH}/order`,data)
      //   .then((res) => {
      //     // console.log(res);
      //     alert(res.data.message);
      //     // deleteCarts();
      //     window.location = '/'
      //     // getCarts();
      //   })
      //   .catch((error) => {
      //     console.dir(error);
      //   });      
    },
    getCarts() {
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
          this.getCarts();
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
          this.getCarts();
          alert("購物車已清空");
          // this.carts = res.data.data;
        })
        .catch((error) => {
          console.dir(error);
        });
    },
    updateCart:debounce(function(cart, qty){
      console.log(cart,qty);
      const data = {
        data: {
          product_id: cart.product_id,
          qty: Number(qty),
        },
      };
      this.isUpdating = true;
      axios
        .put(`${VITE_URL}/api/${VITE_PATH}/cart/${cart.id}`, data)
        .then((res) => {
          // console.log(res);
          this.getCarts();
          // this.carts = res.data.data;
        })
        .catch((error) => {
          console.dir(error);
        });
    },500) ,
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
          // console.log(res);
          
          this.$refs.userModal.close();
          this.getCarts();
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
    // minLength8(value) {
    // // 檢查字串長度是否大於等於8
    //   return value.length >= 8?true:'電話須超過8碼';
    // },
    // isPhoneOrMinLength8(value) {
    //   // 使用 || 运算符组合两个条件
    //   if(value.length < 8)return '電話須超過8碼'
    //   return this.isPhone(value)==true || this.minLength8(value)==true?true:'需要正確的電話號碼';
    // },
  },
  mounted() {
    this.getCarts();
  },  
}

</script>