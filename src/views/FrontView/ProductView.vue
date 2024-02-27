<template>
  <h1>產品頁</h1>
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