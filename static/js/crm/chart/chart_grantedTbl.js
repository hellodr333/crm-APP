
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
	
		//	=======================================================获取数据============================================
	getData("WEK","weekData");
	getData("MON","monData");
	getData("QOT","qotData");
	getData("YER","yearData");
	
	function getData(type,box){
		$.ajax({
			url:'/'+app+'/crm/rpt/gdt/dat',
			data:{
					"reportType":type,
					"DT_SCOPE":$('#myCust').is(':checked')?2:1
			},
			type:'POST',
			success:function(str){
		console.log(type,str);
				if(str.responseCode==0){
					var s='';
					var bNum=0;
					var eNum=0;
					var bbNum=0;
					var ccNum=0;
					var ddNum=0;

					
					
					$('#'+box).html('');
					for(var i=0;i<str.responseData.length;i++){
						var numArr=str.responseData[i].periodNums;
						
						 bbNum+=numArr[0];
						 ccNum+=numArr[1];
						 ddNum+=numArr[2];
						bNum+=str.responseData[i].beginNums;
						eNum+=str.responseData[i].endNums;
							
						s+='<tr>\
					                        <td >'+igeo.cityname(str.responseData[i].custCity)+'</td>\
			                                 <td   class="text-right">'+fmoney(str.responseData[i].beginNums/10000)+'</td>\
			                                  <td   class="text-right">'+fmoney(numArr[0]/10000)+'</td>\
		                                   <td   class="text-right">'+fmoney(numArr[1]/10000)+'</td>\
		                                    <td   class="text-right">'+fmoney(numArr[2]/10000)+'</td>\
		                                     <td   class="text-right">'+fmoney(str.responseData[i].endNums/10000)+'</td>\
			                                 <td   class="text-right">'+hurndrePer(numArr[2],numArr[1])+'</td>\
					               </tr> ';
					
					}
						s+='<tr>\
				                    <td >累计</td>\
				                    <td  class="text-right">'+fmoney(bNum/10000)+'</td>\
				                    <td  class="text-right">'+fmoney(bbNum/10000)+'</td>\
				                    <td  class="text-right">'+fmoney(ccNum/10000)+'</td>\
				                    <td  class="text-right">'+fmoney(ddNum/10000)+'</td>\
				                    <td  class="text-right">'+fmoney(eNum/10000)+'</td>\
				                    <td  class="text-right" >'+hurndrePer(ccNum,bbNum)+'</td>\
				           </tr> ';
					$('#'+box).html(s);
				}
				
			}
	});
	}
	
	
	

	
	

})