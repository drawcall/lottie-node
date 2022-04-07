var svgNS = 'http://www.w3.org/2000/svg';
var locationHref = '';
var initialDefaultFrame = -999999;

var Logger = {
  num: 10,
  index: 0,
  setNum: function (num) {
    this.num = num;
    return this;
  },
  log: function (...rest) {
    if (this.index < this.num) {
      this.index++;
      console.log('++++++++++++++++++++++++++++++++++++++++++++');
      console.log.apply(console, rest);
      console.log('\n');
    }
    return this;
  },
  json: function (data) {
    if (typeof data !== 'object') {
      this.log(data);
    } else {
      this.log(JSON.stringify(data, null, 4));
    }
    return this;
  },
};
