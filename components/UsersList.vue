<template>
  <div class="users-list" @scroll.passive="handleScroll">
    <ul>
      <li v-for="user in users" :key="user.email" class="users-list__item">
        <div class="users-list__item__photo">
          <img :src="user.avatar" alt="User Photo" />
        </div>
        <div class="users-list__item__description">
          <small
            class="users-list__item__description__item users-list__item__description__item--email"
          >
            {{ user.email }}
          </small>

          <h1
            class="users-list__item__description__item users-list__item__description__item--name"
          >
            {{ user.name }}
          </h1>

          <small
            class="users-list__item__description__item users-list__item__description__item--occupation"
          >
            {{ user.title }}
          </small>

          <small class="users-list__item__description__item">
            {{ user.address }}, {{ user.city }}
          </small>

          <button class="btn-primary">SKIP SELECTION</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      default() {
        return []
      },
    },
  },

  methods: {
    handleScroll(e) {
      const el = e.srcElement
      const scrolledToBottom =
        el.scrollTop + el.clientHeight === el.scrollHeight
      if (scrolledToBottom) this.$emit('on-users-list-end', this.users.length)
    },
  },
}
</script>
