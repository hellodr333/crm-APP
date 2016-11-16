$(function(){
	$('#myTab a:first').tab('show');
	$("#myCust").removeAttr("checked");
	var hf='';
	var name='';
	var theme = {
    // 默认色板
    color: [
        '#2ec7c9','#b6a2de','#5ab1ef','#ffb980','#d87a80',
        '#8d98b3','#e5cf0d','#97b552','#e6b600','#dc69aa',
        '#07a2a4','#9a7fd1','#588dd5','#f5994e','#c05050',
        '#59678c','#c9ab00','#7eb00a','#6f5553','#c14089'
    ],

    // 图表标题
    title: {
        textStyle: {
            fontWeight: 'normal',
            color: '#333'          // 主标题文字颜色
        }
    },
    
    // 值域
    dataRange: {
        itemWidth: 15,
        color: ['#008acd','#008acd']
    },

    // 工具箱
    toolbox: {
        color : ['#1e90ff', '#1e90ff', '#1e90ff', '#1e90ff'],
        effectiveColor : '#ff4500'
    },

    // 提示框
    tooltip: {
        backgroundColor: 'rgba(50,50,50,0.5)',     // 提示背景颜色，默认为透明度为0.7的黑色
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'line',         // 默认为直线，可选为：'line' | 'shadow'
            lineStyle : {          // 直线指示器样式设置
                color: '#008acd'
            },
            crossStyle: {
                color: '#008acd'
            },
            shadowStyle : {                     // 阴影指示器样式设置
                color: 'rgba(200,200,200,0.2)'
            }
        }
    },

    // 区域缩放控制器
    dataZoom: {
        dataBackgroundColor: '#efefff',            // 数据背景颜色
        fillerColor: 'rgba(182,162,222,0.2)',   // 填充颜色
        handleColor: '#008acd'    // 手柄颜色
    },

    // 网格
    grid: {
        borderColor: '#eee'
    },

    // 类目轴
    categoryAxis: {
        axisLine: {            // 坐标轴线
            lineStyle: {       // 属性lineStyle控制线条样式
                color: '#333'
            }
        },
        splitLine: {           // 分隔线
            lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                color: ['#eee']
            }
        }
    },

    // 数值型坐标轴默认参数
    valueAxis: {
        axisLine: {            // 坐标轴线
            lineStyle: {       // 属性lineStyle控制线条样式
                color: '#333'
            }
        },
        splitArea : {
            show : true,
            areaStyle : {
                color: ['rgba(250,250,250,0.1)','rgba(200,200,200,0.1)']
            }
        },
        splitLine: {           // 分隔线
            lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                color: ['#eee']
            }
        }
    },

    polar : {
        axisLine: {            // 坐标轴线
            lineStyle: {       // 属性lineStyle控制线条样式
                color: '#ddd'
            }
        },
        splitArea : {
            show : true,
            areaStyle : {
                color: ['rgba(250,250,250,0.2)','rgba(200,200,200,0.2)']
            }
        },
        splitLine : {
            lineStyle : {
                color : '#ddd'
            }
        }
    },

    timeline : {
        lineStyle : {
            color : '#008acd'
        },
        controlStyle : {
            normal : { color : '#008acd'},
            emphasis : { color : '#008acd'}
        },
        symbol : 'emptyCircle',
        symbolSize : 3
    },

    // 柱形图默认参数
    bar: {
        itemStyle: {
            normal: {
                barBorderRadius: 5
            },
            emphasis: {
                barBorderRadius: 5
            }
        }
    },

    // 折线图默认参数
    line: {
        smooth : true,
        symbol: 'emptyCircle',  // 拐点图形类型
        symbolSize: 3           // 拐点图形大小
    },
    
    // K线图默认参数
    k: {
        itemStyle: {
            normal: {
                color: '#d87a80',       // 阳线填充颜色
                color0: '#2ec7c9',      // 阴线填充颜色
                lineStyle: {
                    color: '#d87a80',   // 阳线边框颜色
                    color0: '#2ec7c9'   // 阴线边框颜色
                }
            }
        }
    },
    
    // 散点图默认参数
    scatter: {
        symbol: 'circle',    // 图形类型
        symbolSize: 4        // 图形大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
    },

    // 雷达图默认参数
    radar : {
        symbol: 'emptyCircle',    // 图形类型
        symbolSize:3
        //symbol: null,         // 拐点图形类型
        //symbolRotate : null,  // 图形旋转控制
    },

    map: {
        itemStyle: {
            normal: {
                areaStyle: {
                    color: '#ddd'
                },
                label: {
                    textStyle: {
                        color: '#d87a80'
                    }
                }
            },
            emphasis: {                 // 也是选中样式
                areaStyle: {
                    color: '#fe994e'
                }
            }
        }
    },
    
    force : {
        itemStyle: {
            normal: {
                linkStyle : {
                    color : '#1e90ff'
                }
            }
        }
    },

    chord : {
        itemStyle : {
            normal : {
                borderWidth: 1,
                borderColor: 'rgba(128, 128, 128, 0.5)',
                chordStyle : {
                    lineStyle : {
                        color : 'rgba(128, 128, 128, 0.5)'
                    }
                }
            },
            emphasis : {
                borderWidth: 1,
                borderColor: 'rgba(128, 128, 128, 0.5)',
                chordStyle : {
                    lineStyle : {
                        color : 'rgba(128, 128, 128, 0.5)'
                    }
                }
            }
        }
    },

    gauge : {
        axisLine: {            // 坐标轴线
            lineStyle: {       // 属性lineStyle控制线条样式
                color: [[0.2, '#2ec7c9'],[0.8, '#5ab1ef'],[1, '#d87a80']], 
                width: 10
            }
        },
        axisTick: {            // 坐标轴小标记
            splitNumber: 10,   // 每份split细分多少段
            length :15,        // 属性length控制线长
            lineStyle: {       // 属性lineStyle控制线条样式
                color: 'auto'
            }
        },
        splitLine: {           // 分隔线
            length :22,         // 属性length控制线长
            lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
            }
        },
        pointer : {
            width : 5
        }
    },
    
    textStyle: {
        fontFamily: '微软雅黑, Arial, Verdana, sans-serif'
    }
};
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
						"title"		: 	"机会历史分析图（按阶段  |  单位：万元）",
						"titleName"	: 	"机会历史走势图",
						"show"		:	"-总数-",
						"unit" 		:	"机会金额（万）",
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
						"unit" 		:	"金额（万）",
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
		$("#echart_box").html("");
		var option ={};
		var jsonData;
		
		$.ajax({
			url:"/"+app+"/"+jsonData.url,
			data:{DT_SCOPE:$('#myCust').is(':checked')?2:1},
			type:'POST',
			success:function(str){
				if(str.responseCode==0){
					$("#data caption").html('<h5>'+ (new Date).getFullYear() +'年'+ jsonData.title +'</h5>')
					var msg = '';
					for(var i=0; i<str.responseData.typeCounts.length;i++){
						var mIcount = str.responseData.typeCounts[i].icount;
						if(jsonData.title.indexOf("万")!=-1){
							mIcount = fmoney(str.responseData.typeCounts[i].icount/10000);
							}
						msg +='<td ><span>'+str.responseData.typeCounts[i].itype+'：</span><span>'+mIcount+'</span></td>'
						}
					var tbTitle='';
					var mCount =str.responseData.totalCount;
					var mAmount =str.responseData.averageAmount;
					if(jsonData.title.indexOf("万")!=-1){
						mCount = fmoney(str.responseData.totalCount/10000);
						mAmount = fmoney(str.responseData.averageAmount/10000);
						}
					if(jsonData.tbTitle=="cust"){
						tbTitle = '<td colspan="'+ str.responseData.typeCounts.length +'"><span>客户总数：</span><span>'+mCount+'</span></td>'
						}else if(jsonData.tbTitle=="visit"){
							
							tbTitle = '<td colspan="'+ str.responseData.typeCounts.length +'"><span>总次数：</span><span>'+mCount+'</span></td>'
							}else if(jsonData.tbTitle=="chnc" || jsonData.tbTitle=="sths"){
								tbTitle = '<td colspan="2"><span>总金额：</span><span>'+mAmount+'</span></td>\
										   <td colspan="'+ (str.responseData.typeCounts.length-2) +'"><span>机会平均金额：</span><span>'+mAmount+'</span></td>'
								}else{
									tbTitle =""
									}
					$("#data tbody").html('\
									 <tr>'+tbTitle+'</tr>\
									 <tr>'+ msg +'</tr>')
						
					//数据。。。			
					var data1=[];
					var dataShow={};
					var data2=[];
					var json={};
	
					for(var i=0; i<str.responseData.typeLines.length;i++){
						data1.push(str.responseData.typeLines[i].itype);
						if(str.responseData.typeLines[i].itype!=jsonData.show){
							dataShow[str.responseData.typeLines[i].itype] = false;
							}
					var ilineArr=[];
					for(var k=0;k<str.responseData.typeLines[i].iline.length; k++){
						ilineArr.push(str.responseData.typeLines[i].iline[k]/10000)
						}
					json={
							"name"		:		str.responseData.typeLines[i].itype,
							"type"		:		'line',
							"data"		:		jsonData.title.indexOf("万")!=-1 ? ilineArr : str.responseData.typeLines[i].iline,
							"markPoint"	:		{data:[{type : 'max', name: '最大值'},{type : 'min', name: '最小值'}]},
							"markLine"	:		{data:[{type : 'average', name: '平均值'}]}
							}
					data2.push(json);
						}
					
					// 基于准备好的dom，初始化echarts图表
					var myChart = echarts.init(document.getElementById('echart_box'),theme);
					
					if(jsonData.tbTitle=="sths"){
						var den = (str.responseData.typeCounts[0].icount+str.responseData.typeCounts[1].icount+str.responseData.typeCounts[2].icount+str.responseData.typeCounts[3].icount)/100;
				var dataArr=[
								{	value:fmoney(den/den*100),
									name:str.responseData.typeCounts[3].itype
								},
								{	value:fmoney((str.responseData.typeCounts[0].icount+str.responseData.typeCounts[1].icount+str.responseData.typeCounts[2].icount)/den),
									name:str.responseData.typeCounts[2].itype
									},
								{	value:fmoney((str.responseData.typeCounts[0].icount+str.responseData.typeCounts[1].icount)/den),
									name:str.responseData.typeCounts[1].itype
								},
								{	value:fmoney(str.responseData.typeCounts[0].icount/den),
									name:str.responseData.typeCounts[0].itype
									},
							]
						var itypeArr = []
						for(var i=0; i<str.responseData.typeCounts.length-1; i++){
							itypeArr.unshift(str.responseData.typeCounts[i].itype)
							}
						option = {
						title: {
							text: '机会历史走势图',
						},
						tooltip: {
							trigger: 'item',
							formatter: "{a} <br/>{b} : {c}%"
						},
						toolbox: {
							show : true,
							feature : {
								//mark : {show: true},
								dataView : {show: true, readOnly: false},
								restore : {show: true},
								saveAsImage : {show: true}
							}
						},
						legend: {
							data: itypeArr,
						},
						calculable : true,
						series : [
							{
								name:'机会历史走势图',
								type:'funnel',
								x: '10%',
								y: 60,
								//x2: 80,
								y2: 60,
								width: '80%',
								// height: {totalHeight} - y - y2,
								min: 0,
								max: 100,
								minSize: '0%',
								maxSize: '100%',
								sort : 'descending', // 'ascending', 'descending'
								gap : 10,
								itemStyle: {
									normal: {
										// color: 各异,
										borderColor: '#fff',
										borderWidth: 1,
										label: {
											show: true,
											position: 'inside'
										},
										labelLine: {
											show: false,
											length: 10,
											lineStyle: {
												// color: 各异,
												width: 1,
												type: 'solid'
											}
										}
									},
									emphasis: {
										// color: 各异,
										borderColor: 'red',
										borderWidth: 5,
										label: {
											show: true,
											formatter: '{b}:{c}%',
											textStyle:{
												fontSize:20
											}
										},
										labelLine: {
											show: true
										}
									}
								},
								data:dataArr,
							}
						]
					};
					// 使用刚指定的配置项和数据显示图表。
					myChart.setOption(option);
						}else{
								option = {
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
								
						}
				}else{
					console.log("获取失败")
				}
			}					
		});
	}

})