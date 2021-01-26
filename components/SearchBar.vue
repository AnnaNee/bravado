<template>
  <div class="search-bar">
    <i class="search-bar__icon"></i>

    <input
      v-model="search"
      class="search-bar__input"
      type="text"
      placeholder="Type your search..."
      @keyup="handleSearch()"
    />
  </div>
</template>

<script>
const debounce = (fn, wait) => {
  let timeout
  return function () {
    const context = this
    clearTimeout(timeout)
    timeout = setTimeout(fn.bind(context), wait)
  }
}

export default {
  data() {
    return {
      search: '',
    }
  },
  methods: {
    handleSearch: debounce(function () {
      this.$emit('on-search', this.search)
    }, 1000),
  },
}
</script>
