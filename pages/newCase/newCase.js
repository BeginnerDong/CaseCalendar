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
      endYear: 2050
    },

  onLoad(options){
      var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();
 
    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime
    });
  },
  changeDate(e){
    this.setData({ date:e.detail.value});
  },
  changeTime(e){
    this.setData({ time: e.detail.value });
  },
  changeDateTime(e){
    this.setData({ dateTime: e.detail.value });
  },
  changeDateTime1(e) {
    this.setData({ dateTime1: e.detail.value });
  },
  changeDateTimeColumn(e){
    var arr = this.data.dateTime, dateArr = this.data.dateTimeArray;
 
    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
 
    this.setData({
      dateTimeArray: dateArr,
      dateTime: arr
    });
  },
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;
 
    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
 
    this.setData({ 
      dateTimeArray1: dateArr,
      dateTime1: arr
    });
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
  bindTimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  bindtimeTwo(e) {
    this.setData({
      timeTwo: e.detail.value
    })
  },
  bindDateChange(e) {
    const self = this;
    self.setData({
      date: e.detail.value
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

  