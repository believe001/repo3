import{request} from "../../request/index.js";

Page({

  data: {
    //左侧的菜单数据
    leftMenuList:[],
    //右侧的商品数据
    rightContent:[],
    //被点击的左侧的菜单
    currentIndex:0,
    // 右侧滚动距离顶部举例
    scrollTop:0
  },
  //接口的返回数据 
  Cates:[],
  onLoad: function (options) {
    /*
    1 判断本地存储中有无旧数据
    2 没有旧数据 直接发送新请求
    3 有旧数据同时旧的数据也没有过期 就使用本地存储中的旧数据即可
    +
    */
    // this.getCates();
    //1 获取本地存储的数据 小程序中也是存在本地存储数据的
    const Cates=wx.getStorageSync("cates");
    //2 判断
    if(!Cates){
      //不存在 发送请求获取数据
      this.getCates();
    }else{
      //有旧的数据，定义过期时间
      if(Date.now()-Cates.time>1000*10){
        //重新发送请求
        this.getCates();

      }else{
        //可以使用旧数据
        // console.log('可以使用旧数据');
        this.Cates=Cates.data;
        let leftMenuList=this.Cates.map(v=>v.cat_name);
        let rightContent=this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
        
      }
    }
  },
  getCates(){
    request({
      url:"/categories"
      
    })
    .then(res=>{
      console.log(res);
      this.Cates=res.data.message;

      //把接口的数据存入到本地存储中
      wx.setStorageSync("cates", {time:Date.now(),data:this.Cates})

      //构造左侧的大菜单数据
      //array.map函数是将数组中的值经过处理返回一个新数组
      let leftMenuList=this.Cates.map(v=>v.cat_name);
      // console.log(leftMenuList);
      //构造右侧的商品数据
      let rightContent=this.Cates[0].children;
      this.setData({
        leftMenuList,
        rightContent
      })
    })
  },
  // 左侧菜单的点击事件
  handleItemTap(e){
    console.log(e.currentTarget.dataset);
    //1. 获取被点击标题上的索引
    const {index}=e.currentTarget.dataset;
    let rightContent=this.Cates[index].children;
    this.setData({
      currentIndex:index,
      rightContent,
      scrollTop:0
    })

    
  }
})