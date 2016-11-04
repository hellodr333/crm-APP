

$(function(){
	var htmlData ={
			cust:{
				"url"		:	"crm/cht/cus",
				"title"		: 	"客户发展走势分析图（按分类  |  单位：家）",
				"titleName"	: 	"客户发展走势图",
				"show"		:	"-总数-",
				"unit" 		:	"客户数",
				"tbTitle"	:	"cust",
				"nav"		:	"客户发展统计"
				},
			visit:{
				"url"		:	"crm/cht/vst",
				"title"		: 	"客户联络走势分析图（按方式  |  单位：次）",
				"titleName"	: 	"客户联络走势图",
				"show"		:	"-总数-",
				"unit" 		:	"行动次数",
				"tbTitle"	:	"visit",
				"nav"		:	"客户联络统计"
				},
				sths:{
					"url"		:	"crm/cht/cnh",
					"title"		: 	"机会历史",
					"titleName"	: 	"机会历史走势图",
					"show"		:	"-总数-",
					"unit" 		:	"机会数",
					"tbTitle"	:	"sths",
					"nav"		:	"机会历史统计"
					},
				ctract:{
					"url"		:	"crm/cht/ctr",
					"title"		: 	"合同统计分析图（按状态  |  单位：万元）",
					"titleName"	: 	"合同统计图标",
					"show"		:	"提交",
					"unit" 		:	"金额（万）",
					"tbTitle"	:	"ctract",
					"nav"		:	"合同统计"
					}
			};
	
	
	
	tb(htmlData.cust,'echart_box1',8);
	tb(htmlData.visit,'echart_box2',7);
	tb(htmlData.sths,'echart_box3',4);
	tb(htmlData.ctract,'echart_box4',3);
	
	function tb(jsonData,boxId,num){
		$.ajax({
			url:"/"+app+"/"+jsonData.url,
			data:{DT_SCOPE:$('#myCust').is(':checked')?2:1},
			type:'POST',
			success:function(str){
				console.log(str)
				if(str.responseCode==0){
					markLine : {
						
					}					

					var data2=[];
					var json={};

					for(var i=0; i<str.responseData.typeLines.length;i++){
						json={
								"name"		:		str.responseData.typeLines[i].itype,
								"type"		:		'line',
								"data"		:		str.responseData.typeLines[i].iline,
								"markPoint"	:		{data:[{type : 'max', name: '最大值'},{type : 'min', name: '最小值'}]},
								"markLine"	:		{data:[{type : 'average', name: '平均值'}]}
								}
						data2.push(json);
						}
					console.log(data2)
					
					 // 基于准备好的dom，初始化echarts图表
					var myChart = echarts.init(document.getElementById(boxId)); 
					var option = {
									title:{
											text:jsonData.titleName,
										},
									tooltip: {
											trigger:'axis'
										},
									calculable : true,
									xAxis : [
											{
												type : 'category',
												data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
												name: "月份"
											}
											],
									yAxis : [
											{
												type : 'value',
												name : jsonData.unit
											}
											],
								  //对应数据。。。。。。。
								  series : [data2[num]]
					};
					// 为echarts对象加载数据 
					myChart.setOption(option);
					
					
					
				}else{
					console.log("获取失败")
				}
			}					
		});
		}
	
	
	
})