<template>
  <div>
    <div class="w-100">
      <router-link to="/messageGeneral" class="d-inline btn btn-success" style="text-align:left;">返回</router-link>
      <span class="text-center">新增关注</span>
    </div>
    <div class="px-4 py-2" v-for="item in messages" :key="item.id">
        <div class="d-flex mb-2">
          <div class="" style="line-height:50px;width:50px;height:50px;border-radius:50%;background-color:#d8d8d8">头像</div>
          <div class="ml-3 d-flex justify-content-between align-items-center flex-grow-1">
            <div>
              <div style="font-size:15px;text-align:left;">
                <span>{{item.id}}</span>
                <span>关注了你</span>
              </div>
            </div>
            <div class="btn btn-success">互相关注</div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      messages:[],
      user:{}
    }
  },
  mounted(){
    console.log("hahaha");
    this.user = JSON.parse(localStorage.getItem("user"));
    const that = this;
    $.ajax({
      url:"http://localhost/checkMessage",
      method:'post',
      data:{
        userId:that.user.user_id,
        messageType:0
      },
      success(data){
        console.log(data);
        that.messages = JSON.parse(data);
      }
    });
  }
}
</script>

<style scoped>
a:hover{
  text-decoration: none;
}
</style>