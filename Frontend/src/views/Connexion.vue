<template>
 <div>
     <Login/>
 <div>
    <router-link to="/inscription">Inscription</router-link>
 </div>

 </div>
</template>

<script>


import Login from "@/components/Login";


export default {
  name: "Connexion",
  components: {

    Login
    },
  
};
</script>
<style lang="scss" scoped>
</style>
