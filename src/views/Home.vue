<template>
  <div class="home">
    <h2 class="text-center mt-4">{{ $route.name }}</h2>
    <p class="text-center mt-4">Welcome to the boilerplate app</p>
    <!-- buttons -->
    <div v-if="!isUserAuth" class="d-flex justify-center ma-4">
      <h4 class="text-center mt-4">Please sign in to use the application</h4>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Home",
  computed: {
    ...mapGetters({
      isUserAuth: "users/isUserAuth",
    }),
  },
};
</script>
