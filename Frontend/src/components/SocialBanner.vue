<template>
  <div class="SocialBanner container">
      <p class="SocialBanner--elements">
        <b-icon class = "icons" icon="hand-thumbs-up"></b-icon>: <span class="icons_content">{{ likes }}</span> 
         <b-icon class = "icons" icon="hand-thumbs-down"></b-icon>: <span class="icons_content">{{ dislikes }}</span> 
        <b-icon class = "icons" icon="chat-dots"></b-icon>:   <span class="icons_content">{{ comments }}</span> 

      </p>
  
  <hr>
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
    margin-right: 5px;
    margin-left: 25px;
     color:#000000;
    &_content{
      font-weight: 600;
      color:#000000;
    }
  }
}
</style>
