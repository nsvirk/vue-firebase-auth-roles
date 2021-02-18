<template>
  <div>
    <h2 class="text-center mt-4">{{ $route.name }}</h2>
    <p class="text-center mt-4">This route requires user to be AUTHENTICATED</p>
    <v-divider></v-divider>
  </div>
</template>
<script>
export default {
  name: "AuthPage",
};
</script>
