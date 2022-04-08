function FrameElement() {}

FrameElement.prototype = {
  initFrame: function () {
    // 渲染 inpoint 时设置为 true
    this._isFirstFrame = false;
    // 动画属性列表
    this.dynamicProperties = [];
    // 如果图层在当前刻度中已被修改，这将是 true
    this._mdf = false;
  },

  prepareProperties: function (num, isVisible) {
    var i,
      len = this.dynamicProperties.length;

    for (i = 0; i < len; i += 1) {
      if (isVisible || (this._isParent && this.dynamicProperties[i].propType === 'transform')) {
        this.dynamicProperties[i].getValue();
        
        if (this.dynamicProperties[i]._mdf) {
          this.globalData._mdf = true;
          this._mdf = true;
        }
      }
    }
  },

  addDynamicProperty: function (prop) {
    if (this.dynamicProperties.indexOf(prop) === -1) {
      this.dynamicProperties.push(prop);
    }
  },
};
