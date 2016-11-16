

$(function(){
	
	tb({
		"titleName"	: 	"我的数量走势",
		"unit" 		:	"数量(个)",
		},'echart_box1',0,2,true);
	
	tb({
		"titleName"	: 	"我的金额走势",
		"unit" 		:	"金额(万)",
		},'echart_box2',2,5,false);
	
	
	
	function tb(jsonData,boxId,num1,num2,bollen){
		$.ajax({
			url:"/"+app+"/"+"crm/cht/hom",
			data:{DT_SCOPE:$('#myCust').is(':checked')?2:1},
			type:'POST',
			success:function(str){
				console.log(str)
				if(str.responseCode==0){
					var data1=[];
					var dataShow={};
					var data2=[];
					var json={};

					for(var i=num1; i<num2;i++){
						data1.push(str.responseData.typeLines[i].itype);
						var ilineArr=[];
						for(var k=0;k<str.responseData.typeLines[i].iline.length; k++){
							ilineArr.push(fmoney(str.responseData.typeLines[i].iline[k]/10000))
							}
						
						json={
								"name"		:		str.responseData.typeLines[i].itype,
								"type"		:		'line',
								"data"		:		bollen?str.responseData.typeLines[i].iline:ilineArr,
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
										legend: {
											data:data1,
											selected:data1
										},
										toolbox: {
											show : true,
											feature : {
												magicType : {show: true, type: ['line', 'bar']},
												restore : {show: true},
												saveAsImage : {show: true}
												}
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
								  series : data2
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