
var  igeo=new Geo();

$(function(){
	$('#myTab a:eq(1)').tab('show');
	$('#chartTab a:eq(0)').tab('show');
	
	
//	我管辖的
	$('#myCust').click(function(){
		getDay();
		getWek();
		getMon();
		getYear();
	})
	
//	========================================================设置日期时间==============================================


	$('#setDate').html(''+nowYear+'年'+(nowMonth+1)+'月'+nowDay+'日( '+nowYear+'-'+(nowMonth+1)+'-'+nowDay+' ~ '+nowYear+'-'+(nowMonth+1)+'-'+nowDay+' )')
	$('#setWek').html(''+nowYear+'年第'+thisWek+'周( '+getWeekStartDate()+' ~ '+getWeekEndDate()+' )');
	$('#setMon').html(''+nowYear+'年'+(nowMonth+1)+'月( '+ getMonthStartDate()+' ~ '+getMonthEndDate()+' )');
	$('#setYear').html(''+nowYear+'年( '+nowYear+'-01-01 ~ '+nowYear+'-12-31 )');
	
	
	
//	=======================================================获取本日数据================================================
	getDay()
	function getDay(){
		$.ajax({
			url:'/'+app+'/crm/rpt/cus/dat',
			data:{
					"reportType":"DAY",
					"DT_SCOPE":$('#myCust').is(':checked')?2:1
			},
			type:'POST',
			success:function(str){
		console.log('日报',str);
				if(str.responseCode==0){
					var s='';
					var bNum=0;
					var eNum=0;
					var totalNum=0;
					$('#dayData').html('');
					for(var i=0;i<str.responseData.length;i++){
						totalNum+=str.responseData[i].periodNums[0];
						s+='<tr>\
					                        <td >'+igeo.cityname(str.responseData[i].custCity)+'</td>\
					                        <td class="text-right">'+str.responseData[i].beginNums+'</td>\
					                        <td class="text-right">'+str.responseData[i].periodNums[0]+'</td>\
					                        <td class="text-right">'+str.responseData[i].endNums+'</td>\
					                        <td class="text-right">'+Percentage(str.responseData[i].endNums,str.responseData[i].beginNums)+'</td>\
					               </tr> ';
						bNum+=str.responseData[i].beginNums;
						eNum+=str.responseData[i].endNums;
					}
						s+='<tr>\
				                    <td >累计</td>\
				                    <td class="text-right">'+bNum+'</td>\
				                    <td class="text-right">'+totalNum+'</td>\
				                    <td class="text-right">'+eNum+'</td>\
				                    <td class="text-right">'+Percentage(eNum,bNum)+'</td>\
				           </tr> ';
					$('#dayData').html(s);
				}
				
			}
	});
	}
	
	
	
//	=======================================================获取本周数据================================================
	getWek();
	function getWek(){
		$.ajax({
			url:'/'+app+'/crm/rpt/cus/dat',
			data:{
					"reportType":"WEK",
					"DT_SCOPE":$('#myCust').is(':checked')?2:1
			},
			type:'POST',
			success:function(str){
				console.log('周报',str);
				if(str.responseCode==0){				
					var s='';
					var bNum=0;
					var eNum=0;
					$('#weekData').html('');
					for(var i=0;i<str.responseData.length;i++){
						var numArr=str.responseData[i].periodNums;
						s+='<tr>\
					                        <td >'+igeo.cityname(str.responseData[i].custCity)+'</td>\
					                        <td class="text-right">'+str.responseData[i].beginNums+'</td>\
					                        <td class="text-right" >'+numArr[0]+'</td>\
					                        <td class="text-right" >'+numArr[1]+'</td>\
					                        <td class="text-right" >'+numArr[2]+'</td>\
					                        <td class="text-right" >'+numArr[3]+'</td>\
					                        <td class="text-right" >'+numArr[4]+'</td>\
					                        <td class="text-right" >'+numArr[5]+'</td>\
					                        <td class="text-right" >'+numArr[6]+'</td>\
					                        <td class="text-right" >'+str.responseData[i].endNums+'</td>\
					                        <td class="text-right" >'+Percentage(str.responseData[i].endNums,str.responseData[i].beginNums)+'</td>\
					               </tr> ';
						bNum+=str.responseData[i].beginNums;
						eNum+=str.responseData[i].endNums;
					}
						s+='<tr>\
				                    <td  >累计</td>\
				                    <td class="text-right" >'+bNum+'</td>\
				                    <td class="text-right"  colspan="7" class="text-right">'+(eNum-bNum)+'</td>\
				                    <td class="text-right" >'+eNum+'</td>\
				                    <td class="text-right" >'+Percentage(eNum,bNum)+'</td>\
				           </tr> ';
					$('#weekData').html(s);
				}
				
			}
	})
	};
	

	
//	=======================================================获取本月数据================================================
	getMon();
	function getMon(){
		$.ajax({
			url:'/'+app+'/crm/rpt/cus/dat',
			data:{
					"reportType":"MON",
					"DT_SCOPE":$('#myCust').is(':checked')?2:1
			},
			type:'POST',
			success:function(str){
				console.log('月报',str);
				if(str.responseCode==0){
					var s='';
					var sH='<th >城市</th>\
                        		<th >期初数</th>';
					var bNum=0;
					var eNum=0;
					$('#monData, #monDataH').html('');
					var numArr=getMonthDays(nowMonth);
					for(var j=0;j<numArr;j++){
						sH+='<th >'+(j+1)+'</th>'
					}
					sH+='<th >期末数</th>\
                        	<th >增长率(%)</th>';
					
					for(var i=0;i<str.responseData.length;i++){
						var numArr2=str.responseData[i].periodNums
						var sDay='';
								s+='<tr>\
					                        <td >'+igeo.cityname(str.responseData[i].custCity)+'</td>\
					                        <td class="text-right">'+str.responseData[i].beginNums+'</td>'
			                        
					             for(var k=0;k<numArr;k++){
					            	 sDay+= '  <td class="text-right">'+numArr2[k]+'</td>'            
					             }           
					                   
		                        s+=sDay+ '<td class="text-right">'+str.responseData[i].endNums+'</td>\
						                <td class="text-right" >'+Percentage(str.responseData[i].endNums,str.responseData[i].beginNums)+'</td>\
						               </tr> ';
						
						bNum+=str.responseData[i].beginNums;
						eNum+=str.responseData[i].endNums;
					}
						s+='<tr>\
				                    <td >累计</td>\
				                    <td class="text-right">'+bNum+'</td>\
				                    <td  colspan="'+numArr+'" class="text-right">'+(eNum-bNum)+'</td>\
				                    <td class="text-right">'+eNum+'</td>\
				                    <td class="text-right">'+Percentage(eNum,bNum)+'</td>\
				           </tr> ';
						
					$('#monDataH').html(sH);
					$('#monData').html(s);
				
				}
				
			}
	})
	};
	
	
//	=======================================================获取本年数据================================================
	getYear();
	function getYear(){
		$.ajax({
			url:'/'+app+'/crm/rpt/cus/dat',
			data:{
					"reportType":"YER",
					"DT_SCOPE":$('#myCust').is(':checked')?2:1
			},
			type:'POST',
			success:function(str){
				console.log('年报',str);
				if(str.responseCode==0){
					var s='';
					var bNum=0;
					var eNum=0;
					$('#yearData').html('');
					for(var i=0;i<str.responseData.length;i++){
						var numArr=str.responseData[i].periodNums;
						s+='<tr>\
					                        <td >'+igeo.cityname(str.responseData[i].custCity)+'</td>\
					                        <td class="text-right">'+str.responseData[i].beginNums+'</td>\
					                        <td class="text-right" >'+numArr[0]+'</td>\
					                        <td class="text-right" >'+numArr[1]+'</td>\
					                        <td class="text-right" >'+numArr[2]+'</td>\
					                        <td class="text-right" >'+numArr[3]+'</td>\
					                        <td class="text-right" >'+numArr[4]+'</td>\
					                        <td class="text-right" >'+numArr[5]+'</td>\
					                        <td class="text-right" >'+numArr[6]+'</td>\
					                        <td class="text-right" >'+numArr[7]+'</td>\
					                        <td class="text-right" >'+numArr[8]+'</td>\
					                        <td class="text-right" >'+numArr[9]+'</td>\
					                        <td class="text-right" >'+numArr[10]+'</td>\
					                        <td class="text-right" >'+numArr[11]+'</td>\
					                        <td class="text-right" >'+str.responseData[i].endNums+'</td>\
					                        <td class="text-right" >'+Percentage(str.responseData[i].endNums,str.responseData[i].beginNums)+'</td>\
					               </tr> ';
						bNum+=str.responseData[i].beginNums;
						eNum+=str.responseData[i].endNums;
					}
						s+='<tr>\
				                    <td >累计</td>\
				                    <td class="text-right" >'+bNum+'</td>\
				                    <td  colspan="12" class="text-right">'+(eNum-bNum)+'</td>\
				                    <td class="text-right" >'+eNum+'</td>\
				                    <td class="text-right" >'+Percentage(eNum,bNum)+'</td>\
				           </tr> ';
					$('#yearData').html(s);
				
				}
				
			}
	})
	};
	
	
	



})