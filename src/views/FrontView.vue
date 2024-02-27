<template>
  <h1>前台</h1>
    <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink> |
        <RouterLink to="/products">前台產品列表</RouterLink> | 
        <RouterLink to="/carts">前台購物車</RouterLink> | 
        <RouterLink to="/dashboard/carts">後台購物車列表</RouterLink> | 
        <RouterLink to="/login">登入</RouterLink>
      </nav> 
    </div>
  </header>
  <router-view></router-view>
</template>