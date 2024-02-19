<template>
    <h1>後台導覽列</h1>
    <nav>
        <RouterLink to="/">返回前台</RouterLink> |
        <RouterLink to="/admin/products">產品列表</RouterLink> |
        <RouterLink to="/admin/orders">訂單列表</RouterLink> |
        <!-- <a href="#" @click.prevent="signout">登出</a> -->
    </nav>
    <!-- <RouterView v-if="isLogin"/> -->
</template>
