<template>
  <div class="about">
    <h2 class="text-center mt-4">{{ $route.name }}</h2>
    <p class="text-center mt-4">This route requires user to be LOGGED IN</p>
    <v-divider></v-divider>
    <section>
      <h4 class="text-center mt-4">store/getters</h4>

      <pre>
        {{ $store.getters }}
      </pre>
    </section>
    <v-divider></v-divider>
    <section>
      <h4 class="text-center mt-4">store/state</h4>
      <pre>
        {{ $store.state }}
      </pre>
    </section>
    <v-divider></v-divider>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
