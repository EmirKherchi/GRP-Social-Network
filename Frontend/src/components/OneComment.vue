<template>
  <div class="OneComment">
    <div class="OneComment__body">
      <p> {{ contentComment }}</p>
     

    </div>
    
  </div>
  
</template>
<script>

export default {
  name: "OneComment",
   

  props: {
    contentComment: {
      type: String,
      Required: true,
    },
  },
  
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.OneComment {
  margin: 5px 0px 40px 0px;
  border-bottom: 1px solid #ccc;
  border-radius: 3px;
 
  &__body{
     text-align: left;
  }
  p{
    margin: 2% ;
  }
  
}

</style>
