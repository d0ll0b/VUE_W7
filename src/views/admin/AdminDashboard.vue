<template>
    <AdminNavbar />
    <router-view />
</template>

<script>
import AdminNavbar from '@/components/AdminNavbar.vue'
export default {
  components: {
    AdminNavbar
  }
}
</script>
