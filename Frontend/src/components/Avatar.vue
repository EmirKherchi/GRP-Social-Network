<template>
  <div class="Avatar">
    <div class="Avatar__username">
      <p>{{ UserFirstname }} {{ UserLastname }}</p>
    </div>

    <b-avatar :src="profil_image" :alt="fullNameAlt"></b-avatar>
  </div>
</template>

<script>
export default {
  name: "Avatar",
  props: {
    UserFirstname: {
      type: String,
      default: "User",
    },
    UserLastname: {
      type: String,
    },
    profil_image: {
      type: String,
      default: "https://davidwilsondmd.com/wp-content/uploads/2015/11/user.png",
    },
  },
  computed: {
    fullNameAlt() {
      return `${this.UserFirstname} ${this.UserLastname} profil image`;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.Avatar {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row-reverse;
  justify-content: flex-end;
  &__username {
    margin-left: 10px;
    align-self: center;
    text-decoration: none;

    & > p {
      margin: 0;
      color: rgb(190, 190, 190);
      font-weight: 100;
    }
  }
}
</style>
