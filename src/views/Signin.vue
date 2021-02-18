<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <h2 class="text-center ma-4">Sign In</h2>
      <v-card class="mx-auto" max-width="400" elevation="4">
        <v-form ref="form" v-model="valid" v-on:submit.prevent="signIn">
          <v-card-title class="d-flex justify-center">
            Enter sign in details
          </v-card-title>
          <v-card-text class="pa-8">
            <!-- input fields -->
            <v-text-field
              color="primary"
              v-model="email"
              :rules="emailRules"
              :counter="50"
              label="Email"
              :disabled="isUserAuth"
              required
            ></v-text-field>
            <v-text-field
              color="primary"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
              :rules="passwordRules"
              :counter="20"
              label="Password"
              :disabled="isUserAuth"
              required
            ></v-text-field>

            <!-- buttons -->
            <div class="d-flex justify-center ma-4">
              <v-btn
                type="submit"
                color="secondary"
                class="p-4"
                :disabled="!valid"
                @click="validate"
                >Sign In</v-btn
              >
            </div>
          </v-card-text>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template> 

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  components: {},
  data: () => ({
    valid: true,
    email: "",
    password: "",
    showPassword: false,
    emailRules: [
      (v) => !!v || "Email is required",
      (v) => /\S+@\S+\.\S+/.test(v) || "Email must be valid",
    ],
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => v.length > 5 || "Password > 5 characters",
    ],
  }),

  computed: {
    ...mapGetters({
      isUserAuth: "users/isUserAuth",
    }),
  },

  methods: {
    ...mapActions({
      signInAction: "users/signInAction",
    }),
    validate() {
      this.$refs.form.validate();
    },
    signIn() {
      this.signInAction({
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>




