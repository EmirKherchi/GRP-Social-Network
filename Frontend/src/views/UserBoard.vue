<template>
  <b-container class="userBoard">
    <div class="userBoard--name">
      <h1>{{ userProfile.firstname }} {{ userProfile.lastname }}</h1>
    </div>
    <hr />
    <div class="userBoard--info">
      <div class="userBoard--info__like">
        <h2>
          Nombre de publications : <span>{{ userProfile.all_posts }}</span>
        </h2>
        <h2>
          Likes Reçus : <span>{{ userProfile.all_likes }}</span>
        </h2>
        <h2>
          Dislikes Reçus : <span>{{ userProfile.all_dislikes }}</span>
        </h2>
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
    <DeleteBtn
      :supprimer="deleteProfile"
      class="deleteBtn"
      @click.native="deleteUser"
    />
  </b-container>
</template>

<script>
import { mapState } from "vuex";
import UpdateAvatar from "@/components/UpdateAvatar";
import DeleteBtn from "@/components/DeleteBtn";
export default {
  name: "UserBoard",
  components: {
    UpdateAvatar,
    DeleteBtn,
  },
  data() {
    return {
      deleteProfile: "Supprimer votre profil",
    };
  },
  computed: {
    ...mapState("user", ["userProfile"]),
  },
  methods: {
    deleteUser() {
      this.$store.dispatch("user/delete").then(() => {
        this.$router.push("/connexion");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.userBoard {
  padding: 25px 0 0px 0;
  margin-top: 80px;
  margin-bottom: 25px;
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
      h2,h3{
        font-size: 20px;
      }
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
  .deleteBtn {
    margin: 0px 0 25px 0;
  }
}
</style>
