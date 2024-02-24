<template>
  <div class="container-fluid ps-0">
    <div class="row">
      <div class="col-4">
        <AdminNavbar />
      </div>
      <div class="col-8">
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
