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
        <button @click="likeIt">like</button>
        <button @click="dislikeIt">dislike</button>
        <SocialBanner
          :likes="post.likes"
          :dislikes="post.dislikes"
          :comments="post.all_comments"
        />
      </ul>
    <div class="newComment">
      <NewComment/>
    </div>
      <div class="Comments">
        <ul class="Comments_list">
          <li
            class="Posts__list--element"
            v-for="comment in comments"
            :key="comment.id"
          >
            <Avatar
              :UserFirstname="comment.User.firstname"
              :UserLastname="comment.User.lastname"
              :profil_image="comment.User.profil_image"
            />
            <OneComment :contentComment="comment.content" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import OnePost from "@/components/OnePost";
import OneComment from "@/components/OneComment";
import NewComment from "@/components/NewComment";
import Avatar from "@/components/Avatar";
import SocialBanner from "@/components/SocialBanner";
export default {
  name: "PostId",
  components: {
    OnePost,
    Avatar,
    SocialBanner,
    OneComment,
    NewComment,
  },
  computed: {
    ...mapState("posts", ["post"]),
    ...mapState("comments", ["comments"]),
  },
  beforeMount() {
    this.$store.dispatch("posts/loadPost");
    this.$store.dispatch("comments/loadComments")
  },
  methods: {
    GoBack() {
      this.$router.push({ path: `/posts/` });
    },
    likeIt() {
      this.$store.dispatch("likes/likedIt");
    },
    dislikeIt() {
      this.$store.dispatch("likes/dislikedIt");
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
