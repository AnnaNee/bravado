<template>
  <UsersList :users="users" @on-users-list-end="loadUsers" />
</template>

<script>
const getUsers = (cb) => import('~/data/users.json').then(cb)
const highlightedTerm = (term) => `<span class="term-highlight">${term}</span>`
const stringifiedUser = (user) => Object.keys(user).reduce((str, attr) => {
  if (attr !== 'avatar') return str+= ` ${user[attr]}`
  return str
}, '')
const highlight = (users, term) => {
  return users.map((user) => {
    const highlightedUser = {}
    Object.keys(user).forEach((attr) => {
      highlightedUser[attr] = user[attr].replace(term, highlightedTerm)
    })
    return highlightedUser
  })
}

export default {
  props: {
    filter: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      users: [],
      isFiltering: false,
    }
  },
  async fetch() {
    this.users = await getUsers(this.lazyFetch)
  },
  methods: {
    lazyFetch(data) {
      const fetchedData = data.default.slice() || data.slice()
      const length = this.users.length
      return fetchedData.splice(length + 1, length + 5)
    },
    async loadUsers() {
      if (this.isFiltering) return
      const fetchedUsers = await getUsers(this.lazyFetch)
      const users = [...this.users, ...fetchedUsers]
      this.users = users
    },
    filterUsersBy(data, filter, fn) {
      const foundUsers = data.filter((user) => {
        return stringifiedUser(user).match(filter)
      })

      return fn(foundUsers, filter)
    },
  },
  watch: {
    filter() {
      const context = this
      this.isFiltering = true
      getUsers((response) => {
        const data = response.default.slice() || response.slice()
        if (context.filter) {
          context.users = context.filterUsersBy(data, this.filter, highlight)
        } else {
          context.users = data.splice(1, 5)
          context.isFiltering = false
        }
      })
    },
  },
}
</script>
