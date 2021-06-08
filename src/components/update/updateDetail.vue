<template>
<div id="updateDetail">
    <top-bar title="详情" path="/update"></top-bar>

    <!-- 动态信息 -->
    <div class="my-3 p-3">
        <!-- 用户信息 -->
        <div class="d-flex justify-content-between">
            <div class="d-flex align-items-center">
                <router-link :to="{path:'/personalDetail',query:{id:item.userId,returnPath:'/updateDetail'}}" id="image" :style="{backgroundImage: 'url(http://localhost/' + item.userImage + ')'}" class="bg-success text-center pt-3"></router-link>
                <div class="mx-3">
                  <div class="text-left">{{item.userName}}</div>
                  <div style="font-size:13px">{{item.gmtCreate}}</div>
                </div>
            </div>
            <div>{{item.userSchool}}</div>
        </div>
        <!-- 动态内容 -->
        <div>
            <div>{{item.dynamicContent}}</div>
            <div class="row">
              <div class="col-4 my-2 " v-for="img in item.imagePath" :key="img.id" >
                <div class="update-img" :style="{backgroundImage: 'url(http://localhost/' + img + ')'}"></div>
              </div>
            </div>
        </div>
        <!-- 点赞数  评论数 删除 -->
        <div class="d-flex align-items-center">
            <div>
              <span v-show="item.isLike" class="fa fa-thumbs-up mx-3" @click="like(item.dynamicId,0,0,$event,0)">{{item.dynamicLikes}}</span>
              <span v-show="!item.isLike" class="fa fa-thumbs-o-up mx-3" @click="like(item.dynamicId,0,0,$event,0)">{{item.dynamicLikes}}</span>
            </div> 
            <div><span class="fa fa-commenting-o mx-3">{{item.dynamicComments}}</span> </div>
            <div v-show="item.userId == user.userId" class="" @click="deleteDynamic(item.dynamicId)">删除</div>
        </div>
        <hr class="w-100 mb-0 mt-3">
    </div>

<!-- =================================评论========================================== -->
    <div class="p-3 pb-5">
        <div v-for="(comment,index) in comments" :key="comment.id">
            <div class="d-flex align-items-center">
            <router-link :to="{path:'/personalDetail',query:{id:comment.userId,returnPath:'/updateDetail'}}" id="image" style="width:50px;height:50px;border-radius:50%;" class="bg-success text-center pt-3">头像</router-link>
            <div class="d-flex align-items-center justify-content-between flex-grow-1">
                <div>
                    <div v-show="comment.userName">{{comment.userName}}</div>
                    <div v-show="!comment.userName">匿名用户</div>
                    <div>{{comment.commentContent}}</div>
                    <div class="d-flex">
                        <div>{{comment.gmtCreate}}</div>
                        <div @click="clickReply(comment.commentId,comment.userName,comment.userId)">回复</div>
                    </div>
                </div>
                <span v-show="comment.isLike==1" class="fa fa-thumbs-up mx-3" @click="like(comment.commentId,3,index,$event,0)">{{comment.commentLikes}}</span>
                <span v-show="comment.isLike==0" class="fa fa-thumbs-o-up mx-3" @click="like(comment.commentId,3,index,$event,0)">{{comment.commentLikes}}</span>
                <div v-show="comment.userId == user.userId" class="" @click="deleteComment(comment.commentId)">删除</div>
            </div>
            </div>

           <!--======== 回复=================================== -->
            <div class="mx-5">
                <div v-for="(reply) in comment.replyList" :key="reply.id">
                    <div class="d-flex">
                        <router-link :to="{path:'/personalDetail',query:{id:reply.user_id,returnPath:'/updateDetail'}}" id="image" style="width:25px;height:25px;border-radius:50%;" class="bg-success text-center pt-3"></router-link>
                        <div class="d-flex justify-content-between flex-grow-1">
                            <div>
                                <div v-show="reply.userId1">{{reply.userName1}} <span> > {{reply.userName2}}</span> </div>
                                <div v-show="!reply.userId1">匿名用户</div>
                                <div>{{reply.replyContent}}</div>
                                <div class="d-flex">
                                    <div>{{reply.gmtCreate}}</div>
                                    <div @click="clickReply(comment.commentId,reply.userName1,reply.userId1)">回复</div>
                                    <span v-show="comment.isLike==1" class="fa fa-thumbs-up mx-3" @click="like(reply.replyId,4,index,$event,reply)">{{reply.replyLikes}}</span>
                                    <span v-show="comment.isLike==0" class="fa fa-thumbs-o-up mx-3" @click="like(reply.replyId,4,index,$event,reply)">{{reply.replyLikes}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr class="w-100 mb-0 mt-3">
                </div>
            </div>
            <hr class="w-100 mb-0 mt-3">
        </div>
    </div>
    <div class="fixed-bottom w-100">
        <input v-show="replyTo!=''" type="text" :placeholder="'回复：'+replyTo" v-model="postReplyContent">
        <button v-show="replyTo!=''" class="btn btn-success" @click="reply()">发送回复</button>

        <input v-show="replyTo==''" type="text" v-model="postCommentContent">
        <button v-show="replyTo==''" class="btn btn-success" @click="post">发送</button>
    </div>
</div>
  
</template>

<script>
import topBar from '../topBar.vue'
export default {
  components: { topBar },
    data(){
        return {
            user:{},
            item:{},
            comments:[],
            postCommentContent:"",
            replyTo:"",
            replyId:0,
            replyUserId:0,
            postReplyContent:"",
            replyLikeNum:0,
        }
    },
    mounted(){
    },
    activated(){
        console.log("哈哈哈");
        this.user = JSON.parse(localStorage.getItem("user"));
        const that = this;
        if(that.$route.query.id){
            this.getDetail();
            this.getComments();            
        }
    },
    methods:{
        getDetail(){
            let data = {
                dynamicId:this.$route.query.id,
                userId:this.user.userId
            };
            this.$axios.post('http://localhost/dynamic/detail',this.$qs.stringify(data))
            .then((res)=>{
                if(res.status == 200){
                    this.item = res.data;
                    console.log("详情："+this.item);
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        },  
        getComments(){
            let data = {
                workId:this.$route.query.id,
                workType:0,
            };
            this.$axios.post('http://localhost/comment/getAll',this.$qs.stringify(data))
            .then((res)=>{
                if(res.status == 200){
                    this.comments = res.data;
                    console.log("详情："+this.comments);
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        post(){
            let data = {
                workId:this.$route.query.id,
                workType:0,
                userId:this.user.userId,
                commentContent:this.postCommentContent
            };
            this.$axios.post('http://localhost/comment/post',this.$qs.stringify(data))
            .then((res)=>{
                if(res.status == 200){
                this.getComments();
                this.$set(that.item,'dynamicComments',that.item.dynamicComments+1)
                this.postCommentContent = "";
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        clickReply(id,name,userId){
            this.replyTo = name;
            this.replyId = id;
            this.replyUserId = userId;
            console.log("回复用户："+this.replyTo);
        },
        reply(){
            let data = {
                commentId:this.replyId,//评论id
                userId1:this.user.userId,//回复用户id
                userId2:this.replyUserId,//被回复用户id
                replyContent:this.postReplyContent//回复内容
            };
            this.$axios.post('http://localhost/reply/post',this.$qs.stringify(data))
            .then((res)=>{
                if(res.status == 200){
                this.postReplyContent = "";    
                this.getComments();
                this.replyTo = "";
                this.replyId = "";
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        like:function(id,type,index,event,reply){
        const that = this;
        console.log("点赞成功！id:"+id);
        if(type == 3){
            console.log("点赞评论");
            if($(event.currentTarget).hasClass("fa-thumbs-up")){
                $(event.currentTarget).addClass("fa-thumbs-o-up").removeClass("fa-thumbs-up");
                that.$set(that.comments[index],'commentLikes',that.comments[index].commentLikes-1);
            }else {
                $(event.currentTarget).addClass("fa-thumbs-up").removeClass("fa-thumbs-o-up");  
                that.$set(that.comments[index],'commentLikes',that.comments[index].commentLikes+1);     
            }
            let data = {
                    userId:this.user.userId,
                    workType:3,
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
        }else if(type == 0){
            console.log("点赞动态");
            if($(event.currentTarget).hasClass("fa-thumbs-up")){
                $(event.currentTarget).addClass("fa-thumbs-o-up").removeClass("fa-thumbs-up");
                this.$set(this.item,'dynamicLikes',this.item.dynamicLikes-1);
            }else {
                $(event.currentTarget).addClass("fa-thumbs-up").removeClass("fa-thumbs-o-up");  
                that.$set(that.item,'dynamicLikes',that.item.dynamicLikes+1); 
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

        }else {
            console.log("点赞回复");
            if($(event.currentTarget).hasClass("fa-thumbs-up")){
                $(event.currentTarget).addClass("fa-thumbs-o-up").removeClass("fa-thumbs-up");
                this.$set(this.comments,'replyList',this.$set(reply,'replyLikes',reply.replyLikes-1));
            }else {
                $(event.currentTarget).addClass("fa-thumbs-up").removeClass("fa-thumbs-o-up");
                this.$set(this.comments,'replyList',this.$set(reply,'replyLikes',reply.replyLikes+1));
            }

            let data = {
                    userId:this.user.userId,
                    workType:4,
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

        }

        },
        deleteDynamic:function(id){

            let data = {
                id:id
            };
            this.$axios.post('http://localhost/dynamic/delete',this.$qs.stringify(data))
            .then((res)=>{
                if(res.status == 200){
                    this.$router.push("/update");
                }
            })
            .catch((err)=>{
                console.log(err);
            })

        },
        deleteComment(id){
            this.$set(this.item,"dynamicComments",this.item.dynamicComments-1);

            let data = {
                commentId:id
            };
            this.$axios.post('http://localhost/comment/delete',this.$qs.stringify(data))
            .then((res)=>{
                if(res.status == 200){
                    this.getComments();
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
.update-img{
  width:110px;
  height:110px;
  background-size: cover;
  background-position: center;
}
#image{
  width:50px;
  height:50px;
  border-radius:50%;
  background-size: cover;
  background-position: center;
}
</style>