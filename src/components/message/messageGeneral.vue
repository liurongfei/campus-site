<template>
  <div>
    <div class="d-flex justify-content-between"> 
          <div class="badge badge-info">全部74条消息</div>
          <div class="btn btn-info">全部已读</div>
      </div>
      <div class="d-flex justify-content-around my-5">
        <router-link to="/likesTome" class="btn btn-primary">点赞</router-link>
        <router-link to="/followersTome" class="btn btn-primary">关注</router-link>
        <router-link to="/commentsTome" class="btn btn-primary">评论与转发</router-link>
        <router-link to="/testTome" class="btn btn-primary">收到的答卷</router-link>
      </div>
      <div>
          <router-link to="/messageInterface" class="d-flex my-4" v-for="item in 5" :key="item.id">
              <div class="mx-3" style="line-height:50px;width:50px;height:50px;border-radius:50%;background-color:#d8d8d8">头像</div>
              <div class=" flex-grow-1">
                <div class="d-flex justify-content-between">
                    <div>
                      <div>官方账号消息哈哈哈哈哈</div>
                      <div class="text-left">主要内容</div>
                    </div>
                    <div>2021-1-8</div>
                </div>
                <hr class="w-100">
              </div>
          </router-link>
          <div>没有更多内容了</div>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
a:hover{
  text-decoration: none;
}
</style>