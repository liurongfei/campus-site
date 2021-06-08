<template>
  <div>
    <top-bar title="表白" path="wall"></top-bar>
    <router-link to="/postConfession" class="btn btn-success">发起表白</router-link>
    <div v-for="item in items" :key="item.id">
            <div class="my-3">
        <div class="d-flex justify-content-between">
            <div class="d-flex">
                <router-link :to="{name:'personalDetail',params:{id:item.user_id}}" id="image" style="width:50px;height:50px;border-radius:50%;" class="bg-success text-center pt-3">头像</router-link>
                <div class="mx-3">
                  <div class="text-left">{{item.confessionId}}</div>
                  <div style="font-size:13px">{{item.gmtCreate}}</div>
                </div>
            </div>
            <div>{{item.userSchool}}</div>
        </div>
        <div>
            <div>用户{{item.confessionUserId1}}表白用户{{item.confessionUserId2}}</div>
        </div>
                <div class="d-flex">
            <div>
              <span v-if="item.isLike" class="btn btn-danger mx-3" @click="like(item.confessionId,index,$event)">点赞{{item.confessionLikes}}</span>
              <span v-else class="btn btn-success mx-3" @click="like(item.confessionId,index,$event)">点赞{{item.confessionLikes}}</span>
            </div> 
            <div><router-link :to="{name:'updateDetail',params:{id:item.dynamic_id}}" class="btn btn-success mx-3">评论数：{{item.confessionComments}}</router-link> </div>
            <div v-if="item.user_id == user.user_id" class="btn btn-danger" @click="deleteDynamic(item.confessionId)">删除</div>
        </div>
        <hr class="w-100 mb-0 mt-3">
      </div>
    </div>
  </div>
</template>

<script>
import topBar from '../../topBar.vue';
export default {
  data(){
    return {
      items:{},
      user:{}
    }
  },
  components: { topBar },
  mounted(){
    this.user = JSON.parse(localStorage.getItem("user")).user_id;
    const that = this;
    $.ajax({
      url:"http://localhost/queryAllConfession",
      method:"post",
      data:{
        userId:that.user
      },
      success(data){
          console.log(data);
          that.items = JSON.parse(data);
      }
    });
  },
  methods:{
        like:function(id,index,event){
      console.log("点赞成功！id:"+id);
      console.log(this.updates[index]);
      console.log(this.updates[index].dynamicLikes);
      if($(event.currentTarget).hasClass("btn-danger")){
        $(event.currentTarget).addClass("btn-success").removeClass("btn-danger");
        this.$set(this.updates[index],'dynamicLikes',this.updates[index].dynamicLikes-1);
      }else {
        $(event.currentTarget).addClass("btn-danger").removeClass("btn-success");
        this.$set(this.updates[index],'dynamicLikes',this.updates[index].dynamicLikes+1);
      }
      
      $.ajax({
          url:"http://localhost/giveLike",
          method:"post",
          data:{
            userId:this.user.user_id,
            workType:0,
            workId:id
          }
      });
    },
  }
}
</script>

<style>

</style>