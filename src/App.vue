<template>
    <!-- <ul>
      <li v-for="(link, index) in links" :key="index">
        <router-link :to="link.to">{{ link.name }}</router-link>
      </li>
    </ul>-->
    <main>
      <router-view/>
    </main>
</template>

<style lang="scss">
body,
html {
  height: 100%;
  margin: 0;
}
main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>

<script>
export default {
  data: () => ({
    links: [
      {
        name: "Home",
        to: "/"
      },
      {
        name: "Bad Link",
        to: "/random-bad-url"
      }
    ]
  })
};
</script>