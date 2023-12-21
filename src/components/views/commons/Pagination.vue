<template>
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="previousPage()"
        >
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Previous</span>
        </a>
      </li>
      <li
        v-for="page in totalPages"
        :key="page"
        class="page-item"
        :class="{ active: currentPage === page }"
      >
        <a class="page-link" href="#" @click.prevent="changePage(page)">{{
          page
        }}</a>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="nextPage()"
          ><span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Next</span></a
        >
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  props: {
    totalPages: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  methods: {
    changePage(page) {
      this.$emit("changePage", page);
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.$emit("previousPage");
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.$emit("nextPage");
      }
    }
  }
};
</script>
