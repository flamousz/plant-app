<script>
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";

export default {
	components: { Navbar },
  computed: {
    isLoginPage() {
      return this.$route.name === "login";
    }
  }
};
</script>

<template>
	<Navbar v-if="!isLoginPage"  />
	<RouterView />
</template>
