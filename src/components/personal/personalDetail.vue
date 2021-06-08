<template>
<div style="overflow:auto;" class="">
    <div class="w-100 bg-info d-flex align-items-center" style="height:50px">
    <span class="text-left flex-grow-1">
        <router-link :to="returnPath" class="row m-0 py-3">
        <svg t="1610188993314" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2903" width="50" height="50"><path d="M694.272 809.024l-295.808-286.848 295.36-274.752a32 32 0 0 0-43.616-46.848l-320 297.696a32 32 0 0 0-0.512 46.4l320 310.304a32.032 32.032 0 0 0 44.576-45.952" p-id="2904" fill="#ffffff"></path></svg>
        </router-link>
    </span>
     <span class="text-center flex-grow-1"></span>
     <span class="flex-grow-1"></span>
  </div>
<div>
<div style="height:100px;line-height:100px;background-color:#dddddd;position:relative;" class="w-100 text-center">
    设置封面图片
    <input type="file" accept="image/*" style="height:100px;width:100%;opacity:0;position:absolute;left:0;top:0;">
</div>
<div class="px-3 pt-3 bg-white" style="border-radius:10px 10px 0 0;border:none;margin-top:-10px">
    <div class="mb-3 d-flex justify-content-end align-items-center position-relative">
        <div id="headImage" class="bg-success text-center" :style="{backgroundImage: 'url(http://localhost/' + user.userImage + ')'}">
            <input type="file" id="headImage-file" accept="image/*">
        </div>
        <span v-if="!user.userGender" class="mr-4 badge badge-primary">♂ {{user.userAge}}天枰座</span>
        <span v-else class="mr-4 badge" style="background-color:pink">♀ {{user.userAge}}天枰座</span>
        <router-link to="/editPerson" v-show="user.userId == localUser.userId" class="btn btn-primary px-3 py-1" style="height:30px;width:90px;font-size:13px">编辑资料</router-link>
        <div @click="cancelFollow" v-show="user.userId != localUser.userId&&isFollow" class="btn btn-info px-3 py-1" style="height:30px;width:90px;font-size:13px">已关注</div>
        <div @click="follow"  v-show="user.userId != localUser.userId&&!isFollow" class="btn btn-primary px-3 py-1" style="height:30px;width:90px;font-size:13px">关注</div>
    </div>
    <div class="d-flex">
        <div>
            <div style="font-size:20px" class="mr-3">{{user.userName}}</div>
            <div style="font-size:14px">“{{user.userSignature}}”</div>
        </div>
    </div>
    <div>
        <div></div>
        <div>{{user.user_province}} <span class="mx-1"></span> {{user.user_city}}</div>
        <div>
            <span v-if="user.userEmotionStatus ==0">单身</span>
            <span v-if="user.userEmotionStatus ==1">恋爱中</span>
            <span v-if="user.userEmotionStatus ==2">保密</span>
        </div>
        <div>
            <div></div>
            <div>{{user.userSchool}}</div>
        </div>
        <div>{{user.userGrade}}级</div>
    </div>
</div>
</div>
</div>
</template>

<script>
import topBar from '../topBar.vue';
export default {
    components: { topBar },
    data(){
        return {
            returnPath:"/personal",
            user:{},
            localUser:{},
            isFollow:false,
        }
    },
    mounted(){
        console.log("mounted");
    },
    activated(){
        console.log("personalDetail:activated");
        this.returnPath = this.$route.query.returnPath;
        this.localUser = JSON.parse(localStorage.getItem('user'));
        let data = {
            userId:this.$route.query.id,
            localUser:this.localUser.userId,
        };
        this.$axios.post('http://localhost/user/findById',this.$qs.stringify(data))
        .then((res)=>{
            if(res.status == 200){
                this.user = res.data.user;
                this.isFollow = res.data.isFollow;
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    },
    deactivated(){
        console.log("deactivated");
    },
    methods:{
        follow(){
            let data = {
                followId:this.$route.query.id,
                userId:this.localUser.userId,
            };
            this.$axios.post('http://localhost/follow',this.$qs.stringify(data))
            .then((res)=>{
                if(res.status == 200){
                    this.isFollow = true;
                    localStorage.setItem("user",JSON.stringify(res.data));
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        cancelFollow(){
            let data = {
                followId:this.$route.query.id,
                userId:this.localUser.userId,
            };
            this.$axios.post('http://localhost/cancelFollow',this.$qs.stringify(data))
            .then((res)=>{
                if(res.status == 200){
                    this.isFollow = false;
                    localStorage.setItem("user",JSON.stringify(res.data));
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        },
    }
}
</script>

<style scoped>
#headImage{
    position:absolute;
    top:-35px;
    left:0;
    width:75px;
    height:75px;
    border:1px white solid;
    border-radius:50%;
    line-height:125px;
    background-size: cover;
    background-position: center;
}
#headImage-file{
    width:75px;
    height:75px;
    opacity: 0;
}
</style>