<template>
  <div class="container-fluid ps-0">
    <div class="row">
      <div class="col-2">
        <AdminNavbar />
      </div>
      <div class="col-10">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import AdminNavbar from '@/components/AdminNavbar.vue'
export default {
  components: {
    AdminNavbar
  }
}
</script>
