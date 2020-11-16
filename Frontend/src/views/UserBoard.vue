<template>
  <b-container class="userBoard">
    <div class="userBoard--name">
      <h1>{{ userProfile.firstname }} {{ userProfile.lastname }}</h1>
    </div>
    <hr />
    <div class="userBoard--info">
      <div class="userBoard--info__like">
        <h5>
          Nombre de publications : <span>{{ userProfile.all_posts }}</span>
        </h5>
        <h5>
          Likes Reçus : <span>{{ userProfile.all_likes }}</span>
        </h5>
        <h5>
          Dislikes Reçus : <span>{{ userProfile.all_dislikes }}</span>
        </h5>
      </div>
      <div class="userBoard--info__image">
        <b-img
          thumbnail
          rounded
          :src="userProfile.profil_image"
          :alt="userProfile.firstname"
        />
      </div>
    </div>
    <hr />
    <UpdateAvatar />
  </b-container>
</template>

<script>
import { mapState } from "vuex";
import UpdateAvatar from "@/components/UpdateAvatar";
export default {
  name: "UserBoard",
  components: {
    UpdateAvatar,
  },
  computed: {
    ...mapState("user", ["userProfile"]),
  },
};
</script>

<style lang="scss" scoped>
.userBoard {
  padding: 25px 0 0px 0;
  margin-top: 80px;
  background: #263238;
  color: #fff;
  hr {
    width: 50%;
   
    background-color: #f2f3f7;
  }
  &--name {
    text-transform: capitalize;
    font-weight: 900;
    letter-spacing: 1px;
    margin: 3%;
  }
  &--info {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-content: center;
    align-items: center;
    margin: 5%;
    &__like {
      order: 0;
      flex: 0 1 auto;
      align-self: center;
      text-align: left;
      margin-bottom: 50px;
      span {
        font-weight: 900;
      }
    }
    &__image {
      order: 0;
      flex: 0 1 auto;
      align-self: center;
      img {
        max-width: 200px;
        height: auto;
      }
    }
  }
}
</style>
