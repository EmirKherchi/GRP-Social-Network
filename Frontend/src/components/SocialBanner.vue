<template>
  <div class="SocialBanner container">
      <p class="SocialBanner--elements">
       Likes: {{ likes }}
        Dislikes: {{ dislikes }}
       Commentaires:  {{ comments }}
      </p>
  </div>
</template>

<script>
export default {
  name: "SocialBanner",
  props: {
    likes: {
      type: Number,
      required: true,
    },
    dislikes: {
      type: Number,
      required: true,
    },
    comments: {
      type: Number,
      required: true,
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.SocialBanner {
  margin: 5px 0px 120px 0px;
  color: #00000080;
  &--elements{
    text-align: left;
  }
  .icons{
    font-size: 25px;
    margin-right: 2px;
    margin-left: 25px;
  }
}
</style>
