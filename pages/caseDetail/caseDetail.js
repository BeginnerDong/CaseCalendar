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


  

  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },

 

})

  