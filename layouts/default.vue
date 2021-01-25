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
  @include vertical-align;
}
</style>
