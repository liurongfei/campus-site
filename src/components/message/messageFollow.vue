<template>
  <div>
      <div class="px-4 py-2" v-for="item in 5" :key="item.id">
          <div class="d-flex mb-2">
              <div class="" style="line-height:50px;width:50px;height:50px;border-radius:50%;background-color:#d8d8d8">头像</div>
              <div class="ml-3">
                  <div style="font-size:15px;text-align:left;">昵称</div>
                  <div class="d-flex" style="font-size:13px;color:#afafaf;">
                      <div>发表了新动态</div>
                      <div class="mx-1">·</div>
                      <div>2021-1-8</div>
                  </div>
              </div>
          </div>
          <div class="d-flex flex-column justify-content-between p-2" style="height:100px;background:#dedede;">
              <div class="text-left">标题内容哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</div>
              <div class="d-flex" style="font-size:13px;color:#afafaf;">
                <div>6评论</div>
                <div>5点赞</div>
              </div>
          </div>
          <hr class="w-100 mb-0 mt-3">
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            follow:[]
        }
    }
}
</script>

<style>

</style>