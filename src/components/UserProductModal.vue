<template lang="">
  <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <!-- {{product}} -->
            <span>{{ product.title }}</span>
        </h5>
          <button type="button" class="btn-close"
                  data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-6">
              <img class="img-fluid" :src="product.imageUrl" alt="">
        </div>
            <div class="col-sm-6">
              <span class="badge bg-primary rounded-pill">{{  }}</span>
              <p>商品描述：{{ product.description }}</p>
              <p>商品內容：{{ product.content }}</p>
              <del class="h6" v-if="product.origin_price
              != product.price">原價 {{ product.origin_price}} 元</del>
              <div class="h5">現在只要 {{ product.price }} 元</div>
              <div>
                <div class="input-group">
                  <input type="number" class="form-control"
                          min="1" v-model="modalQty" >
                  <button type="button" class="btn btn-primary" @click="addToCart(product.id,modalQty)">加入購物車</button>
        </div>
        </div>
        </div>
            <!-- col-sm-6 end -->
        </div>
        </div>
        </div>
        </div>
        </div>
</template>
<script>
import { Modal } from 'bootstrap';

export default {
  data() {
    return {
      productModal: null,
      modalQty:1,
    };
  },
  props: ["product"],
  mounted() {
    this.productModal = new Modal(this.$refs.modal);
  },
  methods: {
    open() {
      this.modalQty = 1;
      this.productModal.show();
    },
    close() {
      this.productModal.hide();
    },
    addToCart(productId,value){
      // console.log('modaladdToCart');
      // console.log(productId,value);
      this.$emit('emit-modalQty',productId,value);
    }
  },  
}
</script>
<style lang="">
  
</style>