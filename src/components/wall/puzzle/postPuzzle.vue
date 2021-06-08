<template>
  <div>
    <div class="d-flex">
        <router-link to="/puzzle" class="btn btn-success align-self-start">返回</router-link>
        <div @click="post" style="margin-left: auto;" class="btn btn-success">发表</div>
      </div>
      <div class="my-3 p-2">
          <div>问题标题<input type="text" v-model="title"></div>
      <div>问题详情<input type="text" v-model="content"></div>
      </div>

  </div>
</template>

<script>
export default {
    data(){
        return {
            user:{},
            title:"",
            content:""
        }
    },
    methods:{
        post(){
            this.user = JSON.parse(localStorage.getItem("user"));
            const that = this;
            $.ajax({
                url:"http://localhost/postPuzzle",
                method:"post",
                data:{
                    userId:that.user.user_id,
                    puzzleTitle:that.title,
                    puzzleContent:that.content
                },
                success(data){
                    console.log(data);
                    that.$router.push('/puzzle');
                }
            })
        }
    }
}
</script>

<style>

</style>