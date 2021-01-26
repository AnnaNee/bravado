<template>
  <div data-test-id="list" class="users-list" @scroll.passive="handleScroll">
    <ul>
      <li v-for="user in users" :key="user.email" class="users-list__item">
        <div class="users-list__item__photo">
          <img :src="user.avatar" alt="User Photo" />
        </div>
        <div class="users-list__item__description">
          <small
            class="users-list__item__description__item users-list__item__description__item--email"
          >
            <span data-test-id="email" v-html="user.email"></span>
          </small>

          <h1
            class="users-list__item__description__item users-list__item__description__item--name"
          >
            <span data-test-id="name" v-html="user.name"></span>
          </h1>

          <small
            class="users-list__item__description__item users-list__item__description__item--occupation"
          >
            <span data-test-id="title" v-html="user.title"></span>
          </small>

          <small class="users-list__item__description__item">
            <span data-test-id="address" v-html="user.address"></span>,
            <span data-test-id="city" v-html="user.city"></span>
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

<style lang="scss">
.term-highlight {
  background-color: $highlight-yellow;
}

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
