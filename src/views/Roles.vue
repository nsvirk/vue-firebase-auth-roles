<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <h2 class="text-center mt-4">{{ $route.name }}</h2>
      <p class="text-center mt-4">
        This route requires user to be LOGGED IN and be an ADMIN user
      </p>
      <v-card class="mx-auto" elevation="4" max-width="400">
        <v-form ref="form" v-model="valid" v-on:submit.prevent="updateRoles">
          <v-card-text class="pa-5">
            <v-card-title class="d-flex justify-center"
              >User Roles</v-card-title
            >

            <v-checkbox
              v-model="roles"
              label="Admin"
              color="secondary"
              value="admin"
              @click="btnUpdateRoles = true"
              hide-details
            ></v-checkbox>
            <v-checkbox
              v-model="roles"
              label="Paid User"
              color="secondary"
              value="paid"
              @click="btnUpdateRoles = true"
              hide-details
            ></v-checkbox>
            <!-- <v-checkbox
              v-model="roles"
              label="Free User"
              color="secondary"
              value="free"
              @click="btnUpdateRoles = true"
              hide-details
            ></v-checkbox> -->
            <!-- <p>roles : {{ roles }}</p> -->
            <v-spacer>&nbsp;</v-spacer>
            <div class="d-flex justify-center ma-4">
              <v-btn
                name="myBtn"
                type="submit"
                color="secondary"
                class="p-4"
                :disabled="!btnUpdateRoles"
                >Update Roles</v-btn
              >
            </div>
            <div v-if="isUserAdmin" class="d-flex justify-center">
              <h4>User is admin</h4>
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
      btnUpdateRoles: false,
      displayName: "",
      //Checkbox Roles
      roles: [""],
    };
  },

  mounted() {
    //Set Roles from Database on page mount
    if (this.isUserAuth) {
      this.roles = this.$store.state.users.roles;
    }
  },

  computed: {
    ...mapGetters({
      getUser: "users/getUser",
      isUserAuth: "users/isUserAuth",
      isUserAdmin: "users/isUserAdmin",
    }),
  },

  methods: {
    ...mapActions({
      updateRolesAction: "users/updateRolesAction",
    }),

    //Update Roles to Store & Database
    updateRoles() {
      let user = this.getUser;
      this.updateRolesAction({ user: user, roles: this.roles }).then(() => {
        this.btnUpdateRoles = false;
      });
    },
  },
};
</script>