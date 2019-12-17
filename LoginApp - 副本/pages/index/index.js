//index.js
//获取应用实例
var util = require('../../utils/util.js');
const app = getApp()
var ht = this;
Page({
  
  data: {
    account:"",
    password:"",
    list:[]
  },
  accountInput:function(e){
    var username = e.detail.value;
    if (username != ''){
      this.setData({ account: username});
    }15
  },
  pwdBlur:function(e){
    var pwd = e.detail.value;
   // console.log(pwd);
    if(pwd != ''){
      this.setData({password:pwd});
    }22
    
  },
  login:function(e){
     var that = this;
    wx.request({
      url: 'http://localhost:8805/system/sysUser/login',
      method: 'post',
      data: util.json2Form({
        account: this.data.account,
        password: this.data.password
      }),
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      
      success:function(res){
        console.log("调用API成功");
        console.log(res.data);
        that.setData({
          list: res.data,
         
          //res代表success函数的事件对，data是固定的，list是数组
        });
        if (res.data.msg == "操作成功") {
          wx.showToast({
            title: '登陆成功',
            
          });
        } else {
          wx.showModal({
            title: '提示',
            content: '用户名或者密码错误',
            showCancel: false
          })
        }
      },
      fail:function(res){
        console.log("调用API失败");
      }
    })
  }
  })