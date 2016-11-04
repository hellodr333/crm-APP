$(function(){
	$('#myTab a:first').tab('show');
	$("#myCust").removeAttr("checked");
	var hf='';
	var name='';
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
						"titleName"	: 	"客户发展走势图",
						"show"		:	"-总数-",
						"unit" 		:	"行动次数",
						"tbTitle"	:	"visit",
						"nav"		:	"客户联络统计"
						},
					chnc:{
						"url"		:	"crm/cht/cnf",
						"title"		: 	"销售预测金额走势分析图（按来源  |  单位：万元）",
						"titleName"	: 	"销售机会走势图",
						"show"		:	"-总数-",
						"unit" 		:	"机会金额",
						"tbTitle"	:	"chnc",
						"nav"		:	"客户销售预测"
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
						},
					record:{
						"url"		:	"crm/cht/prf",
						"title"		: 	"业绩统计分析图（按来源  |  单位：万元）",
						"titleName"	: 	"业绩统计分析图",
						"show"		:	"合同签约",
						"unit" 		:	"金额（完）",
						"tbTitle"	:	"record",
						"nav"		:	"业绩统计"
						},
					granted:{
						"url"		:	"crm/cht/arp",
						"title"		: 	"款项走势分析图（按计划时间  |  单位：万元）",
						"titleName"	: 	"款项走势分析图",
						"show"		:	"实收款",
						"unit" 		:	"金额（万）",
						"tbTitle"	:	"granted",
						"nav"		:	"款项统计"
						}};
	
	tb(htmlData[window.location.hash.substring(7)]);
	$("#nav1").html(htmlData[window.location.hash.substring(7)].nav+"图表").attr("href",window.location.href);
	$("#nav2").html(htmlData[window.location.hash.substring(7)].nav+"报表").attr("href",'chart_'+ window.location.href.substring( window.location.href.indexOf("#chart_")+7,window.location.href.length) +'Tbl.html');
		
		
	
	$("#collapseSix ul li").click(function(){
		hf = $(this).find("a").attr("href");
		name = hf.substring( hf.indexOf("#chart_")+7,hf.length);
		tb(htmlData[name]);
		$("#nav1").html(htmlData[name].nav+"图表").attr("href",hf);
	 	$("#nav2").html(htmlData[name].nav+"报表").attr("href",'chart_'+ hf.substring( hf.indexOf("#chart_")+7,hf.length) +'Tbl.html');
		})
	
	
	//	我管辖的
	$('#myCust').click(function(){
		tb(htmlData[window.location.hash.substring(7)]);	
	})
	
	
	
	function tb(jsonData){
		$("#data tbody").html("");
		$("#echart_box").html("")
		var jsonData;
		
		$.ajax({
			url:"/"+app+"/"+jsonData.url,
			data:{DT_SCOPE:$('#myCust').is(':checked')?2:1},
			type:'POST',
			success:function(str){
				console.log(str)
				if(str.responseCode==0){
					
					var option ={};
					$("#data caption").html('<h5>'+ (new Date).getFullYear() +'年'+ jsonData.title +'</h5>')
					var msg = '';
					for(var i=0; i<str.responseData.typeCounts.length;i++){
						msg +='<td ><span>'+str.responseData.typeCounts[i].itype+'：</span><span>'+str.responseData.typeCounts[i].icount+'</span></td>'
						}
					var tbTitle='';
					if(jsonData.tbTitle=="cust"){
						tbTitle = '<td colspan="'+ str.responseData.typeCounts.length +'"><span>客户总数：</span><span>'+str.responseData.totalCount+'</span></td>'
						}else if(jsonData.tbTitle=="visit"){
							tbTitle = '<td colspan="'+ str.responseData.typeCounts.length +'"><span>总次数：</span><span>'+str.responseData.totalCount+'</span></td>'
							}else if(jsonData.tbTitle=="chnc" || jsonData.tbTitle=="sths"){
								tbTitle = '<td colspan="2"><span>总金额：</span><span>'+str.responseData.totalAmount+'</span></td>\
										   <td colspan="'+ (str.responseData.typeCounts.length-2) +'"><span>机会平均金额：</span><span>'+str.responseData.averageAmount+'</span></td>'
								}else{
									tbTitle =""
									}
					$("#data tbody").html('\
									 <tr>'+tbTitle+'</tr>\
		                             <tr>'+ msg +'</tr>')
					
					//数据。。。
				
					markLine : {
						
					}					
					var data1=[];
					var dataShow={};
					var data2=[];
					var json={};

					for(var i=0; i<str.responseData.typeLines.length;i++){
						data1.push(str.responseData.typeLines[i].itype);
						if(str.responseData.typeLines[i].itype!=jsonData.show){
							dataShow[str.responseData.typeLines[i].itype] = false;
							}
						
						json={
								"name"		:		str.responseData.typeLines[i].itype,
								"type"		:		'line',
								"data"		:		str.responseData.typeLines[i].iline,
								"markPoint"	:		{data:[{type : 'max', name: '最大值'},{type : 'min', name: '最小值'}]},
								"markLine"	:		{data:[{type : 'average', name: '平均值'}]}
								}
						data2.push(json);
						}
					console.log(dataShow)
					
					 // 基于准备好的dom，初始化echarts图表
					var myChart = echarts.init(document.getElementById('echart_box')); 
					
			
					var option = {
									title:{
											text:jsonData.titleName,
										},
									tooltip: {
											trigger:'axis'
										},
									legend: {
											data:data1,
											selected:dataShow
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