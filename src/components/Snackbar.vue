<template>
  <div name="snackbars">
    <v-snackbar
      v-model="snackbar"
      :color="color"
      :timeout="timeout"
      bottom
      absolute
      elevation="10"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn dark text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "Snackbar",

  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "snackbar/showMessage") {
        this.text = state.snackbar.text;
        this.color = state.snackbar.color;
        this.timeout = state.snackbar.timeout;
        this.snackbar = true;
      }
    });
  },

  data() {
    return {
      snackbar: false,
      color: "",
      text: "",
      timeout: "-1",
    };
  },
};
</script>