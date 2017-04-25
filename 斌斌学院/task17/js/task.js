/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
  
}

/**
 * 渲染图表
 */
function renderChart() {
	// console.log(aqiSourceData)	
	var aqiChartWrap = document.getElementsByClassName('aqi-chart-wrap')[0];
	var innerHTML = '';
	for(var item in chartData){
		console.log(item);
		innerHTML += "<div title='"+item+"' style='height: "+chartData[item]+"px;background-color: #333333;width: 4px;'></div>";
	}
	 //str+="<div class='histogram' style='height:"+chartData[v]+"px;background-color:"+getRandomColor()+"' title='"+v+":"+chartData[v]+"'></div>";
	aqiChartWrap.innerHTML = innerHTML;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
	if(this.value == pageState.nowGraTime){
		return;
	}
  // 设置对应数据
  pageState.nowGraTime = this.value;
  initAqiChartData();

  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
	if(this.value == pageState.nowSelectCity){ 
		return
	}
	// 设置对应数据			
	pageState.nowSelectCity = this.value;
  initAqiChartData();
	// 调用图表渲染函数
	renderChart();

}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
//	var form = document.getElementById('form-gra-time');
	var radio = document.getElementsByName('gra-time')
	for (var i = 0; i < radio.length; i++) {
		radio[i].addEventListener('click', graTimeChange)
	}
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
	var citySelector = document.getElementById('city-select');
	var items = '';
  for(var attr in aqiSourceData){
	  	items += '<option>' + attr + '</option>';
  }
	citySelector.innerHTML = items;
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
	citySelector.addEventListener('change', citySelectChange);

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  var nowCiteData = aqiSourceData[pageState.nowSelectCity];
//var jsonText = JSON.stringify(aqiSourceData, [""]);
	var time = pageState.nowGraTime;
	
	switch(time){
		case "day":
			chartData = nowCiteData;
			break;
		
		case "week":
			chartData = {};
			var week=0,countSum=0,daySum=0;
			for(var attr in nowCiteData){
				countSum += nowCiteData[attr];
				daySum ++;
				if(new Date(attr).getDay() == 6){
					week ++;
					chartData["第 "+ week +"周"] = Math.round(countSum/daySum);					
					daySum = 0;
					countSum = 0;
				} 
			}
			chartData["第 "+ week +"周"] = Math.round(countSum/daySum);					
			break;
		case "month":
			chartData = {};
			var month=1,countSum=0,daySum=0;
			for(var attr in nowCiteData){
				countSum +=nowCiteData[attr];
				daySum ++;
				
				if(new Date(attr).getMonth() != month -1){
					month ++;
					chartData["第 "+ month +"月"] = Math.round(countSum/daySum);					
					daySum = 0;
					countSum = 0;
				 }
				chartData["第 " + month + "月"] = Math.round(countSum / daySum);
			}
			break;
	}
var jsonText = JSON.stringify(chartData, null, 4);
//console.log(jsonText)
  
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();