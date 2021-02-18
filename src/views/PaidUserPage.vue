<template>
  <div>
    <h2 class="text-center mt-4">{{ $route.name }}</h2>
    <p class="text-center mt-4">
      This route requires user to be AUTHENTICATED and user needs to be a PAID
      user
    </p>
  </div>
</template>
<script>
export default {
  name: "PaidUserPage",
};
</script>
