<template>
  <b-container class="OnePost">
    <b-button variant="danger"
      ><b-icon @click="GoBack" icon="arrow-left"></b-icon
    ></b-button>

    <div class="OnePost__list">
      <Avatar
        :UserFirstname="post.User.firstname"
        :UserLastname="post.User.lastname"
        :profil_image="post.User.profil_image"
      />
      <OnePost
        :id="post.id"
        :title="post.title"
        :image_post="post.image_post"
        class="post"
      />
      <div class="likeornot">
        <b-icon
          :class="{ pulse: pulseLike }"
          class="icons"
          icon="hand-thumbs-up"
          @click="likeIt"
        ></b-icon>
        <b-icon
          :class="{ pulse: pulseDislike }"
          class="icons"
          icon="hand-thumbs-down"
          @click="dislikeIt"
        ></b-icon>
      </div>
      <SocialBanner
        :likes="post.likes"
        :dislikes="post.dislikes"
        :comments="post.all_comments"
      />
    </div>
    <p>{{ copyright }}</p>
    <div class="newComment">
      <NewComment />
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
          <OneComment
            :contentComment="comment.content"
          />
        </li>
      </ul>
    </div>
  </b-container>
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
  data() {
    return {
      pulseLike: false,
      pulseDislike: false,
    };
  },
  computed: {
    ...mapState("posts", ["post"]),
    ...mapState("comments", ["comments"]),
  },
  beforeMount() {
    this.$store.dispatch("posts/loadPost");
    this.$store.dispatch("comments/loadComments");
  },
  methods: {
    GoBack() {
      this.$router.push({ path: `/posts/` });
    },
    likeIt() {
      this.pulseLike = !this.pulseLike;
      this.pulseDislike = false;
      this.$store.dispatch("likes/likedIt");
    },
    dislikeIt() {
      this.pulseDislike = !this.pulseDislike;
      this.pulseLike = false;
      this.$store.dispatch("likes/dislikedIt");
    },
    animate() {
      this.animated = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.OnePost {
  .pulse {
    animation-name: pulse;
    animation-duration: 1s;
    color: #0f4c81;
    font-weight: 900;
  }
  @keyframes pulse {
    0% {
      transform: scale(0.9);
      opacity: 0.7;
    }
    50% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(0.9);
      opacity: 0.7;
    }
  }
  display: block;
  &__list {
    .post {
      display: block;
      margin: auto;
      max-width: 500px;
    }
    .likeornot {
      .icons {
        font-size: 3rem;
        cursor: pointer;
        margin: 10px;
        & :hover {
          color: #0f4c81;
          font-weight: 900;
        }
      }
      margin: 50px;
    }
  }
  button {
    margin: 5%;
    font-size: 25px;

    svg {
      margin-top: 5px;
    }
  }
}
</style>
