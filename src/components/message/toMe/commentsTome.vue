<template>
  <div>
    <div class="w-100">
      <router-link to="/messageGeneral" class="d-inline btn btn-success" style="text-align:left;">返回</router-link>
      <span class="text-center">评论与回复</span>
    </div>
    <div class="px-4 py-2" v-for="item in messages" :key="item.id">
      <div class="d-flex mb-2">
          <div class="" style="line-height:50px;width:50px;height:50px;border-radius:50%;background-color:#d8d8d8">头像</div>
          <div class="ml-3">
              <div class="d-flex" style="font-size:15px;text-align:left;">
                <div class="mr-1">{{item.userName1}}</div>
                <div>
                  <span v-show="item.messageType==1">评论了你的动态</span>
                  <span v-show="item.messageType==2">回复你的评论</span>
                </div>
              </div>
              <div class="d-flex" style="font-size:13px;color:#afafaf;">
                  <div>2021-1-8</div>
              </div>
          </div>
      </div>
      <div class="text-left">
        {{item.messageContent}}
      </div>
      <div v-if="item.object" class="d-flex flex-column justify-content-around p-2" style="height:100px;background:#dedede;">
          <div class="text-left" style="font-size:13px;color:#afafaf;text-align:left;white-space:nowrap;text-overflow:ellipsis;">{{item.object.user_name}}：{{item.object.comment_content}}</div>
          <hr class="w-100 m-1">
          <div class="nowrap overflow-hidden" style="font-size:13px;color:#afafaf;text-align:left;white-space:nowrap;text-overflow:ellipsis;">
            某人发表的动态<span class="mx-1">·</span>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
          </div>
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
    return {
      messages:[],
      user:{},
    }
  },
  mounted(){
    console.log("hahaha");
    this.user = JSON.parse(localStorage.getItem("user"));
    const that = this;
    $.ajax({
      url:"http://localhost/checkCommentMessageServlet",
      method:'post',
      data:{
        userId:that.user.user_id,
      },
      success(data){
        console.log(data);
        that.messages = JSON.parse(data);
        
        console.log(that.messages[0].object.user_name);
      }
    });
  }
}
</script>

<style>

</style>