import {Api} from '../../utils/api.js';
var api = new Api();
const app = getApp();
import {Token} from '../../utils/token.js';
const token = new Token();

Page({
  data: {
 
   isFirstLoadAllStandard:['getMainData'],
  },

  onLoad(options){
    const self = this;
    api.commonInit(self);
    self.data.id= options.id;
    self.getMainData();
  },

  getMainData(){
    const  self =this;
    const postData={};
    postData.tokenFuncName = 'getProjectToken';
    postData.searchItem = {
      thirdapp_id:getApp().globalData.thirdapp_id,
      id:self.data.id
    };
    const callback =(res)=>{
      if(res.info.data.length>0){
        self.data.mainData = res.info.data[0];
      }else{
        api.showToast('数据错误','none');
      };
      api.checkLoadAll(self.data.isFirstLoadAllStandard,'getMainData',self);
      self.setData({
        web_mainData:self.data.mainData,
      });
    };
    api.messageGet(postData,callback);
  },


  onShareAppMessage(res){
    const self = this;
     console.log(res)
      if(res.from == 'button'){
        self.data.shareBtn = true;
      }else{   
        self.data.shareBtn = false;
      }
      return {
        title: '办案日历',
         path: 'pages/caseDetail/caseDetail?id='+self.data.id,
        success: function (res){
          console.log(res);
          console.log(parentNo)
          if(res.errMsg == 'shareAppMessage:ok'){
            console.log('分享成功')
            if (self.data.shareBtn){
              if(res.hasOwnProperty('shareTickets')){
              console.log(res.shareTickets[0]);
                self.data.isshare = 1;
              }else{
                self.data.isshare = 0;
              }
            }
          }else{
            wx.showToast({
              title: '分享失败',
            })
            self.data.isshare = 0;
          }
        },
        fail: function(res) {
          console.log(res)
        }
      }
  },

  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },

 

})

  