<template>
  <div>
      <div class="w-100 my-3 d-flex justify-content-between">
          <router-link to="/messageSet" class="btn btn-success">消息设置</router-link>
          <div>
                <router-link to="/messageFollow" class="btn btn-success">关注</router-link>
                <router-link to="/messageGeneral" class="btn btn-success">消息</router-link>
          </div>
          <router-link to="/messageSerach" class="btn btn-success">搜索</router-link>
      </div>
      <router-view />
  </div>
</template>

<script>
export default {
  data(){
    return{
      message:[]
    }
  }
}
</script>

<style scoped>
a{
  color: #333;
}
  a:hover{
    text-decoration: none;
  }
</style>