<template>
  <div class="OneComment">
    <div class="OneComment__body">
      <p>{{ contentComment }}</p>
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
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.OneComment {
  margin: 5px 0px 40px 0px;
  border-bottom: 1px solid #ccc;
  border-radius: 3px;
  cursor: pointer;
  &__header {
    margin-top: 40px;
    margin-bottom: 25px;
  }
}
</style>
