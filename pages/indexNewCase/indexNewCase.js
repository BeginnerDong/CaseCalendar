import {Api} from '../../utils/api.js';
var api = new Api();
const app = getApp();


Page({
  data: {
    is_choose:0,
  },
  choose_day(e){
    const self = this;
    self.setData({
      is_choose:e.currentTarget.dataset.id
    })
    console.log(self.data.is_choose);
  },
  onLoad(options) {
    const self = this;

  },
  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },
  intoPathRedirect(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'redi');
  }, 
})

  