<template>
  <div class="Post">
    <h1>All Posts</h1>

    <div class="Posts">
      <ul class="Posts__list">
        <li class="Posts__list--element" v-for="post in posts" :key="post.id">
          <Avatar
            :UserFirstname="post.User.firstname"
            :UserLastname="post.User.lastname"
            :profil_image="post.User.profil_image"
          />
          <OnePost
            :id="post.id"
            :title="post.title"
            :image_post="post.image_post"
            :alt="post.title"
          />
          <SocialBanner
          :likes="post.likes"
          :dislikes="post.dislikes"
          :comments="post.all_comments"
        />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
import OnePost from "@/components/OnePost";
import Avatar from "@/components/Avatar";
import SocialBanner from "@/components/SocialBanner";
export default {
  name: "Post",
  components: {
    OnePost,
    Avatar,
    SocialBanner,
  },
  computed:{
    ...mapState('posts', ['posts'])
  },
 
  mounted(){
    this.$store.dispatch('posts/loadPosts')
  },

  methods: { },
};
</script>


<style lang="scss" scoped>
.Posts {
  display: block;
  &__list {
    padding-inline-start: 0px;
    display: block;
    margin: auto;
    width: 80%;
    &--element {
      list-style: none;
      max-width: 760px;
      display: block;
      margin: auto;
    }
  }
}
</style>