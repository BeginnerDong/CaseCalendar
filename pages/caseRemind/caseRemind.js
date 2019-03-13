import {
    Api
} from '../../utils/api.js';
var api = new Api();
const app = getApp();

Page({
    data: {

        searchItem: {
            thirdapp_id: getApp().globalData.thirdapp_id,
			type:5
        },
        mainData: [],
        isFirstLoadAllStandard: ['getMainData'],

    },

    onLoad(options) {
        const self = this;
        api.commonInit(self);
        self.getMainData();
    },

    getMainData(isNew) {
        const self = this;
        if (isNew) {
            api.clearPageIndex(self)
        };
        const postData = {};
        postData.tokenFuncName = 'getProjectToken';
        postData.paginate = api.cloneForm(self.data.paginate);
        postData.searchItem = api.cloneForm(self.data.searchItem);
		postData.searchItem.user_no = wx.getStorageSync('info').user_no;
        const callback = (res) => {
            if (res.info.data.length > 0) {
               
                for (var i = 0; i < res.info.data.length; i++) {
                    var time = api.timeToTimestamp(res.info.data[i].create_time)
                    
                    res.info.data[i].create_time = api.getDateDiff(time)
           
                }
				 self.data.mainData.push.apply(self.data.mainData, res.info.data);
            } else {
                self.data.isLoadAll = true;

            };
            api.buttonCanClick(self, true);
            api.checkLoadAll(self.data.isFirstLoadAllStandard, 'getMainData', self);
            self.setData({
                web_mainData: self.data.mainData,
            });
        };
        api.logGet(postData, callback);
    },




    onReachBottom() {
        const self = this;
        if (!self.data.isLoadAll && self.data.buttonCanClick) {
            self.data.paginate.currentPage++;
            self.getMainData();
        };
    },



    intoPath(e) {
        const self = this;
        api.pathTo(api.getDataSet(e, 'path'), 'nav');
    },




    intoPathRedirect(e) {
        const self = this;
        api.pathTo(api.getDataSet(e, 'path'), 'redi');
    },

})