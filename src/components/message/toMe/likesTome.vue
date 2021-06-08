<template>
  <div>
    <div class="w-100">
      <router-link to="/messageGeneral" class="d-inline btn btn-success" style="text-align:left;">返回</router-link>
      <span class="text-center">赞同与喜欢</span>
    </div>
    <div class="px-4 py-2" v-for="item in messages" :key="item.id">
      <div class="d-flex mb-2">
          <div class="" style="line-height:50px;width:50px;height:50px;border-radius:50%;background-color:#d8d8d8">头像</div>
          <div class="ml-3">
              <div class="d-flex" style="font-size:15px;text-align:left;">
                <div class="mr-1">{{item.userName1}}</div>
                <div>赞了你的
                  <span v-show="item.messageLinkType==0">动态</span>
                  <span v-show="item.messageLinkType==1">评论</span>
                  <span v-show="item.messageLinkType==2">回复</span>
                </div>
              </div>
              <div class="d-flex" style="font-size:13px;color:#afafaf;">
                  <div>2021-1-8</div>
              </div>
          </div>
      </div>
      <div v-if="item.object&&item.messageLinkType==0" class="d-flex flex-column justify-content-around p-2" style="height:100px;background:#dedede;">
          <div class="text-left"></div>
          <hr class="w-100 m-1">
          <div class="nowrap overflow-hidden" style="font-size:13px;color:#afafaf;text-align:left;white-space:nowrap;text-overflow:ellipsis;">
            {{item.userName2}}<span class="mx-1">·</span>{{item.object.dynamic_content}}
          </div>
          <div class="d-flex" style="font-size:13px;color:#afafaf;">
            <div>{{item.object.dynamicComments}}评论</div>
            <div>{{item.object.dynamicLikes}}喜欢</div>
          </div>
      </div>
      <div v-if="item.object&&item.messageLinkType==1" class="d-flex flex-column justify-content-around p-2" style="height:100px;background:#dedede;">
          <div class="text-left"></div>
          <hr class="w-100 m-1">
          <div class="nowrap overflow-hidden" style="font-size:13px;color:#afafaf;text-align:left;white-space:nowrap;text-overflow:ellipsis;">
            {{item.userName2}}<span class="mx-1">·</span>{{item.object.comment_content}}
          </div>
      </div>
      <div v-if="item.object&&item.messageLinkType==2" class="d-flex flex-column justify-content-around p-2" style="height:100px;background:#dedede;">
          <div class="text-left"></div>
          <hr class="w-100 m-1">
          <div class="nowrap overflow-hidden" style="font-size:13px;color:#afafaf;text-align:left;white-space:nowrap;text-overflow:ellipsis;">
            {{item.userName2}}<span class="mx-1">·</span>{{item.object.reply_content}}
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
        messageType:3
      },
      success(data){
        console.log(data);
        that.messages = JSON.parse(data);
      }
    });
  }
}
</script>

<style>

</style>