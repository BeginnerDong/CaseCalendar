
import {CalendarConverter,GetDayCount} from '../../utils/calendar-converter.js';
var calendarConverter = new CalendarConverter();
var getDayCount = new GetDayCount();
import {Api} from '../../utils/api.js';
var api = new Api();
const app = getApp();

Page({
    data:{

        dateData: {
            date: "",                //当前日期字符串
            arrInfoEx: [],           //农历节假日等扩展信息
        },
        signData:[],
        mainData:[],
        isFirstLoadAllStandard:['mainData'],
        
    },


    onLoad: function() {
        const self = this;
        self.calenderInit();
    },


    calenderInit(){
        const self = this;
        var curDate = new Date();
        self.data.curMonth = curDate.getMonth();
        self.data.curYear = curDate.getFullYear();
        self.data.curDay = curDate.getDate();
        console.log('calenderInit');
        self.refreshPageData(self.data.curYear, self.data.curMonth, self.data.curDay);
    },

    //刷新全部数据
    refreshPageData(year, month, day){
        const self = this;
        self.data.mainData = [];
        self.data.signData = [];
        console.log('refreshPageData',calendarConverter);
        console.log('getDayCount',getDayCount);

        self.data.curMonth = month;
        self.data.curYear = year;
        self.data.curDay = day;
        self.getOffset(self.data.curYear,self.data.curMonth);
        self.data.dateData.date = self.data.curYear + '年'+ (self.data.curMonth + 1) + '月';
        self.data.monthArray = [new Date(self.data.curYear, self.data.curMonth, 1).getTime(),new Date(self.data.curYear, self.data.curMonth+1, 1).getTime()]
        var offset = self.getOffset(self.data.curYear, self.data.curMonth);
        for (var i = 0; i < offset; ++i){
            self.data.dateData.arrInfoEx[i] = {isEmpty:true};
        };
        var dayCount = getDayCount(self.data.curYear, self.data.curMonth);
        console.log('dayCount',dayCount)
        for (var i = offset; i < dayCount + offset; ++i){
            var d = new Date(year, month, i - offset + 1);
            var dEx = calendarConverter.solar2lunar(d);
            self.data.dateData.arrInfoEx[i] = dEx;
            self.data.dateData.arrInfoEx[i].hasItem = 0;
        };
        console.log('self.data.dateData',self.data.dateData);
        self.getMainData();
        self.setData({
            web_dateData: self.data.dateData,
        })
    },





    //获取此月第一天相对视图显示的偏移
   getOffset(curYear, curMonth){
        const self = this;
        var offset = new Date(curYear, curMonth, 1).getDay();
        offset = offset == 0 ? 6 : offset - 1; 
        //注意这个转换，Date对象的getDay函数返回返回值是 0（周日） 到 6（周六） 
        console.log('offset',offset)
        return offset;
    },

    getMainData(){
        const  self =this;
        const postData={};
        postData.tokenFuncName = 'getProjectToken';
        postData.searchItem = {
            thirdapp_id:getApp().globalData.thirdapp_id,
            open_time:['between',self.data.monthArray]
        };
        const callback =(res)=>{
          if(res.info.data.length>0){
            self.data.mainData.push.apply(self.data.mainData,res.info.data);
          };
          for (var i = 0; i < self.data.mainData.length; i++) {
              self.data.mainData[i].open_time = api.timestampToTime(self.data.mainData[i].open_time)
              self.data.signData.push(self.data.mainData[i].open_time);
              for (var j = 0; j < self.data.dateData.arrInfoEx.length; j++) {
                 if(self.data.dateData.arrInfoEx[j].sDay == self.data.signData[i]){
                    self.data.dateData.arrInfoEx[j].hasItem++
                 }
              }
          };
          console.log('self.data.dateData',self.data.dateData)
          console.log('self.data.signData',self.data.signData)
          api.checkLoadAll(self.data.isFirstLoadAllStandard,'mainData',self);
          self.setData({
            web_dateData:self.data.dateData,
            web_signData:self.data.signData,
          });
        };
        api.messageGet(postData,callback);
    },




    goToday: function(e){
        const self = this;
        var curDate = new Date();
        self.data.curMonth = curDate.getMonth();
        self.data.curYear = curDate.getFullYear();
        self.data.curDay= curDate.getDate();
        this.getMainData();
        self.refreshPageData(self.data.curYear, self.data.curMonth, self.data.curDay);
        this.setData({
            web_dateData: self.data.dateData,
        })
    },

    goLastMonth: function(e){
        const self = this;
        if (0 == self.data.curMonth)
        {
            self.data.curMonth = 11;
            --self.data.curYear
        }
        else
        {
            --self.data.curMonth;
        }
        self.refreshPageData(self.data.curYear, self.data.curMonth, 1);
        this.setData({
            web_dateData: self.data.dateData,
        })
    },

    goNextMonth: function(e){
        const self = this;
        if (11 == self.data.curMonth)
        {
            self.data.curMonth = 0;
            ++self.data.curYear
        }
        else
        {
            ++self.data.curMonth;
        }
        self.refreshPageData(self.data.curYear, self.data.curMonth, 1);
        this.setData({
            web_dateData: self.data.dateData,
        })
    },

    selectDay: function(e){
        const self = this;
        var date  = api.getDataSet(e,'date')
        console.log(e)
        wx.navigateTo({
          url:"/pages/indexNewCase/indexNewCase?date="+date,
        })

    },

    bindDateChange: function(e){
        const self = this;
        var arr = e.detail.value.split("-");

        self.refreshPageData(+arr[0], arr[1]-1, +arr[2]);
        this.setData({
            web_dateData: self.data.dateData,
        })
    },


    intoPath(e){
        const self = this;
        api.pathTo(api.getDataSet(e,'path'),'nav');
    },




    //获取当前索引下是几号
    getDay(index) {
        return index - curDayOffset;
    },

    //获取两个时间戳之间间隔的天数
    getOffDays(startDate, endDate) {  
        //得到时间戳相减 得到以毫秒为单位的差  
        var mmSec = (endDate.getTime() - startDate.getTime());
        //单位转换为天并返回 
        return (mmSec / 3600000 / 24); 
    } 

});