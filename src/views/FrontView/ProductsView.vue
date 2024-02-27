<template lang="">
    <div id="app">
      <loading :active="isLoading"></loading>
      <!-- <loading v-model:active="!isLoading"
                 :can-cancel="true"
                 :on-cancel="onCancel"
                 :is-full-page="fullPage"/> -->
      <user-modal
        :product="tempProduct"
        ref="userModal"
        @emit-modal-qty="addToCart"
      ></user-modal>
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
                <th></th>
                <th>品名</th>
                <th style="width: 150px">數量/單位</th>
                <th>單價</th>
              </tr>
            </thead>
            <tbody>
              <template
                v-if="this.carts.carts"
                v-for="(cart,index) in carts.carts"
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
                  <td class="text-end">
                    <small class="text-success">折扣價：</small>
                    {{ cart.final_total}}
                  </td>
                </tr>
              </template>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" class="text-end">總計</td>
                <td class="text-end">{{ carts.total}}</td>
              </tr>
              <tr>
                <td colspan="3" class="text-end text-success">折扣價</td>
                <td class="text-end text-success">{{carts.final_total }}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div class="my-5 row justify-content-center">
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
                :rules="minLength8"
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
              <textarea id="message" class="form-control" cols="30" rows="10">
{{orderData.data.message}}</textarea
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
    </div>
</template>
<script>
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
      orderData:{
        "data": {
          "user": {
            "name": "",
            "email": "",
            "tel": "",
            "address": ""
          },
          "message": ""
        }
      },
      // orderData:{
      //   "data": {
      //     "user": {
      //       "name": "test",
      //       "email": "test@gmail.com",
      //       "tel": "0912346768",
      //       "address": "kaohsiung"
      //     },
      //     "message": "這是留言"
      //   }
      // },
    };
  },
  components: {
    userModal,
  },
  methods: {
    postOrder(){
      const data=this.orderData;
      // console.log(data);
      axios
        .post(`${baseURL}/v2/api/${path}/order`,data)
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
        .get(`${baseURL}/v2/api/${path}/cart`)
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
        .delete(`${baseURL}/v2/api/${path}/cart/${id}`)
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
        .delete(`${baseURL}/v2/api/${path}/carts`)
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
        .put(`${baseURL}/v2/api/${path}/cart/${cart.id}`, data)
        .then((res) => {
          // console.log(res);
          this.getCart();
          // this.carts = res.data.data;
        })
        .catch((error) => {
          console.dir(error);
        });
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
        .post(`${baseURL}/v2/api/${path}/cart`, data)
        .then((res) => {
          // console.log(res);
          
          this.$refs.userModal.close();
          this.getCart();
        })
        .catch((error) => {
          console.dir(error);
        });
    },
    getAllProducts() {
      axios
        .get(`${baseURL}/v2/api/${path}/products/all`)
        .then((res) => {
          // console.log(res);
          this.isLoading = false;
          this.products = res.data.products;
        })
        .catch((error) => {
          console.dir(error);
        });
    },
    // isPhone(value) {
    // const phoneNumber = /^(09)[0-9]{8}$/
    // return phoneNumber.test(value) ? true : '需要正確的電話號碼'
    // },
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
<style lang="">
  
</style>