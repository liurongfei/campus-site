<template>
  <div>
    <div class="d-flex">
        <router-link to="/mutual" class="btn btn-success align-self-start">返回</router-link>
        <div @click="post" style="margin-left: auto;" class="btn btn-success">发表</div>
      </div>
      <div class="my-3 p-2">
          <div>打卡目标：<input type="text" v-model="title"></div>
      <div>打卡描述<input type="text" v-model="content"></div>
      </div>

  </div>
</template>

<script>
export default {
    data(){
        return {
            title:"",
            content:""
        }
    },
    methods:{
        post(){
            const that = this;
            $.ajax({
                url:"http://localhost/postTarget",
                method:"post",
                data:{
                    userId:JSON.parse(localStorage.getItem("user")).user_id,
                    clock_in_target_title:that.title,
                    clock_in_target_content:that.content,
                },
                success(data){
                    console.log(data);
                    that.$router.push('/colckIn');
                }
            })
        }
    }
}
</script>

<style>

</style>