import {
	Api
} from '../../utils/api.js';
var dateTimePicker = require('../../utils/dateTimePicker.js');
var api = new Api();
const app = getApp();

Page({
	data: {
		is_show: false,
		index: 1,
		items: [{
				name: '1天前',
				value: '86400000',
				checked: false,
				getAfterStatus:0,
				getAfterId:''
			},
			{
				name: '3天前',
				value: '259200000',
				checked: false,
				getAfterStatus:0,
				getAfterId:''
			},
			{
				name: '7天前',
				value: '604800000',
				checked: false,
				getAfterStatus:0,
				getAfterId:''
			},
			{
				name: '15天前',
				value: '1296000000',
				checked: false,
				getAfterStatus:0,
				getAfterId:''
			},
			{
				name: '30天前',
				value: '2592000000',
				checked: false,
				getAfterStatus:0,
				getAfterId:''
			},
		],
		saveAfter: [],
		dateArray: ['30', '60'],
		current: 0,
		dateTimeArray1: null,
		dateTime1: null,
		startYear: 2000,
		endYear: 2050,
		submitData: {
			plaintiff: '', //原告
			plaintiff_agent: '',
			plaintiff_phone: '',
			defendant: '',
			defendant_agent: '',
			defendant_phone: '',
			third_person: '',
			third_person_agent: '',
			third_person_phone: '',

			description: '',
			keywords: '',
			open_time: '',
			mediate_time: '',
			location: '',
			dispute: '',
			question: '',
			court_staff: '',
			law: '',
			program: '',
			start_time: '',
			//end_time:'',
			isnotice: ''
		},
		buttonCanClick: true
	},

	onLoad(options) {
		const self = this;
		self.data.openDate = api.timestampToYMD(options.open_time);
		self.data.openTime = api.timestampToMh(options.open_time);
		self.data.submitData.open_time = options.open_time;
		if (options.id) {
			self.data.id = options.id;
			self.getMainData()
		};
		var todayTime = new Date(new Date().toLocaleDateString()).getTime();
		console.log('todayTime', todayTime);
		console.log(self.data.submitData)
		self.setData({
			web_todayTime: todayTime,
			web_submitData: self.data.submitData,
			web_openDate: self.data.openDate,
			web_openTime: self.data.openTime,
			web_buttonCanClick: self.data.buttonCanClick
		})
	},

	getMainData() {
		const self = this;
		const postData = {};
		postData.tokenFuncName = 'getProjectToken';
		postData.searchItem = {
			id: self.data.id
		};
		postData.getAfter = {
			log: {
				tableName: 'Log',
				middleKey: 'id',
				key: 'passage',
				searchItem: {
					status: ['in', [1, -1]]
				},
				condition: '='
			}
		};
		const callback = (res) => {
			if (res.info.data.length > 0) {
				self.data.mainData = res.info.data;
				if (res.info.data[0].log.length > 0) {
					for (var i = 0; i < res.info.data[0].log.length; i++) {
						for (var j = 0; j < self.data.items.length; j++) {
							if (res.info.data[0].log[i].result == self.data.items[j].value && res.info.data[0].log[i].status == 1) {
								self.data.items[j].checked = true
								self.data.items[j].getAfterStatus = 1
								self.data.items[j].getAfterId = res.info.data[0].log[i].id
							}
						}
					}
				};
				if (res.info.data[0].open_time) {
					self.data.openDate = api.timestampToYMD(res.info.data[0].open_time),
						self.data.openTime = api.timestampToMh(res.info.data[0].open_time)
				};
				if (res.info.data[0].mediate_time) {
					self.data.mediateDate = api.timestampToYMD(res.info.data[0].mediate_time),

						self.data.mediateTime = api.timestampToMh(res.info.data[0].mediate_time)
				};
				self.data.submitData.plaintiff = res.info.data[0].plaintiff,
					self.data.submitData.plaintiff_agent = res.info.data[0].plaintiff_agent,
					self.data.submitData.defendant = res.info.data[0].defendant,
					self.data.submitData.defendant_agent = res.info.data[0].defendant_agent,
					self.data.submitData.third_person = res.info.data[0].third_person,
					self.data.submitData.third_person_agent = res.info.data[0].third_person_agent,
					self.data.submitData.description = res.info.data[0].description,
					self.data.submitData.keywords = res.info.data[0].keywords,
					self.data.submitData.open_time = res.info.data[0].open_time,
					self.data.submitData.mediate_time = res.info.data[0].mediate_time,
					self.data.submitData.location = res.info.data[0].location,
					self.data.submitData.dispute = res.info.data[0].dispute,
					self.data.submitData.question = res.info.data[0].question,
					self.data.submitData.court_staff = res.info.data[0].court_staff,
					self.data.submitData.law = res.info.data[0].law,
					self.data.submitData.program = res.info.data[0].program,
					self.data.submitData.start_time = res.info.data[0].start_time,
					self.data.submitData.isnotice = res.info.data[0].isnotice,
					self.data.submitData.plaintiff_phone = res.info.data[0].plaintiff_phone,
					self.data.submitData.defendant_phone = res.info.data[0].defendant_phone,
					self.data.submitData.third_person_phone = res.info.data[0].third_person_phone,
					console.log(self.data.openDate)
			} else {
				api.showToast(data.msg, 'none', 1000)
			}
			self.setData({
				web_submitData: self.data.submitData,
				web_openDate: self.data.openDate,
				web_openTime: self.data.openTime,
				web_mediateDate: self.data.mediateDate,
				web_mediateTime: self.data.mediateTime,
				web_mainData: self.data.mainData,
				items: self.data.items
			})
		};
		api.messageGet(postData, callback);
	},

	changeBind(e) {
		const self = this;
		//api.delStorageArray('submitData');
		if (api.getDataSet(e, 'value')) {
			self.data.submitData[api.getDataSet(e, 'key')] = api.getDataSet(e, 'value');
		} else {
			api.fillChange(e, self, 'submitData');
			// api.setStorageArray('submitData',self.data.submitData);
		};
		self.setData({
			web_submitData: self.data.submitData,
		});
		console.log(self.data.submitData)

	},

	submit() {
		const self = this;
		api.buttonCanClick(self);
		console.log(self.data.mainData)
		if (self.data.mainData && self.data.mainData.length > 0) {
			self.messageUpdate()
		} else {
			const callback = (user, res) => {
				self.messageAdd();
			};
			api.getAuthSetting(callback)
		}
	},

	messageAdd() {
		const self = this;
		const postData = {};
		postData.tokenFuncName = 'getProjectToken';
		postData.data = {};
		postData.data = api.cloneForm(self.data.submitData);
		postData.data.res = {
			passage: 'id'
		}
		/*if(!wx.getStorageSync('info')||!wx.getStorageSync('info').headImgUrl){
		  postData.refreshToken = true;
		};*/
		postData.saveAfter = api.cloneForm(self.data.saveAfter)
		console.log('postData', postData)

		const callback = (data) => {
			if (data.solely_code == 100000) {
				//api.delStorageArray('submitData')
				api.showToast('添加成功', 'none', 2000, function() {
					setTimeout(function() {
						wx.navigateBack({
							delta: 1
						})
					}, 2001)
				});
				/* self.data.submitData ={
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
				 }) */
			} else {
				api.showToast(data.msg, 'none', 1000)
			};
			setTimeout(function() {
				api.buttonCanClick(self, true)
			}, 2002)
		};
		api.messageAdd(postData, callback);
	},

	messageUpdate() {
		const self = this;
		const postData = {};
		postData.tokenFuncName = 'getProjectToken';
		postData.searchItem = {
			id: self.data.mainData[0].id
		};
		postData.data = {};
		postData.data = api.cloneForm(self.data.submitData);

		/*if(!wx.getStorageSync('info')||!wx.getStorageSync('info').headImgUrl){
		  postData.refreshToken = true;
		};*/
		postData.saveAfter = api.cloneForm(self.data.saveAfter)

		const callback = (data) => {
			if (data.solely_code == 100000) {
				//api.delStorageArray('submitData')
				api.showToast('修改成功', 'none', 1500, function() {
					setTimeout(function() {
						wx.navigateBack({
							delta: 1
						})
					}, 1501)
				});

			} else {
				api.showToast(data.msg, 'none', 1501)
			}
			setTimeout(function() {
				api.buttonCanClick(self, true)
			}, 1502)
		};
		api.messageUpdate(postData, callback);
	},


	formIdAdd(e) {
		console.log(e)

		api.WxFormIdAdd(e.detail.formId, Date.parse(new Date()) / 1000 + 7 * 86400);
	},

	changeOpenDate(e) {
		const self = this;
		console.log('changeOpenDate', e.detail.value)
		self.data.openDate = e.detail.value;
		self.setData({
			web_openDate: self.data.openDate
		})
	},

	changeOpenTime(e) {
		const self = this;
		console.log('changeOpenTime', e.detail.value)
		if (self.data.openDate) {
			self.data.open_time = self.data.openDate + ' ' + e.detail.value;
			self.data.submitData.open_time = api.timeToTimestamp(self.data.open_time) * 1000;
			console.log(self.data.submitData.open_time)
			self.setData({
				web_submitData: self.data.submitData,
				web_openTime: e.detail.value
			})
		} else {
			api.showToast('请选择开庭日期', 'none', 1000)
		}

	},

	changeMediateDate(e) {
		const self = this;
		console.log('changeOpenDate', e.detail.value)
		self.data.mediateDate = e.detail.value;
		self.setData({
			web_mediateDate: self.data.mediateDate
		})
	},

	changeMediateTime(e) {
		const self = this;
		if (self.data.mediateDate) {
			self.data.mediate_time = self.data.mediateDate + ' ' + e.detail.value;
			self.data.submitData.mediate_time = api.timeToTimestamp(self.data.mediate_time) * 1000;
			console.log(self.data.submitData.open_time)
			self.setData({
				web_submitData: self.data.submitData,
				web_mediateTime: e.detail.value
			})
		} else {
			api.showToast('请选择调解日期', 'none', 1000)
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
		var value = api.getDataSet(e, 'value');
		/* self.data.saveAfter = []; */
		if (self.data.mainData) {
	
			console.log('self.data.items', self.data.items)
		for (var i = 0; i < self.data.items.length; i++) {
			if(value == self.data.items[i].value){
				self.data.items[i].checked = !self.data.items[i].checked
				
			}
			
			if (value == self.data.items[i].value&&self.data.items[i].getAfterStatus==0&&self.data.items[i].checked==true) {
				self.data.saveAfter.push({
						tableName: 'Log',
						FuncName: 'add',
						data: {
							type: 3,
							result: self.data.items[i].value,
							passage: self.data.mainData[0].id,
							thirdapp_id: 2,
							user_no: wx.getStorageSync('info').user_no
						}
					}
					
				)
	
			}else if(value == self.data.items[i].value&&self.data.items[i].getAfterStatus==1&&self.data.items[i].checked==false){
				self.data.saveAfter.push({
						tableName: 'Log',
						FuncName: 'update',
						searchItem:{
							id:self.data.items[i].getAfterId
						},
						data:{
							status:-1
						}
					}
					
				)
			
			}else if(value == self.data.items[i].value&&self.data.items[i].getAfterStatus==-1&&self.data.items[i].checked==true){
				self.data.saveAfter.push({
						tableName: 'Log',
						FuncName: 'update',
						searchItem:{
							id:self.data.items[i].getAfterId
						},
						data:{
							status:1
						}
					}
				
				)
			
			}else if(value == self.data.items[i].value&&self.data.items[i].getAfterStatus==0&&self.data.items[i].checked==false)
				for (var j = 0; j < self.data.saveAfter.length; j++) {
					if(value==self.data.saveAfter[j].data.result){
						self.data.saveAfter.splice(j,1)
					}
				}

			}
		} else {
			/* for (var i = 0; i < value.length; i++) { */
			self.data.saveAfter = [];
			for (var i = 0; i < self.data.items.length; i++) {
				if (value == self.data.items[i].value) {
					self.data.items[i].checked = !self.data.items[i].checked
				}
			};
			console.log('self.data.items', self.data.items)
			for (var i = 0; i < self.data.items.length; i++) {
				if (self.data.items[i].checked == true) {
					self.data.saveAfter.push({
							tableName: 'Log',
							FuncName: 'add',
							data: {
								type: 3,
								result: self.data.items[i].value,
								res: {
									passage: 'id'
								},
								thirdapp_id: 2,
								user_no: wx.getStorageSync('info').user_no
							}
						}

					)
				}
			}
			/* } */
		} /* else {

			for (var i = 0; i < self.data.items.length; i++) {
				if (value == self.data.items[i].value) {

					self.data.items[i].checked = !self.data.items[i].checked
				}
			};
			console.log('self.data.items', self.data.items)
			for (var i = 0; i < self.data.items.length; i++) {
				if (self.data.items[i].checked == true) {
					self.data.saveAfter.push({
							tableName: 'Log',
							FuncName: 'add',
							data: {
								type: 3,
								result: self.data.items[i].value,
								res: {
									passage: 'id'
								},
								thirdapp_id: 2,
								user_no: wx.getStorageSync('info').user_no
							}
						}

					)
				}
			}
 */

		




		console.log('checkbox发生change事件，携带value值为：', value)
		console.log('self.data.saveAfter，携带value值为：', self.data.saveAfter)
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
			path: 'pages/caseDetail/caseDetail?id=' + self.data.id,
			success: function(res) {
				console.log(res);
				console.log(parentNo)
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

	intoPath(e) {
		const self = this;
		api.pathTo(api.getDataSet(e, 'path'), 'nav');
	},

	show() {
		const self = this;
		self.is_show = !self.is_show
		self.setData({
			is_show: self.is_show
		})
	},








	bindNoticeDate(e) {
		const self = this;
		self.setData({
			noticeDate: e.detail.value
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
