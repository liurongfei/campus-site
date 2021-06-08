<template>
  <div>
      <top-bar title="设置" path="personal"></top-bar>
      <button @click="quit">退出</button>
  </div>
</template>

<script>
import topBar from '../../topBar.vue'
export default {
    components: { topBar },
    methods:{
        quit:function(){
            localStorage.clear("user");
            localStorage.clear("authorization");
            console.log("localStorage已清除！");
            this.$router.push("/");
        }
    }
}
</script>

<style>

</style>