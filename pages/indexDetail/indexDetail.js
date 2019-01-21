import {Api} from '../../utils/api.js';
var api = new Api();
const app = getApp();
import {Token} from '../../utils/token.js';
const token = new Token();

Page({
  data: {
 
 
  	mainData:[],
    isFirstLoadAllStandard:['getMainData'],
  },

  onLoad(options){
    const self = this;
    //api.commonInit(self);
    //self.data.id= options.id;
    //self.getMainData();
    self.data.mainData = api.getStorageArray('mainData');
    self.data.index = options.index;
    console.log('self.data.index',self.data.index)
    console.log('self.data.mainData',self.data.mainData)
    
    self.setData({	
    	web_url:self.data.mainData[0][self.data.index].passage2
    })
  },

  getMainData(){
    const  self =this;
   
    const postData={};
    postData.searchItem = {
      thirdapp_id:getApp().globalData.thirdapp_id,
      id:self.data.id
    };
    const callback =(res)=>{
      if(res.info.data.length>0){
        self.data.mainData = res.info.data[0];
        self.data.mainData.content = api.wxParseReturn(res.info.data[0].content).nodes;
      }else{
        api.showToast('数据错误','fail');
      };
      api.checkLoadAll(self.data.isFirstLoadAllStandard,'getMainData',self);
      self.setData({
        web_mainData:self.data.mainData,
      });
    };
    api.articleGet(postData,callback);
  },


  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },

 

})

  