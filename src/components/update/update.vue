<template>
  <div id="update" style="overflow:auto;" class="p-3">
    <div class="d-flex">
      <input type="serarch" name="" id="">
    <router-link to="/postUpdate">
    <svg t="1611639766889" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2935" width="25" height="25"><path d="M512 0C230.4 0 0 230.4 0 512c0 281.6 230.4 512 512 512 281.6 0 512-230.4 512-512C1024 230.4 793.6 0 512 0zM716.8 563.2l-153.6 0 0 153.6c0 30.72-20.48 51.2-51.2 51.2s-51.2-20.48-51.2-51.2l0-153.6L307.2 563.2c-30.72 0-51.2-20.48-51.2-51.2 0-30.72 20.48-51.2 51.2-51.2l153.6 0L460.8 307.2c0-30.72 20.48-51.2 51.2-51.2s51.2 20.48 51.2 51.2l0 153.6 153.6 0c30.72 0 51.2 20.48 51.2 51.2C768 542.72 747.52 563.2 716.8 563.2z" p-id="2936" fill="#0e48e0"></path></svg>
    </router-link>
    </div>
    <div class="my-3" v-for="(item,index) in updates" :key="item.id">

      <!-- 用户头像  用户名 发布时间  学校 -->
        <div class="d-flex justify-content-between">
            <div class="d-flex">
                <router-link :to="{path:'/personalDetail',query:{id:item.userId,returnPath:'/update'}}" id="image" :style="{backgroundImage: 'url(http://localhost/' + item.userImage + ')'}" class="bg-success text-center pt-3"></router-link>
                <div class="mx-3">
                  <div class="tex  t-left">{{item.userName}}</div>
                  <div style="font-size:13px">{{item.gmtCreate}}</div>
                </div>
            </div>
            <div>{{item.userSchool}}</div>
        </div>

        <!-- 动态内容 -->
        <router-link :to="{path:'/updateDetail',query:{id:item.dynamicId}}" class="">
            <div>{{item.dynamicContent}}</div>
            <div class="row">
              <div class="col-4 my-2 " v-for="img in item.imagePath" :key="img.id" >
                <div class="update-img" :style="{backgroundImage: 'url(http://localhost/' + img + ')'}"></div>
              </div>
            </div>
        </router-link>

        <!-- 点赞数  评论数  删除 -->
        <div class="d-flex justify-content-between">
          <div class="d-flex">
            <div>
              <span v-show="item.isLike==1" class="fa fa-thumbs-up mx-3" @click="like(item.dynamicId,index,$event)">{{item.dynamicLikes}}</span>
              <span v-show="item.isLike==0" class="fa fa-thumbs-o-up mx-3" @click="like(item.dynamicId,index,$event)">{{item.dynamicLikes}}</span>
            </div> 
            <div><router-link :to="{path:'/updateDetail',query:{id:item.dynamicId}}" class="fa fa-commenting-o mx-3">{{item.dynamicComments}}</router-link> </div>
          </div>
            <div v-show="item.userId != user.userId" @click="deleteDynamic(item.dynamicId)">删除</div>
        </div>
        <hr class="w-100 mb-0 mt-3">
    </div>
</div>
</template>

<script>
export default {
  data(){
    return {
        updates:[],
        user:{},
        start:0,
        nums:10,
        isOvrt:false,
    }
  },
  created(){
    console.log("这是update中的created");
  },
  activated(){
    console.log("这是update中的activated");
    window.addEventListener('scroll',this.getMoreList);
    console.log(this.$route.query.update);
    if(this.$route.query.update){
      this.start = 0;
      this.getList();
    }
  },
  mounted(){
    console.log("这是update中的mounted");
    this.user = JSON.parse(localStorage.getItem("user"));
    if(!this.$route.query.update){
      this.getList();
    }
  },
  deactivated(){
    console.log("deactivated");
    window.removeEventListener('scroll',this.getMoreList);//监听页面滚动事件
  },
  methods:{
    getList(){
      console.log("获取新数据。。。");
      this.fromNum = 0;
      this.toNum = 10;
      let data = {
            start:this.start,
            nums:this.nums,
            userId:this.user.userId
      };
      this.$axios.post('http://localhost/dynamic/getLatest',this.$qs.stringify(data))
      .then((res)=>{
          if(res.status == 200){
            if(data != "[]"){
              console.log("哈哈");
              console.log(res.data);
              this.start = this.start + this.nums;
              this.updates = res.data;
            }
          }
      })
      .catch((err)=>{
          console.log(err);
      })
    },
    getMoreList(){
      const that = this;
      var scrollHeight = document.documentElement.scrollHeight;
      var scrollTop = document.documentElement.scrollTop;
      var clientHeight = document.documentElement.clientHeight;
      if(scrollHeight<=scrollTop+clientHeight&&this.isOvrt==false){
      let data = {
            start:this.start,
            nums:this.nums,
            userId:this.user.userId
      };

      this.$axios.post('http://localhost/dynamic/getLatest',this.$qs.stringify(data))
      .then((res)=>{
         console.log(res);
          if(res.status == 200){
            if(res.data==""||res.data==null||res.data=="[]"){
              console.log("没有更多数据了");
              this.isOvrt = true;
            }else {
              console.log(res.data);
              this.start = this.start + this.nums;
              this.updates = this.updates.concat(res.data);
            }
          }
      })
      .catch((err)=>{
          console.log(err);
      })
      }
    },
    like:function(id,index,event){
      console.log("点赞成功！id:"+id);
      console.log(this.updates[index]);
      console.log(this.updates[index].dynamicLikes);
      if($(event.currentTarget).hasClass("fa-thumbs-up")){
        $(event.currentTarget).addClass("fa-thumbs-o-up").removeClass("fa-thumbs-up");
        this.$set(this.updates[index],'dynamicLikes',this.updates[index].dynamicLikes-1);
      }else {
        $(event.currentTarget).addClass("fa-thumbs-up").removeClass("fa-thumbs-o-up");
        this.$set(this.updates[index],'dynamicLikes',this.updates[index].dynamicLikes+1);
      }

      let data = {
            userId:this.user.userId,
            workType:0,
            workId:id
      };
      this.$axios.post('http://localhost/giveLike',this.$qs.stringify(data))
      .then((res)=>{
          if(res.status == 200){
              console.log("点赞！");
          }
      })
      .catch((err)=>{
          console.log(err);
      })
    },
    deleteDynamic:function(id){
      let data = {
          id:id 
      };
      this.$axios.post('http://localhost/dynamic/delete',this.$qs.stringify(data))
      .then((res)=>{
          if(res.status == 200){
            that.fromNum = 0;
            that.toNum = 10;
            this.getList();
          }
      })
      .catch((err)=>{
          console.log(err);
      })
    }
  }
}
</script>

<style scoped>
#image{
  width:50px;
  height:50px;
  border-radius:50%;
  background-size: cover;
  background-position: center;
}
#update{
  -ms-overflow-style: none;
  scrollbar-width: none;
}
#update::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
.update-img{
  width:110px;
  height:110px;
  background-size: cover;
  background-position: center;
}
</style>