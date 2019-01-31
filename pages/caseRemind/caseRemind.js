import {
    Api
} from '../../utils/api.js';
var api = new Api();
const app = getApp();

Page({
    data: {

        searchItem: {
            thirdapp_id: getApp().globalData.thirdapp_id,
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
        const callback = (res) => {
            if (res.info.data.length > 0) {
                self.data.mainData.push.apply(self.data.mainData, res.info.data);
                for (var i = 0; i < self.data.mainData.length; i++) {
                    var time = api.timeToTimestamp(self.data.mainData[i].create_time)

                    self.data.mainData[i].create_time = api.getDateDiff(time)
                    console.log(self.data.mainData[i].create_time)
                }
            } else {
                self.data.isLoadAll = true;
                api.showToast('没有更多了', 'fail');
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