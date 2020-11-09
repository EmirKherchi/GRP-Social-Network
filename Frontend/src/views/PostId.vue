<template>
  <div class="One post">
    <div class="OnePost">
      <button class="btn btn-primary btn-block" @click="GoBack">
        GoBack
      </button>
      <ul class="OnePost__list">
        <Avatar
          :UserFirstname="post.User.firstname"
          :UserLastname="post.User.lastname"
          :profil_image="post.User.profil_image"
        />
        <OnePost
          :id="post.id"
          :title="post.title"
          :image_post="post.image_post"
        />

        <SocialBanner
          :likes="post.likes"
          :dislikes="post.dislikes"
          :comments="post.all_comments"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import OnePost from "@/components/OnePost";
import Avatar from "@/components/Avatar";
import SocialBanner from "@/components/SocialBanner";
export default {
  name: "PostId",
  components: {
    OnePost,
    Avatar,
    SocialBanner,
  },
  computed: {
    ...mapState("posts", ["post"]),
  },
  mounted() {
    this.$store.dispatch("posts/loadPost");
  },
  methods: {
    GoBack() {
      this.$router.push({ path: `/posts/` });
    },
  },
};
</script>
<style lang="scss" scoped>
.OnePost {
  display: block;
  &__list {
    padding-inline-start: 0px;
    display: block;
    margin: auto;
    width: 80%;
  }
  img {
    width: 1000px;
  }
  button {
    width: 20%;
    display: block;
    margin: 5% auto;
    border: none;
    color: #222;
    background: none;
    font-size: 25px;
    letter-spacing: 1px;
    &:hover {
      font-weight: 900;
    }
  }
}
</style>
