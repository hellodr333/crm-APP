
var  igeo=new Geo();

$(function(){
	$('#myTab a:eq(1)').tab('show');

	
//	我管辖的
	$('#myCust').click(function(){
		getData();
	})
	
	
//	========================================================设置日期时间==============================================


		$('#setChance').html('销售机会( ~ '+nowYear+'年'+(nowMonth+1)+'月'+nowDay+'日 '+' )历史分析 (单位:万)')
	
		//	=======================================================获取数据============================================
	getData();
	function getData(){
		$.ajax({
			url:'/'+app+'/crm/rpt/sths/dat',
			data:{
				"DT_SCOPE":$('#myCust').is(':checked')?2:1
			},
			type:'POST',
			success:function(str){
	    	console.log(str);
				if(str.responseCode==0){
					var s='';
					var aNum=0;
					var bNum=0;
					var cNum=0;
					var dNum=0;
					var eNum=0;
					
					$('#dayData').html('');
					for(var i=0;i<str.responseData.length;i++){
						var numArr=str.responseData[i].periodNums
						aNum+=numArr[0];
						bNum+=numArr[1];
						cNum+=numArr[2];
						dNum+=numArr[3];
						eNum+=numArr[4];
						s+='<tr>\
				                        <td >'+igeo.cityname(str.responseData[i].custCity)+'</td>\
				                         <td class="text-right">'+(numArr[0]/10000)+'</td>\
				                         <td class="text-right">'+(numArr[1]/10000)+'</td>\
				                         <td class="text-right">'+(numArr[2]/10000)+'</td>\
				                          <td class="text-right">'+(numArr[3]/10000)+'</td>\
				                         <td class="text-right">'+(numArr[4]/10000)+'</td>\
				                         <td class="text-right">'+hurndrePer(numArr[3],numArr[0])+'</td>\
				                </tr>  ';


					}
						s+='<tr>\
				                    <td >累计</td>\
				                    <td class="text-right">'+(aNum/10000)+'</td>\
				                    <td class="text-right">'+(bNum/10000)+'</td>\
				                    <td class="text-right">'+(cNum/10000)+'</td>\
				                    <td class="text-right">'+(dNum/10000)+'</td>\
				                    <td class="text-right">'+(eNum/10000)+'</td>\
				                    <td class="text-right">'+hurndrePer(dNum,aNum)+'</td>\
				           </tr> ';
					$('#dayData').html(s);
				}
				
			}
	});
	}
	
	
	

	
	

})