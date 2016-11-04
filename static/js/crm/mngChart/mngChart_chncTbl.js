
var  igeo=new Geo();

$(function(){
	$('#myTab a:eq(1)').tab('show');
	$('#chartTab a:eq(0)').tab('show');
	
	

	
//	========================================================设置日期时间==============================================


	$('#setQot').html(''+nowYear+'年第'+getSeason()+'季( '+getQuarterStartDate()+' ~ '+getQuarterEndDate()+' )')
	$('#setWek').html(''+nowYear+'年第'+thisWek+'周( '+getWeekStartDate()+' ~ '+getWeekEndDate()+' )');
	$('#setMon').html(''+nowYear+'年'+(nowMonth+1)+'月( '+ getMonthStartDate()+' ~ '+getMonthEndDate()+' )');
	$('#setYear').html(''+nowYear+'年( '+nowYear+'-01-01 ~ '+nowYear+'-12-31 )');
	
	
//	我管辖的
	$('#myCust').click(function(){
		getData("WEK","weekData");
		getData("MON","monData");
		getData("QOT","qotData");
		getData("YER","yearData");
	})
	
	
//	=======================================================获取数据================================================
	getData("WEK","weekData");
	getData("MON","monData");
	getData("QOT","qotData");
	getData("YER","yearData");
	
	function getData(type,box){
		$.ajax({
			url:'/'+app+'/crm/rpt/chn/dat',
			data:{
					"reportType":type,
					"DT_SCOPE":4
			},
			type:'POST',
			success:function(str){
				console.log(type,str);
				if(str.responseCode==0){				
					var s='';
					var bNum=0;
					var eNum=0;
					$('#'+box).html('');
					for(var i=0;i<str.responseData.length;i++){
						var numArr=str.responseData[i].periodNums;
						s+=' <tr>\
			                            <td >'+igeo.cityname(str.responseData[i].custCity)+'</td>\
			                            <td  class="text-right">'+(str.responseData[i].beginNums/10000)+'</td>\
			                            <td  class="text-right"  >'+(numArr[0]/10000)+'</td>\
			                             <td  class="text-right"  >'+(numArr[1]/10000)+'</td>\
										<td  class="text-right"  >'+(numArr[2]/10000)+'</td>\
			                            <td  class="text-right" >'+(str.responseData[i].endNums/10000)+'</td>\
			                            <td  class="text-right" >'+Percentage(str.responseData[i].endNums,str.responseData[i].beginNums)+'</td>\
			                   </tr>  ';
						bNum+=str.responseData[i].beginNums;
						eNum+=str.responseData[i].endNums;
					}
						s+='<tr>\
				                    <td >累计</td>\
				                    <td  class="text-right" >'+(bNum/10000)+'</td>\
				                    <td  class="text-right"  colspan="3" class="text-right">'+((eNum-bNum)/10000)+'</td>\
				                    <td  class="text-right" >'+(eNum/10000)+'</td>\
				                    <td  class="text-right" >'+Percentage(eNum,bNum)+'</td>\
				           </tr> ';
						$('#'+box).html(s);
				}
				
			}
	})
	};


})