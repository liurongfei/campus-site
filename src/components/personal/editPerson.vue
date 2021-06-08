<template>
<div>
  <div class="w-100 bg-info d-flex align-items-center" style="height:50px">
    <span class="text-left flex-grow-1">
        <router-link :to="{path:'/personalDetail',query:{id:user.userId,returnPath:'/personal',}}" class="row m-0">
        <svg t="1610188993314" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2903" width="50" height="50"><path d="M694.272 809.024l-295.808-286.848 295.36-274.752a32 32 0 0 0-43.616-46.848l-320 297.696a32 32 0 0 0-0.512 46.4l320 310.304a32.032 32.032 0 0 0 44.576-45.952" p-id="2904" fill="#ffffff"></path></svg>
        </router-link>
    </span>
     <span class="text-center flex-grow-1">编辑个人资料</span>
     <span @click="save" class="mx-2" style="font-size:;color:white;">保存</span>
  </div>
  <div class="px-3">
    <div id="headImage2" class="bg-success text-center my-3">
        <input type="file" ref="file" id="headImage-file2" accept="image/*" @change="imageChange($event)">
        <img :src="imagePath" alt="" ref="img" id="img">
    </div>
      <div class="">
          <div>
              <div class="d-flex justify-content-between align-items-center">
                  <span>昵称</span>
                  <input class="" v-model="user.userName" type="text">
              </div>
              <hr class="w-100 my-2">
          </div>
          <div>
              <div class="d-flex justify-content-between align-items-center">
                  <span>签名</span>
                  <input  v-model="user.userSignature" type="text">
              </div>
              <hr class="w-100 my-2">
          </div>
          <div>
              <div class="d-flex justify-content-between align-items-center">
                  <span>感情状态</span>
                  <label for=""><input  type="radio" value="0" name="emotion" v-model="user.userEmotionStatus">单身</label>
                  <label for=""><input  type="radio" value="1" name="emotion" v-model="user.userEmotionStatus">恋爱中</label>
                  <label for=""><input  type="radio" value="2" name="emotion" v-model="user.userEmotionStatus">保密</label>
              </div>
              <hr class="w-100 my-2">
          </div>
          <div>
              <div class="d-flex justify-content-between align-items-center">
                  <span>生日</span>
                  <input class="" v-model="user.userBirthday" type="date">
              </div>
              <hr class="w-100 my-2">
          </div>
          <div>
              <div class="d-flex justify-content-between align-items-center">
                  <span>家乡</span>
                  <select name="" id="" v-model="user.userProvince" @change="changeProvince">
                      <option :value="province.province" v-for="province in provinces" :key="province.id">{{province.province}}</option>
                  </select>
                  <select name="" id="" v-model="user.userCity">
                      <option :value="city.city" :selected="city.selected" v-for="city in cities" :key="city.id">{{city.city}}</option>
                  </select>
              </div>
              <hr class="w-100 my-2">
          </div>
          <div>
              <div class="d-flex justify-content-between align-items-center">
                  <span>学院</span>
                  <input class="" v-model="user.userDept" type="text">
              </div>
              <hr class="w-100 my-2">
          </div>
          <div>
              <div class="d-flex justify-content-between align-items-center">
                  <span>专业</span>
                  <input class="" v-model="user.userMajor" type="text">
              </div>
              <hr class="w-100 my-2">
          </div>
      </div>
  </div>
</div>
</template>

<script>
export default {
    data(){
        return {
            user:{},
            provinces:[],
            cities:[],
            imagePath:"",
        }
    },
    mounted(){
        this.user = JSON.parse(localStorage.getItem('user'));
        this.imagePath = "http://localhost/"+this.user.userImage;
        this.$axios.post('http://localhost/user/getProvince')
        .then((res)=>{
            this.provinces = JSON.parse(JSON.stringify(res.data));
        })
        .catch((err)=>{
            console.log(err);
        })

        let data = {
            province:this.user.userProvince
        };
        this.$axios.post('http://localhost/user/getCity',this.$qs.stringify(data))
        .then((res)=>{
                this.cities = JSON.parse(JSON.stringify(res.data));
        })
        .catch((err)=>{
            console.log(err);
        })
    },
    methods:{
        changeProvince(){
            let data = {
                province:this.user.userProvince
            };
            this.$axios.post('http://localhost/getCity',this.$qs.stringify(data))
            .then((res)=>{
                 this.cities = JSON.parse(JSON.stringify(res.data));
                 this.user.city = this.cities[0].city;
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        save(){
            let formdata = new FormData();
            formdata.append("file",this.$refs.file.files[0]);
            formdata.append("userId",this.user.userId);
            formdata.append("userName",this.user.userName);
            formdata.append("userSignature",this.user.userSignature);
            formdata.append("userEmotionStatus",this.user.userEmotionStatus);
            formdata.append("userBirthday",this.user.userBirthday);
            formdata.append("userProvince",this.user.userProvince);
            formdata.append("userCity",this.user.userCity);
            formdata.append("userDept",this.user.userDept);
            formdata.append("userMajor",this.user.userMajor);
            console.log("formdate数据为："+formdata);
            this.$axios.post('http://localhost/updateUser',formdata,{
                headers:{"Content-Type":"multipart/form-data"}
            })
            .then((res)=>{
                 localStorage.setItem('user',JSON.stringify(res.data));
                 this.$router.push({path:'/personalDetail',query:{id:this.user.userId,returnPath:'/personal',isUpdate:true}});
            })
            .catch((err)=>{
                console.log(err);
            });
        },
        imageChange(e){
            let path = $(e.currentTarget).val();
            var url = null;
            if(window.createObjectURL!=undefined){
                url = window.createObjectURL(e.currentTarget.files[0]);
            }else if(window.URL!=undefined){
                url = window.URL.createObjectURL(e.currentTarget.files[0]) ;
            }else if(window.webkitURL!=undefined){
                url = window.webkitURL.createObjectURL(e.currentTarget.files[0]) ;
            }
            this.$refs.img.src = url;
        },
    }
}
</script>

<style>
#headImage2{
    position: relative;
    width:75px;
    height:75px;
    border:1px white solid;
    border-radius:50%;
    background-size: cover;
    background-position: center;
}
#headImage-file2{
    width:75px;
    height:75px;
    position:absolute;
    left: 0;
    top: 0;
    opacity: 0;
}
#img{
    border-radius:50%;
    width:75px;
    height:75px;
}
input{
    border:none;
}
input:focus{
    outline: none;
}
</style>