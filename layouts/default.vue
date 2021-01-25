<template>
  <div>
    <Nuxt />
  </div>
</template>

<style lang="scss">
html {
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

body {
  background-color: $medium-grey;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.content {
  width: 564px;
  height: 643px;
  background-color: $white;
  padding: 0.75rem;
  overflow-y: scroll;
  @include vertical-align;
}

.btn-primary {
  color: $button;
  background-color: transparent;
  border: none;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 0.875em;
  margin-top: 15px;
  padding: 0 20px;

  &::before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: $medium-grey;
    bottom: 38%;
  }
}
</style>
