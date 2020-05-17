import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    // 首页
    {
      path: '/fuIndex',
      name: 'fuIndex',
      component: resolve=>require(['../pages/fuIndex.vue'],resolve),
      meta:{
          keepAlive:true,
          show:true,
          but:false,
          bar:true,
          name:'中酒联'
      }
    },
    // 分类页面
    {
      path: '/fuClassify',
      name: 'fuClassify',
      component: resolve=>require(['../pages/fuClassify.vue'],resolve),
      meta:{
          keepAlive:true,
          show:true,
          but:false,
          bar:true,
          name:'商品分类'
      }
    },
    
    // 发现
    {
      path: '/HJFind',
      name: 'HJFind',
      component: resolve=>require(['../pages/HJFind.vue'],resolve),
      meta:{
        keepAlive:true,
        show:true,
        but:false,
        bar:true,
        name:'发现'
          // keepAlive:false,
          // show:true,
          // but:true,
          // bar:false,
      }
    },
    // 购物车
    {
      path: '/fuCart',
      name: 'fuCart',
      component: resolve=>require(['../pages/fuCart.vue'],resolve),
      meta:{
          keepAlive:false,
          show:true,
          but:false,
          bar:true,
          name:'购物车'
      }
    },
    // 个人中心
    {
      path: '/fuMy',
      name: 'fuMy',
      component: resolve=>require(['../pages/fuMy.vue'],resolve),
      meta:{
          keepAlive:false,
          show:true,
          but:false,
          bar:true,
          name:'个人中心'
      }
    },
    // 优惠卷列表
    {
      path: '/fuCouponList',
      name: 'fuCouponList',
      component: resolve=>require(['../pages/fuCouponList.vue'],resolve),
      meta:{
          keepAlive:false,
          show:true,
          but:true,
          bar:false,
          name:'我的优惠卷'
      }
    },
    // 优惠卷
    {
      path: '/fuCoupon',
      name: 'fuCoupon',
      component: resolve=>require(['../pages/fuCoupon.vue'],resolve),
      meta:{
          keepAlive:false,
          show:false,
          but:true,
          bar:false,
          // name:'我的优惠卷'
      }
    },
    // 余额
    {
      path: '/fuBalance',
      name: 'fuBalance',
      component: resolve=>require(['../pages/fuBalance.vue'],resolve),
      meta:{
          keepAlive:false,
          show:true,
          but:true,
          bar:false,
          name:'我的余额'
      }
    },
    // 我的关注
    {
      path: '/fuFollow',
      name: 'fuFollow',
      component: resolve=>require(['../pages/fuFollow.vue'],resolve),
      meta:{
          keepAlive:false,
          show:true,
          but:true,
          bar:false,
          name:'我的关注'
      }
    },
    // 使用帮助列表
    {
      path: '/fuHelpList',
      name: 'fuHelpList',
      component: resolve=>require(['../pages/fuHelpList.vue'],resolve),
      meta:{
          keepAlive:false,
          show:true,
          but:true,
          bar:false,
          name:'使用帮助'
      }
    },
    // 使用帮助
    {
      path: '/fuHelp',
      name: 'fuHelp',
      component: resolve=>require(['../pages/fuHelp.vue'],resolve),
      meta:{
          keepAlive:false,
          show:true,
          but:true,
          bar:false,
          name:'使用帮助'
      }
    },
    // 我的足迹
    {
      path: '/fuFootprint',
      name: 'fuFootprint',
      component: resolve=>require(['../pages/fuFootprint.vue'],resolve),
      meta:{
          keepAlive:false,
          show:true,
          but:true,
          bar:false,
          name:'我的足迹'
      }
    },
    // 我的收藏
    {
      path: '/fuCollection',
      name: 'fuCollection',
      component: resolve=>require(['../pages/fuCollection.vue'],resolve),
      meta:{
          keepAlive:false,
          show:true,
          but:true,
          bar:false,
          name:'我的收藏'
      }
    },
    // 我的积分
    {
      path: '/fuIntegral',
      name: 'fuIntegral',
      component: resolve=>require(['../pages/fuIntegral.vue'],resolve),
      meta:{
          keepAlive:false,
          show:true,
          but:true,
          bar:false,
          name:'我的积分'
      }
    }, 
    // 积分明细
    {
      path: '/fuInterDes',
      name: 'fuInterDes',
      component: resolve=>require(['../pages/fuInterDes.vue'],resolve),
      meta:{
          keepAlive:false,
          show:true,
          but:true,
          bar:false,
          name:'我的积分'
      }
    }, 
    // 积分明细
    {
      path: '/fuHelpDes',
      name: 'fuHelpDes',
      component: resolve=>require(['../pages/fuHelpDes.vue'],resolve),
      meta:{
          keepAlive:false,
          show:true,
          but:true,
          bar:false,
          name:'我的积分'
      }
    },     
    // 关于我们
    {
      path: '/fuAbout',
      name: 'fuAbout',
      component: resolve=>require(['../pages/fuAbout.vue'],resolve),
      meta:{
          keepAlive:true,
          show:true,
          but:true,
          bar:false,
          name:'关于我们'
      }
    },
    // 关于我们明细
    {
      path: '/fuAboutDes',
      name: 'fuAboutDes',
      component: resolve=>require(['../pages/fuAboutDes.vue'],resolve),
      meta:{
          keepAlive:true,
          show:false,
          but:false,
          bar:false,
        
      }
    },   
    // 设置
    {
      path: '/fuSetting',
      name: 'fuSetting',
      component: resolve=>require(['../pages/fuSetting.vue'],resolve),
      meta:{
          keepAlive:false,
          show:true,
          but:true,
          bar:false,
          name:'设置'
      }
    },       
     // 个人资料
     {
      path: '/fuPersonData',
      name: 'fuPersonData',
      component: resolve=>require(['../pages/fuPersonData.vue'],resolve),
      meta:{
          keepAlive:true,
          show:true,
          but:true,
          bar:false,
          name:'个人资料'
      }
    },    
    // 账户与安全
    {
      path: '/fuAccounts',
      name: 'fuAccounts',
      component: resolve=>require(['../pages/fuAccounts.vue'],resolve),
      meta:{
          keepAlive:true,
          show:true,
          but:true,
          bar:false,
          name:'账户与安全'
      }
    },
    // 收货地址管理
    {
      path: '/fuReceiving',
      name: 'fuReceiving',
      component: resolve=>require(['../pages/fuReceiving.vue'],resolve),
      meta:{
          keepAlive:true,
          show:true,
          but:true,
          bar:false,
          name:'收货地址管理'
      }
    },
    // 意见反馈
    {
      path: '/fuFeedback',
      name: 'fuFeedback',
      component: resolve=>require(['../pages/fuFeedback.vue'],resolve),
      meta:{
          keepAlive:false,
          show:true,
          but:true,
          bar:false,
          name:'意见反馈'
      }
    },
    
     // 申请分销商
     {
      path: '/fuAppDistribu',
      name: 'fuAppDistribu',
      component: resolve=>require(['../pages/fuAppDistribu.vue'],resolve),
      meta:{
          keepAlive:false,
          show:true,
          but:true,
          bar:false,
          name:'申请分销'
      }
    },
    // 申请分销商成功或失败
    {
      path: '/fuAppOkorNo',
      name: 'fuAppOkorNo',
      component: resolve=>require(['../pages/fuAppOkorNo.vue'],resolve),
      meta:{
          keepAlive:false,
          show:false,
          but:false,
          bar:false,
          name:'申请分销'
      }
    },
    // 分销商个人中心
    {
      path: '/fuDistributor',
      name: 'fuDistributor',
      component: resolve=>require(['../pages/fuDistributor.vue'],resolve),
      meta:{
          keepAlive:false,
          show:true,
          but:false,
          bar:true,
          name:'分销商个人中心'
      }
    },
    // 我的团队
    {
      path: '/fuTeam',
      name: 'fuTeam',
      component: resolve=>require(['../pages/fuTeam.vue'],resolve),
      meta:{
          keepAlive:false,
          show:true,
          but:true,
          bar:false,
          name:'我的团队'
      }
    },
    // 我的团队详细页面
    {
      path: '/fuTeamDes',
      name: 'fuTeamDes',
      component: resolve=>require(['../pages/fuTeamDes.vue'],resolve),
      meta:{
          keepAlive:false,
          show:true,
          but:true,
          bar:false,
          name:'我的团队'
      }
    },
    // 我要提现
    {
      path: '/fuWithdrawal',
      name: 'fuWithdrawal',
      component: resolve=>require(['../pages/fuWithdrawal.vue'],resolve),
      meta:{
          keepAlive:false,
          show:true,
          but:true,
          bar:false,
          name:'我要提现'
      }
    },
    // 我要提现子页面
    {
      path: '/fuWithdrawalDes',
      name: 'fuWithdrawalDes',
      component: resolve=>require(['../pages/fuWithdrawalDes.vue'],resolve),
      meta:{
          keepAlive:false,
          show:true,
          but:true,
          bar:false,
          name:'我要提现'
      }
    },
    // 提现成功页面
    {
      path: '/fuWithOk',
      name: 'fuWithOk',
      component: resolve=>require(['../pages/fuWithOk.vue'],resolve),
      meta:{
          keepAlive:false,
          show:true,
          but:true,
          bar:false,
          name:'提交申请成功'
      }
    },
    // 佣金明细
    {
      path: '/fuCommis',
      name: 'fuCommis',
      component: resolve=>require(['../pages/fuCommis.vue'],resolve),
      meta:{
          keepAlive:false,
          show:true,
          but:true,
          bar:false,
          name:'佣金明细'
      }
    },
    // 提现记录
    {
      path: '/fuWithdrawalrecord',
      name: 'fuWithdrawalrecord',
      component: resolve=>require(['../pages/fuWithdrawalrecord.vue'],resolve),
      meta:{
          keepAlive:false,
          show:true,
          but:true,
          bar:false,
          name:'提现记录'
      }
    },
    // 提现说明
    {
      path: '/fuWithdrawalExplain',
      name: 'fuWithdrawalExplain',
      component: resolve=>require(['../pages/fuWithdrawalExplain.vue'],resolve),
      meta:{
          keepAlive:false,
          show:true,
          but:true,
          bar:false,
          name:'提现说明'
      }
    },
    // 我的推广二维码
    {
      path: '/fuQRCode',
      name: 'fuQRCode',
      component: resolve=>require(['../pages/fuQRCode.vue'],resolve),
      meta:{
          keepAlive:true,
          show:true,
          but:true,
          bar:false,
          name:'我的推广二维码'
      }
    },
    // 文章列表
    {
      path: '/fuArticle',
      name: 'fuArticle',
      component: resolve=>require(['../pages/fuArticle.vue'],resolve),
      meta:{
          keepAlive:false,
          show:true,
          but:true,
          bar:false,
          name:'文章列表'
      }
    },
    // 搜索结果
    {
      path: '/fuArticleSeach',
      name: 'fuArticleSeach',
      component: resolve=>require(['../pages/fuArticleSeach.vue'],resolve),
      meta:{
          keepAlive:false,
          show:true,
          but:true,
          bar:false,
          name:'搜索结果'
      }
    },
    // 文章内容
    {
      path: '/fuArticleContent',
      name: 'fuArticleContent',
      component: resolve=>require(['../pages/fuArticleContent.vue'],resolve),
      meta:{
          keepAlive:false,
          show:true,
          but:true,
          bar:false,
          name:'文章内容'
      }
    },
    // 商品详情
    {
      path: '/fuProduct',
      name: 'fuProduct',
      component: resolve=>require(['../pages/fuProduct.vue'],resolve),
      meta:{
          keepAlive:false,
          show:true,
          but:true,
          bar:false,
          name:'商品详情'
      }
    },
    // 我的订单
    {
      path: '/fuOrder',
      name: 'fuOrder',
      component: resolve=>require(['../pages/fuOrder.vue'],resolve),
      meta:{
          keepAlive:false,
          show:true,
          but:true,
          bar:false,
          name:'我的订单'
      }
    },
    // 订单详情
    {
      path: '/fuOrderDes',
      name: 'fuOrderDes',
      component: resolve=>require(['../pages/fuOrderDes.vue'],resolve),
      meta:{
          keepAlive:false,
          show:true,
          but:true,
          bar:false,
          name:'订单详情'
      }
    },
    // 登录注册
    {
      path: '/fuLogin',
      name: 'fuLogin',
      component: resolve=>require(['../pages/fuLogin.vue'],resolve),
      meta:{
          keepAlive:false,
          show:false,
          but:true,
          bar:false,
          name:'订单详情'
      }
    },
    // 确认订单
    {
      path: '/fuPlaceOrder',
      name: 'fuPlaceOrder',
      component: resolve=>require(['../pages/fuPlaceOrder.vue'],resolve),
      meta:{
          keepAlive:false,
          show:true,
          but:true,
          bar:false,
          name:'确认订单'
      }
    },
    // 申请分销
    {
      path: '/fuAppDistribu',
      name: 'fuAppDistribu',
      component: resolve=>require(['../pages/fuAppDistribu.vue'],resolve),
      meta:{
          keepAlive:false,
          show:true,
          but:true,
          bar:false,
          name:'申请分销'
      }
    },
    // 产品搜索
    {
      path: '/fuSeach',
      name: 'fuSeach',
      component: resolve=>require(['../pages/fuSeach.vue'],resolve),
      meta:{
          keepAlive:false,
          show:true,
          but:true,
          bar:false,
          name:'搜索结果'
      }
    },
    // 品牌街
    {
      path: '/fuBrandStreet',
      name: 'fuBrandStreet',
      component: resolve=>require(['../pages/fuBrandStreet.vue'],resolve),
      meta:{
          keepAlive:true,
          show:true,
          but:true,
          bar:false,
          name:'品牌街'
      }
    },
    // 品牌详情
    {
      path: '/fuBrandDet',
      name: 'fuBrandDet',
      component: resolve=>require(['../pages/fuBrandDet.vue'],resolve),
      meta:{
          keepAlive:false,
          show:false,
          but:false,
          bar:false,
          name:'品牌详情'
      }
    },
    // 企业咨询
    {
      path: '/fuEnterprise',
      name: 'fuEnterprise',
      component: resolve=>require(['../pages/fuEnterprise.vue'],resolve),
      meta:{
          keepAlive:false,
          show:true,
          but:true,
          bar:false,
          name:'企业咨询'
      }
    },
    // 我的消息
    {
      path: '/fuMyNew',
      name: 'fuMyNew',
      component: resolve=>require(['../pages/fuMyNew.vue'],resolve),
      meta:{
          keepAlive:false,
          show:true,
          but:true,
          bar:false,
          name:'我的消息'
      }
    },
    
    // 测试
    {
      path: '/text',
      name: 'text',
      component: resolve=>require(['../pages/text.vue'],resolve),
      meta:{
          keepAlive:false,
          show:true,
          but:true,
          bar:false,
          name:'搜索结果'
      }
    },
    // 发现详情
    {
      path: '/HJFindeDet',
      name: 'HJFindeDet',
      component: resolve=>require(['../pages/HJFindeDet.vue'],resolve),
      meta:{
          keepAlive:false,
          show:true,
          but:true,
          bar:true,
          name:'发现详情'
      }
    },
  ]
})
