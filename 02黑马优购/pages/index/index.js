//引入用来发送请求的方法
import{request} from "../../request/index.js";
Page({
  data: {
    //轮播图数组
    swiperList:[],
    //导航数组
    catesList:[],
    //楼层数据
    floorList:[]
  },
  //options(Object)
  //页面开始加载的时候就会触发的声明周期事件
  //优化的手段可以通过es6 promise来解决这个问题
  onLoad: function(options){
    //1 发送异步请求获取轮播图数据 wx-request
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1//home/swiperdata',
    //   success: (result)=>{
    //     // console.log(result);
    //     this.setData({
    //       swiperList:result.data.message
    //     })
    //   }  
    // });
    this.getSwiperList();
    this.getcatesList();
    this.getfloorList();
   
  },
  //获取轮播图数据
  getSwiperList:function(){
    request({url:"/home/swiperdata"})
    .then(result=>{
      this.setData({
        swiperList:result.data.message
      })
    })
  },
  //获取分类导航数据
  getcatesList:function(){
    request({url:"/home/catitems"})
    .then(result=>{
      this.setData({
        catesList:result.data.message
      })
    })
  },
  //获取楼层数据
  getfloorList:function(){
    request({url:"/home/floordata"})
    .then(result=>{
      this.setData({
        floorList:result.data.message
      })
    })
  },

});

