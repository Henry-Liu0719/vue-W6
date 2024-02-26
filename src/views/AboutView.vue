<template>
  <div class="about">
    <h1 class="">This is an about page</h1>
    <button class="btn btn-primary">button</button>
  </div>
  <LoadingOverlay :active="isLoading"></LoadingOverlay>
</template>

<script>
  export default{
    data(){
      return{
        isLoading:true,
      }
    },
    mounted(){
      setTimeout(()=>{
        this.isLoading = false;
      },500)
      // this.getPokemon();
    },
    methods:{
      getPokemon(){
        this.axios.get('https://pokeapi.co/api/v2/pokemon/ditto')
        .then(res=>{
          console.log(res);
        })
      }
    }
  }
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
