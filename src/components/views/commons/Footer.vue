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
