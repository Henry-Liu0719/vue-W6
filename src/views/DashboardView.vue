<template>
  <h1>後台</h1>
    <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">回到前台</RouterLink> |
        <RouterLink to="/dashboard/products">後台產品列表</RouterLink> | 
        <RouterLink to="/dashboard/orders">後台訂單</RouterLink> | 
        <RouterLink to="" @click="logout">登出</RouterLink>
      </nav> 
    </div>
  </header>
  <router-view></router-view>
</template>

<script>
    export default{
    data() {
      return {
        VITE_URL:''
      }
    },
    mounted(){
      // console.log(import.meta.env);
      const {VITE_URL,VITE_PATH}=import.meta.env
      this.VITE_URL = VITE_URL
      const loginToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)loginToken\s*\=\s*([^;]*).*$)|^.*$/,"$1",
      );
      this.axios.defaults.headers.common['Authorization'] = loginToken;
      this.checkLogin();
    },
    methods:{
      logout(){
        this.axios.post(`${this.VITE_URL}/logout`)
        .then(res=>{
          // console.log(res);
          alert(res.data.message);
          this.$router.push('/')
        })  
        .catch(err=>{
          console.dir(err);
          alert(err.response.data.error.message)
        })
      },
      checkLogin(){
        this.axios.post(`${this.VITE_URL}/api/user/check`)
        .then(res=>{
          // console.log(res);
          // this.$router.push('/')
        })  
        .catch(err=>{
          console.dir(err);
          this.$router.push('/login')
          alert(err.response.data.message)
        })
      }
    },
  }
</script>