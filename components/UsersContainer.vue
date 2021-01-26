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

<style lang="scss">
.users-list {
  width: 100%;
  height: calc(100% - 49px);
  overflow-y: scroll;
  list-style: none;
  padding: 0;
  border-radius: 3px;

  ul {
    padding: 0;
    list-style: none;
  }

  &__item {
    position: relative;
    height: 136px;
    margin: 20px 0;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.12);

    &__photo,
    &__description {
      height: 100%;
      float: left;
    }

    &__photo {
      width: 25%;
      background-color: $photo-background;
      @include border-radius(3px, 0, 0, 3px);

      img {
        width: 100%;
      }
    }

    &__description {
      position: relative;
      width: 75%;
      font-size: 0.875em;
      background-color: $light-grey;
      color: $dark-grey;
      padding: 10px 27px;
      @include border-radius(0, 3px, 3px, 0);

      &__item {
        display: block;
        line-height: 20px;

        &--email {
          position: absolute;
          right: 9px;
        }

        &--name {
          line-height: 32px;
          font-weight: 400;
          font-size: 1.5em;
          color: $black;
        }

        &--occupation {
          font-weight: 700;
        }
      }
    }
  }
}
</style>
