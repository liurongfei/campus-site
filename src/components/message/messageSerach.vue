<template>
  <div class="px-4 ">
      <div class="d-flex align-items-center" style="height:50px;line-height:50px">
          <div class="flex-grow-1 position-relative">
              <router-link to="/message" class="position-absolute" style="top:-5px;left:8px">返回</router-link>
              <input class="form-control pl-5" placeholder="搜索" type="text">
          </div>
          <router-link to="/message" style="width:50px;" class="mx-3">取消</router-link>
      </div>
      <div>
        <div class="py-2" v-for="item in 5" :key="item.id">
          <div class="d-flex mb-2">
              <div class="" style="line-height:50px;width:50px;height:50px;border-radius:50%;background-color:#d8d8d8">头像</div>
              <div class="ml-3">
                  <div style="font-size:15px;text-align:left;">昵称</div>
                  <div class="d-flex" style="font-size:13px;color:#afafaf;">个人签名</div>
              </div>
          </div>
          <hr class="w-100 mb-0 mt-3">
        </div>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
a:hover{
    text-decoration: none;
}
</style>