<template>
  <div class="d-flex justify-content-center align-items-center h-100 w-100" id="login">
    <form style="width:80%;height:80%;" class="d-flex flex-column p-3 align-items-center">
        <div id="user-icon" class="my-5">
            <svg style="position:absolute;left:25%;top:25%" t="1611063350152" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2687" width="50" height="50"><path d="M511.435945 302.584307m-302.584307 0a302.584307 302.584307 0 1 0 605.168614 0 302.584307 302.584307 0 1 0-605.168614 0Z" fill="#d81e06" p-id="2688"></path><path d="M803.763157 603.459098c-23.933222-18.804674-58.123539-17.095159-80.347245 5.128548-54.704508 54.704508-129.923205 88.894825-213.689483 88.894825s-158.984975-34.190317-213.689482-88.894825c-22.223706-22.223706-56.414023-25.642738-80.347245-5.128548C123.375845 682.096828 54.995211 782.958264 32.771505 921.429048c-8.547579 56.414023 30.771285 102.570952 88.894824 102.570952H902.915077c56.414023 0 97.442404-46.156928 88.894825-102.570952-23.933222-138.470785-92.313856-239.33222-188.046745-317.96995z" fill="#d81e06" p-id="2689"></path></svg>
        </div>
        <input type="text" class="form-control my-3" name="user_phone" placeholder="手机号" v-model="userPhone">
        <input type="password" class="form-control my-3" name="user_password" placeholder="密码" v-model="userPassward">
        <button type="button" class="btn btn-primary my-3" @click="login">登录</button>
    </form>
  </div>
</template>

<script>
import $ from 'jquery'
import Vue from 'vue'
export default {
    
    data(){
        return {
            userPhone:"",
            userPassward:""
        }
    },
    methods:{
        login:function(){
            let data = {
                userPhone:this.userPhone,
                userPassword:this.userPassward               
            };
            this.$axios.post('http://localhost/login',this.$qs.stringify(data))
            .then((res)=>{
                console.log(res);
                if(res.status == 200){
                    
                    /* 存储登录信息 */
                    localStorage.setItem("user",JSON.stringify(res.data));
                    localStorage.setItem("authorization",res.headers.authorization);//将token存储在localStorage
                    
                    if(typeof WebSocket != undefined){
                        console.log("浏览器支持websocket");
                        /* 与服务器建立websocket连接 */
                        this.ws = new WebSocket("ws://localhost/websocket/0/"+res.data.userId);
                        this.$global.setWs(this.ws);
                        console.log("websocket建立连接");
                        this.ws.onopen = function(){
                            console.log("登录成功！")
                        };
                        this.ws.onclose = function(){
                            console.log("退出登录！")
                        }
                        console.log("准备跳转首页");
                        this.$router.push('/index');
                    }else {
                        alert("您的浏览器不支持websocket通信协议，请使用Chrome或Firefox浏览器！");
                    }
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
#user-icon{
  background-color:#f1efef;
  width:33%;
  padding-bottom:33%;
  height:0;
  border-radius:50%;
  position:relative;
  border:3px white solid;
}
#login{
    position:relative;
    z-index: 1;
}
#login::before{
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-image: url(../assets/begin.jpg);
    background-size: cover;
    background-position: center;
    filter: blur(10px);
    z-index: -1;
}
</style>