<template>
<div>
    <top-bar title="详情" path="/update"></top-bar>
        <div class="my-3">
        <div class="d-flex justify-content-between">
            <div class="d-flex">
                <div id="image" style="width:50px;height:50px;border-radius:50%;" class="bg-success text-center pt-3">头像</div>
                <div class="mx-3">
                  <div class="text-left">{{item.userName}}</div>
                  <div style="font-size:13px">{{item.gmt_create}}</div>
                </div>
            </div>
            <div>{{item.userSchool}}</div>
        </div>
        <div>
            <div>{{item.dynamic_content}}</div>
        </div>
        <div class="d-flex align-items-center">
            <div>
              <span v-if="item.isLike" class="btn btn-danger mx-3" @click="like(item.dynamic_id,index,$event)">点赞{{item.dynamicLikes}}</span>
              <span v-else class="btn btn-success mx-3" @click="like(item.dynamic_id,index,$event)">点赞{{item.dynamicLikes}}</span>
            </div> 
            <div><span class="btn btn-success mx-3">评论数：{{item.dynamicComments}}</span> </div>
            <div><span class="btn btn-success mx-3">转发{{item.dynamicForwards}}</span></div>
            <div v-if="item.user_id == user.user_id" class="btn btn-danger" @click="deleteDynamic(item.dynamic_id)">删除</div>
        </div>
        <hr class="w-100 mb-0 mt-3">
    </div>
</div>
  
</template>

<script>
import topBar from '../topBar.vue'
export default {
  components: { topBar },
    data(){
        return {
            user:{},
            item:{}
        }
    },
    activated(){
        this.user = JSON.parse(localStorage.getItem("user"));
        const that = this;
        console.log(that.$route.params.id);
        $.ajax({
          url:"http://localhost/dynamicDetail",
          method:"post",
          data:{
            dynamicId:that.$route.params.id,
            userId:that.user.user_id
          },
          success(data){
              that.item = JSON.parse(data);
              console.log("详情："+that.item);
          }
        });
    }
}
</script>

<style>

</style>