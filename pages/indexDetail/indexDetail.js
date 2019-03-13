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
	
	onShareAppMessage(res) {
		const self = this;
		console.log(res)
		if (res.from == 'button') {
			self.data.shareBtn = true;
		} else {
			self.data.shareBtn = false;
		}
		return {
			title: '办案日历',
			path: 'pages/index/index?index=' + self.data.index ,
			success: function(res) {

				if (res.errMsg == 'shareAppMessage:ok') {
					console.log('分享成功')
					if (self.data.shareBtn) {
						if (res.hasOwnProperty('shareTickets')) {
							console.log(res.shareTickets[0]);
							self.data.isshare = 1;
						} else {
							self.data.isshare = 0;
						}
					}
				} else {
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

  