<template>
  <b-container class="OnePost">
    <b-button class="goBack" variant="danger"
      ><b-icon @click="GoBack" icon="arrow-left"></b-icon
    ></b-button>
   <DeleteBtn
            v-if="isAdmin"
            :supprimer="deleteThis"
            class="deleteBtn"
            @click.native="deletePost()"
          />

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
          <OneComment :contentComment="comment.content" />
          <DeleteBtn
            v-if="isAdmin"
            :supprimer="deleteThis"
            class="deleteBtn"
            @click.native="deleteComment(comment.id)"
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
import DeleteBtn from "@/components/DeleteBtn";
export default {
  name: "PostId",
  components: {
    OnePost,
    Avatar,
    SocialBanner,
    OneComment,
    NewComment,
    DeleteBtn,
  },
  data() {
    return {
      pulseLike: false,
      pulseDislike: false,
      deleteThis: "Supprimer",
      
      
      
    };
  },
  computed: {
    ...mapState("posts", ["post"]),
    ...mapState("comments", ["comments"]),
    isAdmin: function() {
      return this.$store.getters["user/isAdmin"];
    },
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
      //Animation du like / Dislike
      this.animated = true;
    },
    deleteComment(commentId) {
      let data = {
        comment: commentId,
      };
      this.$store.dispatch("comments/deleteComment", data);
    },
     deletePost() {
      this.$store.dispatch("posts/deletePost");
    },
  },
};
</script>
<style lang="scss" scoped>
.OnePost {
  background: #f2f3f7;
  .pulse {
    animation-name: pulse;
    animation-duration: 1s;
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
  .goBack {
    margin: 5%;
    font-size: 25px;

    svg {
      margin-top: 5px;
    }
  }
  .Comments_list {
    margin-bottom: 100px;
  }
  .deleteBtn {
    display: inline;
  }
}
</style>
