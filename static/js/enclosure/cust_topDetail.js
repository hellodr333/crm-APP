
var  igeo=new Geo(document.getElementById("province") ,document.getElementById("city") ,document.getElementById("county") ,'');
$(function(){
	var custID = GetQueryParam("custID");
	
	$.ajax({
		url:'/'+app+'/crm/cus/get',
		data:{
			id:custID
		},
		type:'POST',
		success:function(str){
			console.log(str);
			if(str.responseCode==0){
				$('#custTopDetail').html('<tr>\
			            <td>客户名称:  '+noData(str.responseData.name)+'</td>\
			            <td>省市:  '+noData(igeo.cityname(str.responseData.geoId))+'</td>\
			            <td>地址:  '+noData(str.responseData.address)+'</td>\
			            <td>合同金额(万):  '+noData(str.responseData.sttAmtsContract)+' </td>\
			        </tr>  \
			        <tr>\
			            <td>联系人:  '+noData(str.responseData.ext_mainCtmer)+'</td>\
			            <td>职务:  '+noData(str.responseData.ext_mainCtmerTitle)+'</td>\
			            <td>手机号:  '+noData(str.responseData.ext_mainCtmerMobile)+'</td>\
			            <td>已回款(万):  '+noData(str.responseData.sttAmtsPay)+'</td>\
			        </tr>  \
			        <tr>\
			            <td>最近联络人:  '+noData(str.responseData.ext_lastVster)+'</td>\
			            <td>行动时间:  '+noData(setDate(str.responseData.ext_lastVsterTime))+'</td>\
			            <td>详情:  '+noData(str.responseData.ext_lastVsterInfo)+'</td>\
			            <td>待回款(万):  '+noData((str.responseData.sttAmtsContract-str.responseData.sttAmtsPay))+' </td>\
			        </tr>  ')
			        
			        
			        $('#custName').html(noData(str.responseData.name));
				     var lastT=(new Date().getTime()-str.responseData.ext_lastVsterTime)/(1000*60*60*24);
					if(str.responseData.ext_lastVsterTime==0 ||str.responseData.ext_lastVsterTime==null){
						$('#lastTime').html('距上次行动--天')
					}else if(lastT>1){
						$('#lastTime').html('距上次行动'+parseInt(lastT)+'天')
					}else{
						$('#lastTime').html('距上次行动--天')
					}
					
			}

		}
	})
	
        
        
        
})

