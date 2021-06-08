import Vue from 'vue'
import Router from 'vue-router'

import match from '@/components/match/match'

import personal from '@/components/personal/personal'
import update from '@/components/update/update'
import login from '@/components/login'
import index from '@/components/index'

/* ======================       我的      ============================================================*/

//个人资料
import personalDetail from '@/components/personal/personalDetail'
import editPerson from '@/components/personal/editPerson';

/* 我的发布 */
import mypost from '@/components/personal/mypost/mypost'
import myConfession from '@/components/personal/mypost/myConfession'
import myColckIn from '@/components/personal/mypost/myColckIn'
import myMutual from '@/components/personal/mypost/myMutual'
import myUpdate from '@/components/personal/mypost/myUpdate'

/* 好友|关注|粉丝 */
import myFriend from '@/components/personal/myFriend/myFriend'
import friend from '@/components/personal/myFriend/friend'
import follows from '@/components/personal/myFriend/follows'
import followers from '@/components/personal/myFriend/followers'

/* 设置 */
import set from '@/components/personal/set/set'

/* =======================================   动态      ================================================ */
/* 动态 */
import postUpdate from '@/components/update/postUpdate'
import updateDetail from '@/components/update/updateDetail'
import whoCanSee from '@/components/update/whoCanSee'
import whereAreYou from '@/components/update/whereAreYou'
import searchSite from '@/components/update/searchSite'

/* 黑板墙 */
import wall from '@/components/wall/wall'
import confession from '@/components/wall/confession/confession'
import colckIn from '@/components/wall/colckIn/colckIn'
import mutual from '@/components/wall/mutual/mutual'
import puzzle from '@/components/wall/puzzle/puzzle'

/* 组队 */
import postMutual from '@/components/wall/mutual/postMutual'

/* 打卡 */
import postColckIn from '@/components/wall/colckIn/postColckIn'

/* 表白 */
import postConfession from '@/components/wall/confession/postConfession'

/* 答疑 */
import postPuzzle from '@/components/wall/puzzle/postPuzzle'


/* 消息 */
import message from '@/components/message/message'
import messageFollow from '@/components/message/messageFollow'
import messageGeneral from '@/components/message/messageGeneral'
import likesTome from '@/components/message/toMe/likesTome'
import followersTome from '@/components/message/toMe/followersTome'
import testTome from '@/components/message/toMe/testTome'
import commentsTome from '@/components/message/toMe/commentsTome'
import messageInterface from '@/components/message/messageInterface'
import messageSerach from '@/components/message/messageSerach'
import messageSet from '@/components/message/messageSet'

Vue.use(Router)


const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {//主页
      path: '/index',
      name: 'index',
      component: index,
      children:[
          {//我的
            path: '/personal',
            name: 'personal',
            component:personal,
            meta:{
              keepAlive: true
            }
          },
          {
            path: '/wall',
            name: 'wall',
            component: wall,
            meta:{
              keepAlive: true
            }
          },
          {
            path: '/match',
            name: 'match',
            component: match,
          },
          {
            path: '/message',
            name: 'message',
            component: message,
            keepAlive: true,
            children:[
              {
                path: '/messageFollow',
                name: 'messageFollow',
                component: messageFollow,
              },
              {
                path: '/messageGeneral',
                name: 'messageGeneral',
                component: messageGeneral,
              }
            ],
            redirect:'/messageGeneral'
          },
          {
            path: '/update',
            name: 'update',
            component: update,
            meta:{
              keepAlive: true
            }
          },
      ],
      redirect:'/personal'
    },

/*====== 我的 ===================================================================*/

    //我的  =====>  我的发布
    {
      path: '/mypost',
      name: 'mypost',
      component: mypost,
      meta:{
        keepAlive: true
      },
      children:[
          {
            path: '/myConfession',
            name: 'myConfession',
            component: myConfession,
            meta:{
              keepAlive: true
            },
          },
          {
            path: '/myColckIn',
            name: 'myColckIn',
            component: myColckIn,
            meta:{
              keepAlive: true
            },
          },
          {
            path: '/myMutual',
            name: 'myMutual',
            component: myMutual,
            meta:{
              keepAlive: true
            },
          },
          {
            path: '/myUpdate',
            name: 'myUpdate',
            component: myUpdate,
            meta:{
              keepAlive: true
            },
          },
      ],redirect:'/myUpdate'
    },
    //我的 =====>  关注、粉丝、好友
    {
      path: '/myFriend',
      name: 'myFriend',
      component: myFriend,
      children:[
        {
          path: '/friend',
          name: 'friend',
          component: friend,
          meta:{
            keepAlive: true
          },
        },
        {
          path: '/follows',
          name: 'follows',
          component: follows,
          meta:{
            keepAlive: true
          },
        },
        {
          path: '/followers',
          name: 'followers',
          component: followers,
          meta:{
            keepAlive: true
          },
        },
      ]
    },
    //我的 ======> 用户资料
    {
      path: '/personalDetail',
      name: 'personalDetail',
      component: personalDetail,
      meta:{
        keepAlive: true
      },
    },
    //我的 =======> 修改资料
    {
      path: '/editPerson',
      name: 'editPerson',
      component: editPerson,
    },
    //我的 =======> 设置
    {
      path: '/set',
      name: 'set',
      component: set,
    },

/*====== 动态 ===================================================================*/

    //动态 =====> 发表动态
    {
      path: '/postUpdate',
      name: 'postUpdate',
      component: postUpdate,
      meta:{
        keepAlive: true
      },
    },
    //动态 =====> 谁可以看
    {
      path: '/whoCanSee',
      name: 'whoCanSee',
      component: whoCanSee,
    },
    //动态 =====> 所在位置
    {
      path: '/whereAreYou',
      name: 'whereAreYou',
      component: whereAreYou,
    },
    //动态 =====> 查找位置
    {
      path: '/searchSite',
      name: 'searchSite',
      component: searchSite,
    },
    //动态 ======> 动态详情
    {
      path: '/updateDetail',
      name: 'updateDetail',
      component: updateDetail,
      meta:{
        keepAlive: true
      }
    },

/*====== 消息 =====================================================================*/

    //消息 ======> 点赞
    {
      path: '/likesTome',
      name: 'likesTome',
      component: likesTome,
      meta:{
        keepAlive: true
      },
    },
    //消息 ======> 关注
    {
      path: '/followersTome',
      name: 'followersTome',
      component: followersTome,
    },
    //消息 ======> 评论
    {
      path: '/commentsTome',
      name: 'commentsTome',
      component: commentsTome
    },
    //消息 ======> 收到的答卷
    {
      path: '/testTome',
      name: 'testTome',
      component: testTome
    },
    //消息 =======> 消息界面
    {
      path: '/messageInterface',
      name: 'messageInterface',
      component: messageInterface
    },
    //消息 ========> 搜索界面
    {
      path: '/messageSerach',
      name: 'messageSerach',
      component: messageSerach
    },
    //消息  ========> 消息设置界面
    {
      path: '/messageSet',
      name: 'messageSet',
      component: messageSet
    },

/*====== 黑板墙 =====================================================================*/

    //表白  ========> 表白
    {
      path: '/confession',
      name: 'confession',
      component: confession
    },
    //表白  =========> 发起表白
    {
      path: '/postConfession',
      name: 'postConfession',
      component: postConfession
    },
    //打卡  ========> 打卡
    {
      path: '/colckIn',
      name: 'colckIn',
      component: colckIn
    },
    //打卡 =========> 发布打卡
    {
      path: '/postColckIn',
      name: 'postColckIn',
      component: postColckIn
    },
    //组队  ========> 组队
    {
      path: '/mutual',
      name: 'mutual',
      component: mutual
    },
    //组队  ==========>发起组队
    {
      path: '/postMutual',
      name: 'postMutual',
      component: postMutual
    },
    //答疑  ========> 答疑
    {
      path: '/puzzle',
      name: 'puzzle',
      component: puzzle
    },
    //答疑 ========》 发布答疑
    {
      path: '/postPuzzle',
      name: 'postPuzzle',
      component: postPuzzle
    },
  ]
})
router.beforeEach(
  (to,from,next)=>{
    let authorization = localStorage.getItem('authorization');
    if(authorization){
      if(to.name == 'login'){
        console.log("已登录，跳转首页！");
        next('/index')
      }else {
        console.log("已登录，放行");
        next();
      }
    }else {
      if(to.name == 'login'){
        next();
      }else {
        console.log("未登录，跳转登录页！");
        next('/');
      }
    }
  }
)
export default router