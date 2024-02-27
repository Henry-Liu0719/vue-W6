<template>
  <h1>後台產品列表</h1>
  <div>
    {{ id }}
  </div>
</template>
<script>
  export default{
    data(){
      return{
        id:this.$route.params.id
      }
    }
  }
</script>