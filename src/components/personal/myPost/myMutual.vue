<template>
  <div>
    <div class="card my-3" v-for="item in mutual" :key="item.id">
        <div class="card-header d-flex justify-content-between">
            <div class="d-flex">
                <div class="mx-3">
                  <div>{{item.mutual_title}}</div>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div>{{item.mutual_content}}</div>
        </div>
        <div class="card-footer d-flex">
            <div class="btn btn-danger" @click="deleteDynamic(item.mutual_id)">删除</div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
        mutual:[]
    }
  },
  mounted(){
      var user = JSON.parse(localStorage.getItem("user"));
      const that = this;
      console.log("开始执行动态");
      $.ajax({
        url:"http://localhost/checkMutual",
        method:"post",
        data:{
            userId:user.user_id,
        },
        success(data){
            console.log("开始输出互助项目内容:"+data);
            if(data){
                that.mutual = JSON.parse(data);
            }
        }
      });
  },
  methods:{
    deleteDynamic:function(id){
      console.log("当前要删除的id是："+id);
      const that = this;
      $.ajax({
        url:"http://localhost/deleteMutual",
        method:"post",
        data:{
            mutual_id:id,
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