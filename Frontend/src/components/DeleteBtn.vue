<template>
    <b-button variant="danger">{{ supprimer }}</b-button>
</template>

<script>
export default {
    name:"DeleteBtn",
     props: {
    supprimer: {
      type: String,
      Required: true,
    },
  },

}
</script>

<style lang="scss" scoped>

</style>