<template>
  <v-app>
    <Navbar />

    <v-main>
      <Snackbar />

      <router-view></router-view>
    </v-main>

    <Footer />
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import Snackbar from "@/components/Snackbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Navbar,
    Snackbar,
    Footer,
  },
  name: "App",
  data: () => ({}),
};
</script>