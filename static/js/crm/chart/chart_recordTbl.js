
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
			url:'/'+app+'/crm/rpt/rcd/dat',
			data:{
					"reportType":type,
					"DT_SCOPE":$('#myCust').is(':checked')?2:1
			},
			type:'POST',
			success:function(str){
		console.log(type,str);
				if(str.responseCode==0){
					var s='';
					var aNum=0;
					var bNum=0;
					var cNum=0;
					var dNum=0;
					var eNum=0;
					var fNum=0;
					
					$('#'+box).html('');
					for(var i=0;i<str.responseData.length;i++){
						var numArr=str.responseData[i].periodNums
						aNum+=numArr[0];
						bNum+=numArr[1];
						cNum+=numArr[2];
						dNum+=numArr[3];
						eNum+=numArr[4];
						fNum+=numArr[5];
						s+='<tr>\
				                        <td >'+str.responseData[i].custCity+'</td>\
				                         <td  class="text-right">'+numArr[0]+'</td>\
				                         <td  class="text-right">'+numArr[1]+'</td>\
				                         <td  class="text-right">'+(numArr[2]/10000)+'</td>\
				                          <td  class="text-right">'+(numArr[3]/10000)+'</td>\
				                         <td  class="text-right">'+(numArr[4]/10000)+'</td>\
				                         <td  class="text-right">'+(numArr[5]/10000)+'</td>\
				                </tr>  ';


					}
						s+='<tr>\
				                    <td >累计</td>\
				                    <td  class="text-right">'+aNum+'</td>\
				                    <td  class="text-right">'+bNum+'</td>\
				                    <td  class="text-right">'+(cNum/10000)+'</td>\
				                    <td  class="text-right">'+(dNum/10000)+'</td>\
				                    <td  class="text-right">'+(eNum/10000)+'</td>\
				                    <td  class="text-right">'+(fNum/10000)+'</td>\
				           </tr> ';
						$('#'+box).html(s);
				}
				
			}
	});
}
	
	
	

	
	

})