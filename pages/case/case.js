import { Api } from '../../utils/api.js';
var api = new Api();
const app = getApp();

Page({

    data: {
        currentId: 0,
        searchItem: {},
        mainData: [],
        isFirstLoadAllStandard: ['getMainData'],

    },

    onLoad(options) {
        const self = this;
        var nowTime = new Date().getTime();
        if (options.id && options.id == 1) {
            self.data.currentId = options.id;
            self.data.searchItem.open_time = ['>', nowTime]
        } else if (options.id && options.id == 2) {
            self.data.searchItem.open_time = ['<', nowTime]
        }
        api.commonInit(self);
        self.setData({
            web_currentId: self.data.currentId
        });
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
        postData.searchItem.thirdapp_id = getApp().globalData.thirdapp_id;
        postData.order = {
            open_time: 'desc'
        };
        const callback = (res) => {
            if (res.info.data.length > 0) {
                self.data.mainData.push.apply(self.data.mainData, res.info.data);
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
        api.messageGet(postData, callback);
    },

    messageDelete(e) {
        const self = this;
        var index = api.getDataSet(e, 'index');
        const postData = {};
        postData.tokenFuncName = 'getProjectToken';
        postData.searchItem = {
            id: self.data.mainData[index].id
        };
        postData.data = {
            status: -1
        };
        const callback = (res) => {
            if (res.solely_code == 100000) {
                api.showToast('删除成功', 'none')
            } else {
                api.showToast(res.msg, 'none')
            };
            self.getMainData(true)
        };
        api.messageDelete(postData, callback);
    },



    changeSearch(e) {
        const self = this;
        api.buttonCanClick(self);
        self.data.searchItem = {};
        var nowTime = new Date().getTime();
        var currentId = api.getDataSet(e, 'id');
        if (currentId == 1) {
            self.data.searchItem.open_time = ['>', nowTime]
        } else if (currentId == 2) {
            self.data.searchItem.open_time = ['<', nowTime]
        }
        self.setData({
            web_currentId: currentId
        });
        self.getMainData(true);
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

    tab(e) {
        this.setData({
            currentId: e.currentTarget.dataset.id
        })
    },


    intoPathRedirect(e) {
        const self = this;
        api.pathTo(api.getDataSet(e, 'path'), 'redi');
    },

})