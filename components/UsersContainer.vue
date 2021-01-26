<template>
  <UsersList :users="users" @on-users-list-end="loadUsers" />
</template>

<script>
const getUsers = (cb) => import('~/data/users.json').then(cb)

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
    }
  },
  async fetch() {
    this.users = await getUsers(this.lazyFetch)
  },
  computed: {
    filteredUsers() {
      return this.users.filter((user) => {
        return user.name.match(this.filter)
      })
    },
  },
  methods: {
    lazyFetch(data) {
      const fetchedData = data.default || data
      const length = this.users.length
      return fetchedData.splice(length + 1, length + 5)
    },
    async loadUsers() {
      const fetchedUsers = await getUsers(this.lazyFetch)
      const users = [...this.users, ...fetchedUsers]
      this.users = users
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
