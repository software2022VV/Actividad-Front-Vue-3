<template>
  <div class="container">
    <div class="card" style="margin-top:20px">
      <div class="card-header text-center">
        <h6>Welcome</h6>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HomeView',
  created: function () {
    this.getUser();
  }, methods: {
    getUser() {
      var token = localStorage.getItem('token')
      if (!token) {
        this.$router.push('/login');
      }
    },
  }
}
</script>
