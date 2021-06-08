<template>
  <div>
    <top-bar title="答疑详情" path="wall"></top-bar>
    <router-link to="/postPuzzle" class="btn btn-success">发起提问</router-link>
    <div v-for="item in items" :key="item.id">
            <div class="my-3">
        <div class="d-flex justify-content-between">
            <div class="d-flex">
                <router-link :to="{name:'personalDetail',params:{id:item.userId}}" id="image" style="width:50px;height:50px;border-radius:50%;" class="bg-success text-center pt-3">头像</router-link>
                <div class="mx-3">
                  <div class="text-left">{{item.userId}}</div>
                  <div style="font-size:13px">{{item.gmtCreate}}</div>
                </div>
            </div>
            <div>{{item.userSchool}}</div>
        </div>
        <div>
            <div>{{item.puzzleTitle}}</div>
            <div>{{item.puzzleContent}}</div>
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
      items:{}
    }
  },
  components: { topBar },
  mounted(){

    const that = this;
    $.ajax({
      url:"http://localhost/queryAllPuzzle",
      method:"post",
      data:{
        userId:JSON.parse(localStorage.getItem("user")).user_id
      },
      success(data){
          console.log(data);
          that.items = JSON.parse(data);
      }
    });
  }
}
</script>

<style>

</style>