<template>
  <div>
    <div class="card my-3" v-for="item in confession" :key="item.id">
        <div class="card-header d-flex justify-content-between">
            <div class="d-flex">
                <div id="image" style="width:50px;height:50px;border-radius=50%;" class="bg-success text-center pt-3">头像</div>
                <div class="mx-3">
                  <div>{{item.confessionUserId1}}风</div>
                  <div style="font-size:13px">{{item.gmt_create}}</div>
                </div>
            </div>
            <div>=====表白======></div>
            <div class="d-flex">
                <div id="image" style="width:50px;height:50px;border-radius=50%;" class="bg-success text-center pt-3">头像</div>
                <div class="mx-3">
                  <div>{{item.confessionUserId2}}风</div>
                  <div style="font-size:13px">{{item.gmt_create}}</div>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div>{{item.confessionContent}}</div>
        </div>
        <div class="card-footer d-flex">
            <div><span class="btn btn-success mx-3">点赞{{item.confessionLikes}}</span></div> 
            <div><span class="btn btn-success mx-3">评论数：{{item.confessionComments}}</span> </div>
            <div class="btn btn-danger" @click="deleteDynamic(item.confessionId)">删除</div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
        confession:[]
    }
  },
  mounted(){
      var user = JSON.parse(localStorage.getItem("user"));
      const that = this;
      console.log("开始执行动态");
      $.ajax({
        url:"http://localhost/queryAllConfession",
        method:"post",
        data:{
            userId:user.user_id,
        },
        success(data){
            console.log("开始输出表白内容:"+data);
            if(data){
                that.confession = JSON.parse(data);
            }
        }
      });
  },
  methods:{
    deleteDynamic:function(id){
      console.log("当前要删除的id是："+id);
      const that = this;
      $.ajax({
        url:"http://localhost/deleteConfession",
        method:"post",
        data:{
            confessionId:id,
        },
        success(data){
            that.$router.go(0);
        }
      });
     }
  }
}
</script>

<style>
#image{
  border-radius: 50%;
  width: 50px;
  height:50px;
}
</style>