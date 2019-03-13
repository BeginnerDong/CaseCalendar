import {
	Api
} from '../../utils/api.js';
var api = new Api();
const app = getApp();

Page({

	data: {
		currentId: 0,
		searchItem: {},
		mainData: [],
		isFirstLoadAllStandard: ['getMainData'],
		order:{}
	},

	onLoad(options) {
		const self = this;
		var nowTime = new Date().getTime();
		if (options.id && options.id == 1) {
			self.data.currentId = options.id;
			self.data.searchItem.open_time = ['>', nowTime];
			self.data.order = {
				open_time:'asc'
			}
		} else if (options.id && options.id == 2) {
			self.data.searchItem.open_time = ['<', nowTime];
			self.data.order = {
				open_time:'asc'
			}
		}else{
			self.data.order = {
				open_time:'desc'
			}
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
		postData.order = api.cloneForm(self.data.order);
		const callback = (res) => {
			api.buttonCanClick(self, true);
			if (res.info.data.length > 0) {
				self.data.mainData.push.apply(self.data.mainData, res.info.data);
			} else {
				self.data.isLoadAll = true;
				api.showToast('没有更多了', 'fail');
			};
			
			api.checkLoadAll(self.data.isFirstLoadAllStandard, 'getMainData', self);
			self.setData({
				web_mainData: self.data.mainData,
			});
		};
		api.messageGet(postData, callback);
	},

	messageDelete(index) {
		const self = this;
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

	toDelete(e) {
		const self = this;
		var index = api.getDataSet(e, 'index');
		wx.showModal({
			title: '删除案件',
			content: '请确认是否删除此案件',
			success(res) {
				if (res.confirm) {
					self.messageDelete(index)
				} else if (res.cancel) {
					api.showToast('取消删除', 'none')
				}
			}
		})
	},


	changeSearch(e) {
		const self = this;
		api.buttonCanClick(self);
		console.log(self.data.buttonCanClick);
		self.data.searchItem = {};
		var nowTime = new Date().getTime();
		var currentId = api.getDataSet(e, 'id');
		if (currentId == 1) {
			self.data.searchItem.open_time = ['>', nowTime];
			self.data.order = {
				open_time:'asc'
			}
		} else if (currentId == 2) {
			self.data.searchItem.open_time = ['<', nowTime];
			self.data.order = {
				open_time:'desc'
			};
			
		} else if (currentId == 0) {
			self.data.searchItem = {};
			self.data.order = {
				open_time:'desc'
			}
		};
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

	intoPathRedirect(e) {
		const self = this;
		api.pathTo(api.getDataSet(e, 'path'), 'redi');
	},

})
