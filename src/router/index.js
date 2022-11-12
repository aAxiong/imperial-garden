import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import {
  Toast
} from 'mint-ui';
import {
  Message
} from "element-ui";

Vue.use(Router)
//1.实现路由懒加载(请按照下述方式添加组件)

Router.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}
//登录
const Choicecity = (resolve) => {
  import ('base/choicecity/choicecity').then((module) => {
    resolve(module)
  })
}
const Login = (resolve) => {
  import ('components/entrance/login/login').then((module) => {
    resolve(module)
  })
}
const Register = (resolve) => {
  import ('components/entrance/register/register').then((module) => {
    resolve(module)
  })
}
const VerificationCode = (resolve) => {
  import ('components/entrance/verificationCode/verificationCode').then((module) => {
    resolve(module)
  })
}
const ForgetPassword = (resolve) => {
  import ('components/entrance/forgetPassword/forgetPassword').then((module) => {
    resolve(module)
  })
}
const PerfectInfo = (resolve) => {
  import ('components/entrance/perfectInfo/perfectInfo').then((module) => {
    resolve(module)
  })
}
const StartGuidance = (resolve) => {
  import ('components/entrance/startGuidance/startGuidance').then((module) => {
    resolve(module)
  })
}
//中间硬件模块
const Indexs = (resolve) => {
  import ('components/index/index/index').then((module) => {
    resolve(module)
  })
}
const Index_mess = (resolve) => {
  import ('components/index/index_mess/index_mess').then((module) => {
    resolve(module)
  })
}
const IndexbBackRadio = (resolve) => {
  import ('components/index/indexbBackRadio/indexbBackRadio').then((module) => {
    resolve(module)
  })
}
const Index_nightCare = (resolve) => {
  import ('components/index/index_nightCare/index_nightCare').then((module) => {
    resolve(module)
  })
}


const Index0Add = (resolve) => {
  import ('components/index/index0Add/index0Add').then((module) => {
    resolve(module)
  })
}
const Index0Add_help = (resolve) => {
  import ('components/index/index0Add_help/index0Add_help').then((module) => {
    resolve(module)
  })
}
const Index0Add_reset = (resolve) => {
  import ('components/index/index0Add_reset/index0Add_reset').then((module) => {
    resolve(module)
  })
}
const Index1Scan = (resolve) => {
  import ('components/index/index1Scan/index1Scan').then((module) => {
    resolve(module)
  })
}
const Index2Wifi = (resolve) => {
  import ('components/index/index2Wifi/index2Wifi').then((module) => {
    resolve(module)
  })
}
const Index3Connect = (resolve) => {
  import ('components/index/index3Connect/index3Connect').then((module) => {
    resolve(module)
  })
}
const Index4Success = (resolve) => {
  import ('components/index/index4Success/index4Success').then((module) => {
    resolve(module)
  })
}
const IndexFail = (resolve) => {
  import ('components/index/indexFail/indexFail').then((module) => {
    resolve(module)
  })
}
const IndexFail_white = (resolve) => {
  import ('components/index/indexFail_white/indexFail_white').then((module) => {
    resolve(module)
  })
}
const Index5Light = (resolve) => {
  import ('components/index/index5Light/index5Light').then((module) => {
    resolve(module)
  })
}
const Index6Settings = (resolve) => {
  import ('components/index/index6Settings/index6Settings').then((module) => {
    resolve(module)
  })
}
const Index6Settings_scope = (resolve) => {
  import ('components/index/index6Settings_scope/index6Settings_scope').then((module) => {
    resolve(module)
  })
}
const Index6Settings_share = (resolve) => {
  import ('components/index/index6Settings_share/index6Settings_share').then((module) => {
    resolve(module)
  })
}
const Index6Settings_update = (resolve) => {
  import ('components/index/index6Settings_update/index6Settings_update').then((module) => {
    resolve(module)
  })
}
const Index6Settings_invite = (resolve) => {
  import ('components/index/index6Settings_invite/index6Settings_invite').then((module) => {
    resolve(module)
  })
}
const IndexSkip = (resolve) => {
  import ('components/index/skip/skip').then((module) => {
    resolve(module)
  })
}

const index7DataAnalysis = (resolve) => {
  import ('components/index/index7DataAnalysis/index7DataAnalysis').then((module) => {
    resolve(module)
  })
}
const index7DataAnalysis_record = (resolve) => {
  import ('components/index/index7DataAnalysis_record/index7DataAnalysis_record').then((module) => {
    resolve(module)
  })
}
const index7DataAnalysis_cryanalyze = (resolve) => {
  import ('components/index/index7DataAnalysis_cryanalyze/index7DataAnalysis_cryanalyze').then((module) => {
    resolve(module)
  })
}

const indexParentLamp = (resolve) => {
  import ('components/index/indexParentLamp/indexParentLamp').then((module) => {
    resolve(module)
  })
}
const indexShopingMall = (resolve) => {
  import ('components/index/indexShopingMall/indexShopingMall').then((module) => {
    resolve(module)
  })
}
const IndexDelayLight = (resolve) => {
  import ('components/index/indexDelayLight/indexDelayLight').then((module) => {
    resolve(module)
  })
}

const IndexCryOften = (resolve) => {
  import ('components/index/indexCryOften/indexCryOften').then((module) => {
    resolve(module)
  })
}


//成长评测
const Growup = (resolve) => {
  import ('components/growup/growup/growup').then((module) => {
    resolve(module)
  })
}
const GrowupNotice = (resolve) => {
  import ('components/growup/growupNotice/growupNotice').then((module) => {
    resolve(module)
  })
}
const Growup_page = (resolve) => {
  import ('components/growup/growup_page/growup_page').then((module) => {
    resolve(module)
  })
}
const Growup_result = (resolve) => {
  import ('components/growup/growup_result/growup_result').then((module) => {
    resolve(module)
  })
}
//视觉激发
const Vision = (resolve) => {
  import ('components/vision/vision/vision').then((module) => {
    resolve(module)
  })
}

const Vision_info = (resolve) => {
  import ('components/vision/vision_info/vision_info').then((module) => {
    resolve(module)
  })
}

const Vision_play = (resolve) => {
  import ('components/vision/vision_play/vision_play').then((module) => {
    resolve(module)
  })
}

//专题
const Special = (resolve) => {
  import ('components/special/special/special').then((module) => {
    resolve(module)
  })
}
const RankingList = (resolve) => {
  import ('components/special/rankingList/rankingList').then((module) => {
    resolve(module)
  })
}
const Coup = (resolve) => {
  import ('components/special/coup/coup').then((module) => {
    resolve(module)
  })
}
const Questions = (resolve) => {
  import ('components/special/questions/questions').then((module) => {
    resolve(module)
  })
}
const MyQuestions = (resolve) => {
  import ('components/special/myQuestions/myQuestions').then((module) => {
    resolve(module)
  })
}
const Benefit = (resolve) => {
  import ('components/special/benefit/benefit').then((module) => {
    resolve(module)
  })
}
const BenefitInfo = (resolve) => {
  import ('components/special/benefitInfo/benefitInfo').then((module) => {
    resolve(module)
  })
}
const ShareInfo = (resolve) => {
  import ('components/special/shareinfo/shareinfo').then((module) => {
    resolve(module)
  })
}
//我的
const Mine = (resolve) => {
  import ('components/mine/mine/mine').then((module) => {
    resolve(module)
  })
} //
const Userinfo = (resolve) => {
  import ('components/mine/userinfo/userinfo').then((module) => {
    resolve(module)
  })
}
const AddressSettings = (resolve) => {
  import ('components/mine/addressSettings/addressSettings').then((module) => {
    resolve(module)
  })
}
const Username = (resolve) => {
  import ('components/mine/username/username').then((module) => {
    resolve(module)
  })
}

const Addaddress = (resolve) => {
  import ('components/mine/addaddress/addaddress').then((module) => {
    resolve(module)
  })
}
const Editaddress = (resolve) => {
  import ('components/mine/editaddress/editaddress').then((module) => {
    resolve(module)
  })
}
const Myaddress = (resolve) => {
  import ('components/mine/myaddress/myaddress').then((module) => {
    resolve(module)
  })
}
const ActivityCenter = (resolve) => {
  import ('components/mine/activityCenter/activityCenter').then((module) => {
    resolve(module)
  })
}
const GameRule = (resolve) => {
  import ('components/mine/gameRule/gameRule').then((module) => {
    resolve(module)
  })
}
const VoiceMan = (resolve) => {
  import ('components/mine/voiceMan/voiceMan').then((module) => {
    resolve(module)
  })
}
const MyPoints = (resolve) => {
  import ('components/mine/myPoints/myPoints').then((module) => {
    resolve(module)
  })
}
const Exchange = (resolve) => {
  import ('components/mine/exchange/exchange').then((module) => {
    resolve(module)
  })
}
const Exchange_info = (resolve) => {
  import ('components/mine/exchange_info/exchange_info').then((module) => {
    resolve(module)
  })
}
const MoreSettings = (resolve) => {
  import ('components/mine/moreSettings/moreSettings').then((module) => {
    resolve(module)
  })
}
const ResetPassword = (resolve) => {
  import ('components/mine/resetPassword/resetPassword').then((module) => {
    resolve(module)
  })
}
const Version = (resolve) => {
  import ('components/mine/version/version').then((module) => {
    resolve(module)
  })
}

const Aboutwe = (resolve) => {
  import ('components/mine/aboutwe/aboutwe').then((module) => {
    resolve(module)
  })
}

const Opinion = (resolve) => {
  import ('components/mine/opinion/opinion').then((module) => {
    resolve(module)
  })
}



const router = new Router({
  linkActiveClass: "active",
  routes: [{
      path: '/',
      // redirect: '/index/indexSkip'
      redirect: 'startGuidance'
    },
    {
      path: '/startGuidance',
      component: StartGuidance,
      name: 'StartGuidance'
    },
    { //登录
      path: '/login',
      component: Login,
      name: 'login',
      children: [
        //  {
        //     path: '/login',
        //     name: 'login',
        //     component: Login
        //   },
        {
          path: 'register',
          component: Register,
          name: 'register',
        },
        {
          path: 'verificationCode',
          component: VerificationCode,
          name: 'verificationCode',
        },
        {
          path: 'forgetPassword',
          component: ForgetPassword,
          name: 'forgetPassword',
        }, {
          path: 'perfectInfo',
          component: PerfectInfo,
          name: 'perfectInfo'
        }
      ]
    },
    { //中间
      path: '/index',
      name: 'index',
      component: Indexs,
      children: [{ //消息
          path: 'index_mess',
          component: Index_mess,
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        { //回溯录制
          path: 'indexbBackRadio',
          component: IndexbBackRadio,
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
        }, { //夜晚照料
          path: 'index_nightCare',
          component: Index_nightCare,
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
        }, { //商城购买
          path: 'indexShopingMall',
          component: indexShopingMall,
          name: 'indexShopingMall',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
        }, { //亲子灯
          path: 'indexParentLamp',
          component: indexParentLamp,
          name: 'indexParentLamp',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
        }, {
          path: 'index0Add',
          component: Index0Add,
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path: 'index0Add_help',
          component: Index0Add_help
        },
        {
          path: 'index0Add_reset',
          component: Index0Add_reset,
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path: 'index1Scan',
          component: Index1Scan
        },
        {
          path: 'index2Wifi',
          component: Index2Wifi
        },
        {
          path: 'index3Connect',
          component: Index3Connect
        },
        {
          path: 'index4Success',
          component: Index4Success
        },
        {
          path: 'indexSkip',
          component: IndexSkip
        },
        {
          path: 'indexFail',
          component: IndexFail,
          // children: [
          //   {
          //     path: 'indexFail_white',
          //     component: IndexFail_white
          //   }
          // ]
        },
        {
          path: 'indexFail_white',
          component: IndexFail_white
        },
        {
          path: 'index5Light',
          component: Index5Light,
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path: 'index6Settings',
          component: Index6Settings,
          children: [{
              path: 'index6Settings_scope',
              component: Index6Settings_scope
            },
            {
              path: 'indexDelayLight',
              component: IndexDelayLight
            }, {
              path: 'indexCryOften',
              component: IndexCryOften
            }
          ]
        },

        {
          path: 'index6Settings_share',
          component: Index6Settings_share
        },
        {
          path: 'index6Settings_update',
          component: Index6Settings_update
        },
        {
          path: 'index6Settings_invite',
          component: Index6Settings_invite
        },
        {
          path: 'index7DataAnalysis',
          component: index7DataAnalysis,
          name: 'index7DataAnalysis',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },

        },
        {
          path: 'index7DataAnalysis_record',
          component: index7DataAnalysis_record,
          name: 'index7DataAnalysis_record',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },

        },
        {
          path: 'index7DataAnalysis_cryanalyze',
          component: index7DataAnalysis_cryanalyze,
          name: 'index7DataAnalysis_cryanalyze',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },

        }
      ]

    },

    { //成长评测
      path: '/growup',
      name: 'growup',
      component: Growup,
      children: [{
        path: 'growupNotice',
        component: GrowupNotice
      }, {
        path: 'growup_page',
        component: Growup_page
      }, {
        path: 'growup_result',
        component: Growup_result
      }]
    },
    { //我的
      path: '/mine',
      name: 'mine',
      component: Mine,
      children: [{
          path: 'userinfo',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: Userinfo,
          name: 'userinfo',
          children: [{
            path: 'username',
            name: 'username',
            component: Username,
            meta: {
              requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
            }
          }, {
            path: 'myaddress',
            component: Myaddress,
            name: 'myaddress',
            meta: {
              requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
            },
            children: [{
              path: 'addaddress',
              component: Addaddress
            }, {
              path: 'editaddress',
              component: Editaddress
            }]
          }, {
            path: 'addressSettings',
            component: AddressSettings
          }]
        }, {
          path: 'activityCenter',
          name: 'activityCenter',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: ActivityCenter,
          children: [{
            path: 'gameRule',
            component: GameRule
          }]
        }, {
          path: 'voiceMan',
          name: 'voiceMan',
          component: VoiceMan,
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        }, {
          path: 'myPoints',
          name: 'myPoints',
          component: MyPoints,
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        }, {
          path: 'exchange',
          name: 'exchange',
          component: Exchange,
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          children: [{
            path: 'exchange_info',
            component: Exchange_info
          }]
        }, {
          path: 'moreSettings',
          name: 'moreSettings',
          component: MoreSettings,
          children: [{
            path: 'resetPassword',
            component: ResetPassword,
            meta: {
              requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
            },
          }, {
            path: 'version',
            component: Version,
            meta: {
              requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
            },
          }, {
            path: 'aboutwe',
            component: Aboutwe,
            meta: {
              requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
            },
          }, {
            path: 'opinion',
            component: Opinion,
            meta: {
              requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
            },
          }]
        }

      ]
    },
    { //视觉激发
      path: '/vision',
      name: 'vision',
      component: Vision,
      children: [{
        path: 'vision_info',
        name: 'vision_info',
        component: Vision_info,
        children: [{
          path: 'vision_play',
          name: 'vision_play',
          component: Vision_play
        }]
      }, ]
    },
    { //专题
      path: '/special',
      name: 'special',
      component: Special,
      children: [{
          path: 'rankingList',
          component: RankingList,
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        }, {
          path: 'coup',
          component: Coup,
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        }, {
          path: 'questions',
          component: Questions,
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          children: [{
            name: 'myQuestions',
            path: 'myQuestions',
            component: MyQuestions,
            meta: {
              requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
            }
          }]
        },
        {
          path: 'benefit',
          component: Benefit,
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          children: [{
            path: 'benefitInfo',
            component: BenefitInfo
          }]
        }, {
          path: 'shareinfo',
          component: ShareInfo
        }
      ]
    }
  ]
})



router.beforeEach((to, from, next) => { //判断是否登录
  if (to.name == 'StartGuidance' && localStorage.getItem('openApp') != null) {
    next({
      path: '/vision'
    })
  } else {
    next();
  }
  if (to.meta.requireAuth) {
    if (localStorage.getItem('userdata') != null) {
      if (JSON.parse(localStorage.getItem("userdata")).BirthDay == null) {
        Message.info({
          type: "info",
          message: "需要继续完善信息",
          center: true,
          duration: 1000
        });
        next({
          name: 'perfectInfo',
          query: {
            goback: to.matched[0].name
          }
        })
        return
      }
      next()
    } else if (from.query.goback != undefined) {
      next({
        name: from.query.goback
      });
    } else {
      Message.info({
        type: "info",
        message: "尚未登录",
        center: true,
        duration: 1000
      });
      next({
        path: '/login',
        query: {
          goback: to.matched[0].name
        }
      })
    }
  } else {
    next()
  }
})


export default router
