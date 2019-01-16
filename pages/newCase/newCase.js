import {Api} from '../../utils/api.js';
var dateTimePicker = require('../../utils/dateTimePicker.js');
var api = new Api();
const app = getApp();

Page({
  data: {
      is_show:false,
      index:1,
      array: ['微信提醒', '站内消息提醒'],
      dateArray: ['30', '60'],
      current:0,
      dateTimeArray1: null,
      dateTime1: null,
      startYear: 2000,
      endYear: 2050,
      submitData:{
        plaintiff:'',//原告
        plaintiff_agent:'',
        defendant:'',
        defendant_agent:'',
        third_person:'',
        third_person_agent:'',
        description:'',
        keywords:'',
        open_time:'',
        mediate_time:'',
        location:'',
        dispute:'',
        question:'',
        court_staff:'',
        law:'',
        program:'',
        start_time:'',
        //end_time:'',
        isnotice:''
      }, 
      buttonCanClick:true
    },

  onLoad(options){
    const self = this;
    //self.data.submitData = api.getStorageArray('submitData');
    console.log(self.data.submitData)
    self.setData({
      web_submitData:self.data.submitData,
      web_buttonCanClick:self.data.buttonCanClick
    })
  },

  changeBind(e){
    const self = this;
    //api.delStorageArray('submitData');
    if(api.getDataSet(e,'value')){
      self.data.submitData[api.getDataSet(e,'key')] = api.getDataSet(e,'value');
    }else{
      api.fillChange(e,self,'submitData');
     // api.setStorageArray('submitData',self.data.submitData);
    };
    self.setData({
      web_submitData:self.data.submitData,
    }); 
    console.log(self.data.submitData)

  },

  submit(){
    const self = this;
    api.buttonCanClick(self);
    const pass = api.checkComplete(self.data.submitData);
    console.log('pass',pass);
    if(pass){
      const callback = (user,res) =>{
        self.messageAdd(); 
      };
     api.getAuthSetting(callback)
   }else{
      api.showToast('请补全信息','none')
      api.buttonCanClick(self,true)     
   };
  },

  messageAdd(){
    const self =this;
    const postData = {};
    postData.tokenFuncName = 'getProjectToken';
    postData.data = {};
    postData.data = api.cloneForm(self.data.submitData);
    /*if(!wx.getStorageSync('info')||!wx.getStorageSync('info').headImgUrl){
      postData.refreshToken = true;
    };*/
    const callback = (data)=>{
      if(data.solely_code==100000){
        //api.delStorageArray('submitData')
        api.showToast('添加成功','none',1000,function(){
          setTimeout(function(){
            wx.navigateBack({
              delta:1
            }) 
          },1000);  
        })

      }else{
        api.showToast(data.msg,'none',1000)
      }
      api.buttonCanClick(self,true)
    };
    api.messageAdd(postData,callback);
  },


  changeOpenDate(e){
    const self = this;
    console.log('changeOpenDate',e.detail.value)
    self.data.openDate = e.detail.value;
    self.setData({
      web_openDate:self.data.openDate
    })
  },

  changeOpenTime(e) {
    const self = this;
    console.log('changeOpenTime',self.data.open_time)
    if(self.data.openDate){
      self.data.open_time = self.data.openDate+' '+e.detail.value;
      self.data.submitData.open_time = api.timeToTimestamp(self.data.open_time)*1000;
      console.log(self.data.submitData.open_time)
    }else{
      api.showToast('请选择开庭日期','none',1000)
    }
    self.setData({
      web_openTime:e.detail.value
    })
  },

  changeMediateDate(e){
    const self = this;
    console.log('changeOpenDate',e.detail.value)
    self.data.mediateDate = e.detail.value;
    self.setData({
      web_mediateDate:self.data.mediateDate
    })
  },

  changeMediateTime(e) {
    const self = this;
    console.log('changeOpenTime',self.data.open_time)
    if(self.data.mediateDate){
      self.data.mediate_time = self.data.mediateDate+' '+e.detail.value;
      self.data.submitData.mediate_time = api.timeToTimestamp(self.data.mediate_time)*1000;
      console.log(self.data.submitData.open_time)
    }else{
      api.showToast('请选择调节日期','none',1000)
    }
    self.setData({
      web_mediateTime:e.detail.value
    })
    
  },

  changeNoticeDate(e){
    const self = this;

    self.data.noticeDate = e.detail.value;
    self.setData({
      web_noticeDate:self.data.noticeDate
    })
  },

  changeNoticeTime(e) {
    const self = this;
    if(self.data.noticeDate){
      self.data.notice_time = self.data.noticeDate+' '+e.detail.value;
      self.data.submitData.start_time = api.timeToTimestamp(self.data.notice_time)*1000;
    }else{
      api.showToast('请选择提醒日期','none',1000)
    }
    self.setData({
      web_noticeTime:e.detail.value
    })
    
  },

  
  
  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },

  show(){
    const self = this;
    self.is_show = !self.is_show
    self.setData({
      is_show:self.is_show
    })
  },



 




  bindNoticeDate(e) {
    const self = this;
    self.setData({
      noticeDate:e.detail.value
    })
  },

  bindPickerChange(e) {
    this.setData({
      index: e.detail.value
    })
  },

  bindChooseDate(e) {
    this.setData({
      current: e.detail.value
    })
  },

})

  