import {Api} from '../../utils/api.js';
var api = new Api();
const app = getApp();

Page({
  data: {

   searchItem:{
   },
   mainData:[],
   isFirstLoadAllStandard:['getMainData'],

  },

  onLoad(options){
    const self = this;
    console.log(options);
    if(options.date){
      self.data.start_date = api.timeToTimestamp(options.date)*1000;
      console.log('self.data.start_date',self.data.start_date);
      self.data.searchItem.open_time = ['between',[self.data.start_date,self.data.start_date+24 * 60 * 60 * 1000 -1]]
    };
    
    api.commonInit(self);
    self.getMainData();
  },

  getMainData(isNew){
    const  self =this;
    if(isNew){
      api.clearPageIndex(self)
    };
    const postData={};
    postData.tokenFuncName = 'getProjectToken';
    postData.paginate = api.cloneForm(self.data.paginate);
    postData.searchItem = api.cloneForm(self.data.searchItem);
    postData.searchItem.thirdapp_id = getApp().globalData.thirdapp_id;
    const callback =(res)=>{
      if(res.info.data.length>0){
        self.data.mainData.push.apply(self.data.mainData,res.info.data);
      }else{
        self.data.isLoadAll = true;
        api.showToast('没有更多了','fail');
      };
      api.buttonCanClick(self,true);
      api.checkLoadAll(self.data.isFirstLoadAllStandard,'getMainData',self);
      self.setData({
        web_mainData:self.data.mainData,
      });
    };
    api.messageGet(postData,callback);
  },





  onReachBottom() {
    const self = this;
    if(!self.data.isLoadAll&&self.data.buttonCanClick){
      self.data.paginate.currentPage++; 
      self.getMainData();
    };
  },



  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },




  intoPathRedirect(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'redi');
  }, 
 
})

  

  