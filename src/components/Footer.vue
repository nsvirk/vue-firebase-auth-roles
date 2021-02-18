<template>
  <v-footer
    :absolute="!fixed"
    app
    dark
    padless
    class="grey darken-1 justify-center"
  >
    <v-card flat tile class="grey darken-1 white--text text-center">
      <v-card-text>
        <v-btn v-for="icon in icons" :key="icon" class="mx-4 white--text" icon>
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        A boilerplate app having user authentication, user roles, route guards
        made with vue, firebase and vuetify.
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong> {{ appFooter }} </strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      appFooter: process.env.VUE_APP_FOOTER,
      fixed: true,
      icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-github"],
    };
  },
};
</script>