import{_ as l,c as u,b as e,f as i,v as c,o as m}from"./index-DHBtjIOA.js";var p={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_PATH:"gobobofu",BASE_URL:"/vue-W6/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:d}=p,h={data(){return{userData:{username:"hungminliu@gmail.com",password:"a0961219"}}},mounted(){const s=document.cookie.replace(/(?:(?:^|.*;\s*)loginToken\s*\=\s*([^;]*).*$)|^.*$/,"$1");this.axios.defaults.headers.common.Authorization=s,this.checkLogin()},methods:{login(){this.axios.post(`${d}/admin/signin`,this.userData).then(s=>{const{token:o,expired:n}=s.data;document.cookie.replace(/(?:(?:^|.*;\s*)loginToken\s*\=\s*([^;]*).*$)|^.*$/,"$1")!=="true"&&(document.cookie=`loginToken=${o}; expires=${new Date(n)}; path=/`),this.$router.push("/dashboard/carts")}).catch(s=>{alert(s.response.data.error.message)})},checkLogin(){this.axios.post(`${d}/api/user/check`).then(s=>{alert("已登入，自動跳轉到後台"),this.$router.push("/dashboard/carts")}).catch(s=>{console.dir(s)})}}},_={id:"app"},f={class:"container"},g={class:"row justify-content-center"},b={class:"col-8"},k={id:"form",class:"form-signin"},v={class:"form-floating mb-3"},w=e("label",{for:"username"},"Email address",-1),x={class:"form-floating"},D=e("label",{for:"password"},"Password",-1),$=e("p",{class:"mt-5 mb-3 text-muted"},"© 2021~∞ - 六角學院",-1);function T(s,o,n,E,a,r){return m(),u("div",_,[e("div",f,[e("div",g,[e("div",b,[e("form",k,[e("div",v,[i(e("input",{type:"email",class:"form-control",id:"username",placeholder:"name@example.com",required:"",autofocus:"","onUpdate:modelValue":o[0]||(o[0]=t=>a.userData.username=t)},null,512),[[c,a.userData.username]]),w]),e("div",x,[i(e("input",{type:"password",class:"form-control",id:"password",placeholder:"Password",required:"","onUpdate:modelValue":o[1]||(o[1]=t=>a.userData.password=t)},null,512),[[c,a.userData.password]]),D]),e("button",{class:"btn btn-lg btn-primary w-100 mt-3 loginBtn",type:"button",onClick:o[2]||(o[2]=(...t)=>r.login&&r.login(...t))}," 登入 ")])])]),$])])}const L=l(h,[["render",T]]);export{L as default};