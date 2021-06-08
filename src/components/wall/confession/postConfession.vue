<template>
  <div>
    <div class="d-flex">
        <router-link to="/mutual" class="btn btn-success align-self-start">返回</router-link>
        <div @click="post" style="margin-left: auto;" class="btn btn-success">发表</div>
      </div>
      <div class="my-3 p-2">
          <div>表白对象id：<input type="text" v-model="userId2"></div>
      <div>表白内容<input type="text" v-model="content"></div>
      </div>

  </div>
</template>

<script>
export default {
    data(){
        return {
            userId2:0,
            content:""
        }
    },
    methods:{
        post(){
            console.log("user:"+JSON.parse(localStorage.getItem("user")));
            const that = this;
            $.ajax({
                url:"http://localhost/postConfession",
                method:"post",
                data:{
                    userId1:JSON.parse(localStorage.getItem("user")).user_id,
                    userId2:that.userId2,
                    confessionContent:that.content,
                },
                success(data){
                    console.log(data);
                    that.$router.push('/confession');
                }
            })
        }
    }
}
</script>

<style>

</style>