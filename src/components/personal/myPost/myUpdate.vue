<template>
  <div>
    <div class="card my-3" v-for="item in updates" :key="item.id">
        <div class="card-header d-flex justify-content-between">
            <div class="d-flex">
                <div id="image" style="width:50px;height:50px;border-radius=50%;" class="bg-success text-center pt-3">头像</div>
                <div class="mx-3">
                  <div>{{item.user_id}}风</div>
                  <div style="font-size:13px">{{item.gmt_create}}</div>
                </div>
            </div>
            <div>这是学校</div>
        </div>
        <div class="card-body">
            <div>{{item.dynamic_content}}</div>
        </div>
        <div class="card-footer d-flex">
            <div><span class="btn btn-success mx-3">点赞{{item.dynamicLikes}}</span></div> 
            <div><span class="btn btn-success mx-3">评论数：{{item.dynamicForwards}}</span> </div>
            <div><span class="btn btn-success mx-3">转发{{item.dynamicLikes}}</span></div>
            <div class="btn btn-danger" @click="deleteDynamic(item.dynamic_id)">删除</div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
        updates:[]
    }
  },
  mounted(){
      var user = JSON.parse(localStorage.getItem("user"));
      const that = this;
      console.log("开始执行动态");
      $.ajax({
        url:"http://localhost/checkDynamic",
        method:"post",
        data:{
            userId:user.user_id,
        },
        success(data){
            if(data){
                that.updates = JSON.parse(data);
            }
        }
      });
  },
  methods:{
    deleteDynamic:function(id){
      console.log("当前要删除的id是："+id);
      const that = this;
      $.ajax({
        url:"http://localhost/deleteDynamic",
        method:"post",
        data:{
            id:id,
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