import {Api} from '../../utils/api.js';
var api = new Api();
const app = getApp();


Page({
  data: {

    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: true,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    mainData:[],
    sliderData:[],
    isFirstLoadAllStandard:['getMainData','getSliderData']
  },
  //事件处理函数
 


  onLoad(options) {
    const self = this;
    api.commonInit(self);
    self.getSliderData();
    self.getMainData()
  },

  getSliderData(){
    const self = this;
    const postData = {};
    postData.searchItem = {
      thirdapp_id:getApp().globalData.thirdapp_id
    };
    postData.getBefore ={
     caseData:{
        tableName:'Label',
        searchItem:{
          title:['=',['首页轮播']],
        },
        middleKey:'parentid',
        key:'id',
        condition:'in',
      },
    };
    const callback = (res)=>{ 
      console.log(1000,res);
      if(res.info.data.length>0){
        self.data.sliderData.push.apply(self.data.sliderData,res.info.data);

      }
      self.setData({
        web_sliderData:self.data.sliderData,
      });
      api.checkLoadAll(self.data.isFirstLoadAllStandard,'getSliderData',self);
    };
    api.labelGet(postData,callback);
  },

  getMainData(){
    const  self =this;
    const postData={};
    postData.paginate = api.cloneForm(self.data.paginate);
    postData.searchItem = {
      thirdapp_id:getApp().globalData.thirdapp_id,
    };
    postData.getBefore ={
     caseData:{
        tableName:'Label',
        searchItem:{
          title:['=',['法律资讯']],
        },
        middleKey:'menu_id',
        key:'id',
        condition:'in',
      },
    };
    const callback =(res)=>{
      if(res.info.data.length>0){
        self.data.mainData.push.apply(self.data.mainData,res.info.data);
        api.setStorageArray('mainData',self.data.mainData,'id',999);
      }else{
        self.data.isLoadAll = true;
        api.showToast('没有更多了','fail');
      };
      api.checkLoadAll(self.data.isFirstLoadAllStandard,'getMainData',self);
      self.setData({
        web_mainData:self.data.mainData,
      });
    };
    api.articleGet(postData,callback);
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

  