<template>
  <div class="container">
    <header class="jumbotron">
      <h2>{{ userProfile.firstname }}</h2>
      <h2>{{ userProfile.lastname }}</h2>

      <p>Tous vos likes : {{ userProfile.all_likes }}</p>
      <p>Tous vos dislikes : {{ userProfile.all_dislikes }}</p>
      <p>Nombre de publications postées : {{ userProfile.all_posts }}</p>
      <img :src="userProfile.profil_image" :alt="userProfile.firstname" />
       <UpdateAvatar/>
    </header>
   
  </div>
</template>

<script>
import { mapState } from "vuex";
import UpdateAvatar from "@/components/UpdateAvatar";
export default {
  name: "UserBoard",
  components:{
    UpdateAvatar,
  },
  computed: {
    ...mapState('user', ['userProfile'])
  },
  
};
</script>

<style lang="scss" scoped>
img {
  margin-top: 50px;
  width: 100%;
  max-width: 400px;
  height: auto;
}
</style>
