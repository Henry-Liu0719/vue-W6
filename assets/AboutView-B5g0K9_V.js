import{_ as s,c as n,a as i,F as c,b as e,r,o as l}from"./index-XsJw2mcj.js";const p={data(){return{isLoading:!0}},mounted(){setTimeout(()=>{this.isLoading=!1},500)},methods:{getPokemon(){this.axios.get("https://pokeapi.co/api/v2/pokemon/ditto").then(o=>{console.log(o)})}}},d=e("div",{class:"about"},[e("h1",{class:""},"This is an about page"),e("button",{class:"btn btn-primary"},"button")],-1);function u(o,m,_,g,t,h){const a=r("LoadingOverlay");return l(),n(c,null,[d,i(a,{active:t.isLoading},null,8,["active"])],64)}const f=s(p,[["render",u]]);export{f as default};