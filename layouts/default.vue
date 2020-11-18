<template>
  <div class="layout">
    <Navbar />
    <main class="absolute w-full mt-16 pt-8 px-4 flex flex-col place-content-start place-items-start flex-no-wrap overflow-y-auto">
      <Nuxt />
    </main>
  </div>
</template>

<style lang="postcss">
:root {
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  --animate-duration: 300ms;
  --animate-delay: 100ms;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  margin: 0;
}

#__nuxt, #__layout, .layout {
  display: contents;
}

body {
  @apply bg-blue-100;
}

main::after {
  content: "";
  @apply w-full block h-8;
}
</style>

<script>
import 'animate.css'

export default {}
</script>
