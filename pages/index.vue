<template>
  <div class="content">
    <div class="search-bar">
      <input
        class="search-bar__input"
        v-model="search"
        type="text"
        placeholder="Type your search..."
      />
    </div>

    <div class="usersList">
      <ul>
        <li v-for="user in filteredUsers" :key="user.email">
          {{ user.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
const getUsers = () => import('~/data/users.json').then((d) => d.default || d)

export default {
  data() {
    return {
      users: [],
      search: '',
    }
  },
  async fetch() {
    this.users = await getUsers()
  },
  computed: {
    filteredUsers() {
      return this.users.filter((user) => {
        return user.name.match(this.search)
      })
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
  }
}
</style>
