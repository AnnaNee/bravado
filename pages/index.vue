<template>
  <div class="content">
    <SearchBar @on-search="handleSearch" />
    <UsersContainer :filter="filter" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      filter: '',
    }
  },
  methods: {
    handleSearch(filter) {
      this.filter = filter
    },
  },
}
</script>

<style lang="scss">
.search-bar {
  &__input {
    width: 100%;
    height: 48px;
    background-color: $light-grey;
    padding-left: 50px;
    font-size: 1.5em;
    font-family: 'Roboto', sans-serif;
    border: 1px solid $white;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.24);
    border-radius: 2px;
  }

  &__icon {
    position: absolute;
    padding: 15px 19px;

    &::before {
      content: '';
      width: 17px;
      height: 17px;
      display: inline-block;
      background-image: url('~assets/images/search-icon.svg');
    }
  }
}
</style>
