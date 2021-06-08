<template>
  <div class="pt-3">
    <div class="mx-3" v-for="friend in friends" :key="friend.id">
      <div class="d-flex">
        <router-link :to="{path:'/personalDetail',query:{id:friend.userId,returnPath:'/followers'}}" id="image" :style="{backgroundImage: 'url(http://localhost/' + friend.userImage + ')'}" class="bg-success text-center pt-3"></router-link>
        <div class="d-flex flex-grow-1 justify-content-between">
          <div class="mr-3">
            <div style="font-size:14px">{{friend.userName}}</div>
            <div style="font-size:10px;color:rgb(172, 170, 170)">{{friend.userSignature}}</div>
          </div>
          <div style="font-size:12px">
            <div>{{friend.userSchool}}</div>
            <div>关注</div>
          </div>
        </div>
      </div>
      <hr class="w-100 my-1">
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      friends:[],
      user:{}
    }
  },
  activated(){
    this.user = JSON.parse(localStorage.getItem('user'));
    let data = {
      userId:this.user.userId
    }
    this.$axios.post('http://localhost/getFollowers',this.$qs.stringify(data))
    .then((res)=>{
      this.friends = JSON.parse(JSON.stringify(res.data));
    })
    .catch((err)=>{
      console.log('friend.vue:'+err);
    })
  }
}
</script>

<style>

</style>