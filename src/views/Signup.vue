<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <h2 class="text-center ma-4">Sign up</h2>

      <v-card class="mx-auto" elevation="4" max-width="400">
        <v-form ref="form" v-model="valid" v-on:submit.prevent="signUp">
          <v-card-text class="pa-5">
            <v-card-title class="d-flex justify-center"
              >Enter sign up details</v-card-title
            >
            <!-- input fields -->
            <v-text-field
              v-model="name"
              :counter="25"
              :rules="nameRules"
              label="Name"
              required
            ></v-text-field>
            <v-text-field
              color="primary"
              v-model="email"
              :rules="emailRules"
              :counter="50"
              label="Email"
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
              required
            ></v-text-field>
            <v-text-field
              color="primary"
              v-model="repeatPassword"
              :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
              :rules="repeatPasswordRules"
              :counter="20"
              label="Repeat Password"
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
                >Sign Up</v-btn
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
  data() {
    return {
      valid: true,
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
      showPassword: false,
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 25) || "Name must be less than 25 characters",
      ],
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /\S+@\S+\.\S+/.test(v) || "Email must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => v.length > 5 || "Password > 5 characters",
      ],
      repeatPasswordRules: [
        (v) => !!v || "Password is required",
        (v) => v.length > 5 || "Password > 5 characters",
        (v) =>
          v == this.password || "Password and Repeat Password do not match",
      ],
    };
  },

  computed: {
    ...mapGetters({
      isUserAuth: "users/isUserAuth",
    }),
  },

  methods: {
    ...mapActions({
      signUpAction: "users/signUpAction",
    }),
    validate() {
      this.$refs.form.validate();
    },
    signUp() {
      this.signUpAction({ email: this.email, password: this.password });
    },
  },
};
</script>