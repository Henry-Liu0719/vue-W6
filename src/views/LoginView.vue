<template>
<div id="app">
  <div class="container">
    <div class="row justify-content-center">
      <!-- <h1 class="h3 mb-3 font-weight-normal">請先登入</h1> -->
      <div class="col-8">
        <form id="form" class="form-signin">
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="username"
              placeholder="name@example.com"
              required
              autofocus
              v-model="userData.username"
            />
            <label for="username">Email address</label>
          </div>
          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              required
              v-model="userData.password"
            />
            <label for="password">Password</label>
          </div>
          <button
            class="btn btn-lg btn-primary w-100 mt-3 loginBtn"
            type="button"
            @click="login"
          >
            登入
          </button>
        </form>
      </div>
    </div>
    <p class="mt-5 mb-3 text-muted">&copy; 2021~∞ - 六角學院</p>
  </div>
</div>
</template>

<script>
  const {VITE_URL}=import.meta.env
  export default{
    data() {
      return {
        "userData":{
          // "username": "",
          // "password": "",
          "username": "hungminliu@gmail.com",
          "password": "a0961219",
        },
      }
    },
    mounted(){
      // console.log(import.meta.env);
      
      const loginToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)loginToken\s*\=\s*([^;]*).*$)|^.*$/,"$1",
      );
      this.axios.defaults.headers.common['Authorization'] = loginToken;
      this.checkLogin();
    },
    methods:{
      login(){
        this.axios.post(`${VITE_URL}/admin/signin`,this.userData)
        .then(res=>{
          const {token,expired}=res.data;
          if (document.cookie.replace(/(?:(?:^|.*;\s*)loginToken\s*\=\s*([^;]*).*$)|^.*$/, "$1") !== "true") {
          document.cookie = `loginToken=${token}; expires=${new Date(expired)}; path=/`;
        }
          // console.log(res);
          this.$router.push('/dashboard/carts')
        })  
        .catch(err=>{
          // console.dir();
          alert(err.response.data.error.message)
        })
      },
      checkLogin(){
        this.axios.post(`${VITE_URL}/api/user/check`)
        .then(res=>{
          // console.log(res);
          alert('已登入，自動跳轉到後台');
          this.$router.push('/dashboard/carts')
        })  
        .catch(err=>{
          console.dir(err);
        })
      }
    },
  }
</script>