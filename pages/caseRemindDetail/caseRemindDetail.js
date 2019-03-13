import { Api } from '../../utils/api.js';
var api = new Api();
const app = getApp();
import { Token } from '../../utils/token.js';
const token = new Token();

Page({
    data: {
		isFirstLoadAllStandard:['getMainData']
    },
	
    onLoad(options) {
        const self = this;
        api.commonInit(self);
		self.data.id=options.id;
        self.getMainData();
    },
    
    getMainData() {
        const self = this;
        const postData = {};
        postData.tokenFuncName = 'getProjectToken';
        postData.searchItem = {
			id:self.data.id
		};
        const callback = (res) => {
            if (res.info.data.length > 0) {
                self.data.mainData = res.info.data[0];
				var time = api.timeToTimestamp(self.data.mainData.create_time)
				self.data.mainData.create_time = api.getDateDiff(time)
			
              
            } else {
                api.showToast('数据错误', 'none');
            };
            api.checkLoadAll(self.data.isFirstLoadAllStandard, 'getMainData', self);
            self.setData({
                web_mainData: self.data.mainData,
            });
        };
        api.logGet(postData, callback);
    },

    intoPath(e) {
        const self = this;
        api.pathTo(api.getDataSet(e, 'path'), 'nav');
    },

    intoPathRedi(e) {
        const self = this;
        wx.navigateBack({
            delta: 1
        })
    },
    intoPathRedirect(e) {
        const self = this;
        api.pathTo(api.getDataSet(e, 'path'), 'redi');
    },

})