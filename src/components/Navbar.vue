
<template>
  <nav>
    <v-app-bar :clipped-left="clipped" fixed app dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
      </v-btn>
      <v-toolbar-title> {{ appName }} </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn v-show="isUserAuth" text>
        <v-icon left> mdi-account-circle </v-icon>
        <span> {{ getUser ? getUser.email : "" }} </span>
      </v-btn>

      <!-- Sign Up  -->
      <v-btn
        v-show="!isUserAuth"
        :disabled="$route.path == '/signup'"
        text
        @click.prevent="signUp"
      >
        <v-icon> mdi-account-plus </v-icon>
        <span left> Sign Up </span>
      </v-btn>

      <!-- Sign In  -->
      <v-btn
        v-show="!isUserAuth"
        :disabled="$route.path == '/signin'"
        text
        @click.prevent="signIn"
      >
        <v-icon> mdi-login </v-icon>
        <span left> Sign In </span>
      </v-btn>

      <!-- Sign Out  -->
      <v-btn v-show="isUserAuth" text @click.prevent="signOut">
        <v-icon> mdi-logout </v-icon>
        <span left> Sign Out </span>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      color="grey lighten-2"
      app
    >
      <!-- <v-list-item>
        <v-list-item-content>
          <v-icon color="primary" large>mdi-application-cog</v-icon>
          <v-list-item-title class="title"> </v-list-item-title>
          <v-list-item-subtitle class="text-center">
            Vue-Firebase-Auth Boilerplate
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item> -->

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.href"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="text-button">{{
              item.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import router from "@/router";

export default {
  name: "Navbar",
  components: {},
  data: () => ({
    appName: process.env.VUE_APP_NAME,
    clipped: true,
    drawer: true,
    fixed: false,
    miniVariant: false,
    items: [
      { title: "Home", icon: "mdi-account", href: "/" },
      { title: "Auth Page", icon: "mdi-account-key", href: "/authpage" },
      { title: "Admin Page", icon: "mdi-account-star", href: "/adminpage" },
      {
        title: "PaidUser Page",
        icon: "mdi-account-star",
        href: "/paiduserpage",
      },
      { title: "Roles (Auth)", icon: "mdi-account-cog", href: "/roles" },
      // {
      //   title: "Store (Auth)",
      //   icon: "mdi-account-key",
      //   href: "/store",
      //   showDevOnly: true,
      // },
      { title: "About", icon: "mdi-account-question", href: "/about" },
    ],
  }),

  mounted() {
    this.authAction();
  },

  computed: {
    ...mapGetters({
      getUser: "users/getUser",
      isUserAuth: "users/isUserAuth",
    }),
  },

  methods: {
    ...mapActions({
      authAction: "users/authAction",
      signOutAction: "users/signOutAction",
    }),

    signUp() {
      router.push("/signup");
    },

    signIn() {
      router.push("/signin");
    },

    signOut() {
      this.signOutAction().then(() => {});
    },
  },
};
</script>