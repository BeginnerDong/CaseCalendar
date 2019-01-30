import {Api} from '../../utils/api.js';
var dateTimePicker = require('../../utils/dateTimePicker.js');
var api = new Api();
const app = getApp();

Page({
  data: {
      is_show:false,
      index:1,
      items: [
          {name: '1天前', value: '86400000'},
          {name: '3天前', value: '259200000'},
          {name: '7天前', value: '604800000'},
          {name: '15天前', value: '1296000000'},
          {name: '30天前', value: '2592000000'},
      ],
      saveAfter:[],
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
    
    if(options.id){
      self.data.id = options.id;
      self.getMainData()
    };
    var todayTime = new Date(new Date().toLocaleDateString()).getTime();
    console.log('todayTime',todayTime);
    console.log(self.data.submitData)
    self.setData({
      web_todayTime:todayTime,
      web_submitData:self.data.submitData,
      web_buttonCanClick:self.data.buttonCanClick
    })
  },

  getMainData(){
    const self =this;
    const postData = {};
    postData.tokenFuncName = 'getProjectToken';
    postData.searchItem={
      id:self.data.id
    };
    postData.getAfter = {
      log:{
        tableName:'Log',
        middleKey:'id',
        key:'passage',
        searchItem:{
          status:['in',[1,-1]]
        },
        condition:'='
      }
    };
    const callback = (res)=>{
      if(res.info.data.length>0){
        if(res.info.data[0].open_time){
          self.data.openDate = api.timestampToYMD(res.info.data[0].open_time),
          self.data.openTime = api.timestampToMh(res.info.data[0].open_time)
        };
        if(res.info.data[0].mediate_time){
          self.data.mediateDate = api.timestampToYMD(res.info.data[0].mediate_time),
        
          self.data.mediateTime = api.timestampToMh(res.info.data[0].mediate_time)
        };
        self.data.submitData.plaintiff=res.info.data[0].plaintiff,
        self.data.submitData.plaintiff_agent=res.info.data[0].plaintiff_agent,
        self.data.submitData.defendant=res.info.data[0].defendant,
        self.data.submitData.defendant_agent=res.info.data[0].defendant_agent,
        self.data.submitData.third_person=res.info.data[0].third_person,
        self.data.submitData.third_person_agent=res.info.data[0].third_person_agent,
        self.data.submitData.description=res.info.data[0].description,
        self.data.submitData.keywords=res.info.data[0].keywords,
        self.data.submitData.open_time=res.info.data[0].open_time,
        self.data.submitData.mediate_time=res.info.data[0].mediate_time,
        self.data.submitData.location=res.info.data[0].location,
        self.data.submitData.dispute=res.info.data[0].dispute,
        self.data.submitData.question=res.info.data[0].question,
        self.data.submitData.court_staff=res.info.data[0].court_staff,
        self.data.submitData.law=res.info.data[0].law,
        self.data.submitData.program=res.info.data[0].program,
        self.data.submitData.start_time=res.info.data[0].start_time,
        self.data.submitData.isnotice=res.info.data[0].isnotice,
        
        

        console.log(self.data.openDate)
      }else{
        api.showToast(data.msg,'none',1000)
      }
      self.setData({
        web_submitData:self.data.submitData,
        web_openDate:self.data.openDate,
        web_openTime:self.data.openTime,
        web_mediateDate:self.data.mediateDate,
        web_mediateTime:self.data.mediateTime,
        web_mainData:res.info.data[0]
      })
    };
    api.messageGet(postData,callback);
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
    
    if(self.data.mainData){
      self.messageUpdate()
    }else{
      const callback = (user,res) =>{
        self.messageAdd(); 
      };
     api.getAuthSetting(callback)
    }
    
  
  },

  messageAdd(){
    const self =this;
    const postData = {};
    postData.tokenFuncName = 'getProjectToken';
    postData.data = {};
    postData.data = api.cloneForm(self.data.submitData);
    postData.data.res={passage:'id'}
    /*if(!wx.getStorageSync('info')||!wx.getStorageSync('info').headImgUrl){
      postData.refreshToken = true;
    };*/
    postData.saveAfter = api.cloneForm(self.data.saveAfter)
    console.log('postData',postData)

    const callback = (data)=>{
      if(data.solely_code==100000){
        //api.delStorageArray('submitData')
        api.showToast('添加成功','none')
        self.data.submitData ={
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
        self.setData({
          web_submitData:self.data.submitData,
          web_openDate:'',
          web_openTime:'',
          web_mediateDate:'',
          web_mediateTime:''
        })
      }else{
        api.showToast(data.msg,'none',1000)
      }
      api.buttonCanClick(self,true)
    };
    api.messageAdd(postData,callback);
  },

  messageUpdate(){
    const self =this;
    const postData = {};
    postData.tokenFuncName = 'getProjectToken';
    postData.searchItem = {
      id:self.data.mainData.id
    };
    postData.data = {};
    postData.data = api.cloneForm(self.data.submitData);
    postData.data.res={passage:'id'}
    /*if(!wx.getStorageSync('info')||!wx.getStorageSync('info').headImgUrl){
      postData.refreshToken = true;
    };*/
    postData.saveAfter = api.cloneForm(self.data.saveAfter)
 
    const callback = (data)=>{
      if(data.solely_code==100000){
        //api.delStorageArray('submitData')
        api.showToast('保存成功','none')
        
      }else{
        api.showToast(data.msg,'none',1000)
      }
      api.buttonCanClick(self,true)
    };
    api.messageUpdate(postData,callback);
  },


  formIdAdd(e){
    console.log(e)
    api.WxFormIdAdd(e.detail.formId,(new Date()).getTime()/1000+7*86400);   
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
    console.log('changeOpenTime',e.detail.value)
    if(self.data.openDate){
      self.data.open_time = self.data.openDate+' '+e.detail.value;
      self.data.submitData.open_time = api.timeToTimestamp(self.data.open_time)*1000;
      console.log(self.data.submitData.open_time)
      self.setData({
        web_submitData:self.data.submitData,
        web_openTime:e.detail.value
      })
    }else{
      api.showToast('请选择开庭日期','none',1000)
    }
    
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
    if(self.data.mediateDate){
      self.data.mediate_time = self.data.mediateDate+' '+e.detail.value;
      self.data.submitData.mediate_time = api.timeToTimestamp(self.data.mediate_time)*1000;
      console.log(self.data.submitData.open_time)
      self.setData({
        web_submitData:self.data.submitData,
        web_mediateTime:e.detail.value
      })
    }else{
      api.showToast('请选择调解日期','none',1000)
    }
    
    
  },

  /*changeNoticeDate(e){
    const self = this;

    self.data.noticeDate = e.detail.value;
    self.setData({
      web_noticeDate:self.data.noticeDate
    })
  },*/

/*  changeNoticeTime(e) {
    const self = this;
    if(self.data.noticeDate){
      self.data.notice_time = self.data.noticeDate+' '+e.detail.value;
      self.data.submitData.start_time = api.timeToTimestamp(self.data.notice_time)*1000;
      self.setData({
        web_noticeTime:e.detail.value
      })
    }else{
      api.showToast('请选择提醒日期','none',1000)
    } 
  },*/

  checkboxChange(e) {
    console.log(e)
    const self = this;
    self.data.saveAfter = [];
    if(self.data.mainData&&self.data.mainData.log.length>0){
      for (var i = 0; i < self.data.mainData.log.length; i++) {
        for (var j = 0; j < e.detail.value.length; j++) {
          if(self.data.mainData.log[i].result==e.detail.value[j]){
            self.data.saveAfter.push(
              {
                tableName:'Log',
                FuncName:'update',
                searchItem:{
                  id:self.data.mainData.log[i].id
                },
                data:{
                  status:self.data.mainData.log[i].status*-1
                }
              }
              
            ) 
          }
        }  
      }
    }else{
      for (var i = 0; i < e.detail.value.length; i++) {
        self.data.saveAfter.push(
          {
            tableName:'Log',
            FuncName:'add',
            data:{
              type:3,
              result:e.detail.value[i],
              res:{paassage:'id'}
            }
          }
    
        )
      }
    }
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    console.log('self.data.saveAfter，携带value值为：', self.data.saveAfter)
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

  