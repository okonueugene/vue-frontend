<template>
  <footer class="sticky-footer bg-white">
    <div class="container my-auto">
      <div class="copyright text-center my-auto">
        <span>Copyright &copy; Library {{ year }}</span>
      </div>
    </div>
  </footer>
</template>

<script>
//populate the span tag with Copyright &copy; Library year
export default {
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>

<style scoped>
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #f8f9fc;
  color: #000;
  text-align: center;
}

.footer p {
  margin: 0;
  padding: 10px;
}

.footer a {
  color: #000;
  text-decoration: none;
  font-weight: bold;
}

.footer a:hover {
  color: #000;
  text-decoration: none;
  font-weight: bold;
}

.footer .footer-bottom {
  background-color: #f8f9fc;
  padding: 10px 0;
}

.footer .footer-bottom p {
  margin-bottom: 0;
  padding: 0;
}
</style>
