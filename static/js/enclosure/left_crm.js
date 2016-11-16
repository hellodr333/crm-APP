$(function(){

    var nhtml="";
    		   nhtml+='<div class="accordion"  id="accordion2">\
								    <div class="accordion-group hide" limit="CRM_1">\
										      <div class="accordion-heading">\
											        <a class="accordion-toggle"  data-toggle="collapse"  data-parent="#accordion2" href="#collapseOne"><h4>CRM</h4></a>\
										      </div>\
										      <div id="collapseOne" class="accordion-body collapse in">\
											        <div class="accordion-inner"  >\
										    			   <ul>\
																	<li class="pd10 hide" limit="CRM_1_1"><a href="../index_crm/index_crm.html">首页</a></li>\
															</ul>\
											        </div>\
										      </div>\
								    </div>\
								    <div class="accordion-group hide" limit="CRM_2">\
									      <div class="accordion-heading">\
										        <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseTwo"><h4>客户资料</h4></a>\
									      </div>\
									      <div id="collapseTwo" class="accordion-body collapse">\
										        <div class="accordion-inner">\
									    			   <ul>\
															<li class="pd10 hide" limit="CRM_2_1"><a   href="../../crm/cust/cust_list.html">我的客户</a></li>\
															<li  class="pd10 hide" limit="CRM_2_2"><a  href="../../crm/cust/ctm_list.html">我的联系人</a></li>\
													</ul>\
										        </div>\
									      </div>\
							    </div>\
								  <div class="accordion-group hide" limit="CRM_4">\
									      <div class="accordion-heading">\
										        <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseFive"><h4>行动管理</h4> </a>\
									      </div>\
									      <div id="collapseFive"  class="accordion-body collapse">\
										        <div class="accordion-inner">\
								    			   <ul>\
															<li class="pd10 hide" limit="CRM_4_1"><a href="../../crm/visits/vst_list.html">我的行动</a></li>\
													</ul>\
										        </div>\
									      </div>\
							  </div>\
							  <div class="accordion-group hide" limit="CRM_3">\
						      <div class="accordion-heading">\
							        <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseFour"><h4>销售机会</h4> </a>\
						      </div>\
						      <div id="collapseFour" class="accordion-body collapse">\
							        <div class="accordion-inner">\
						    			   <ul>\
													<li class="pd10 hide" limit="CRM_3_1"><a href="../../crm/chance/chanc_list.html">我的机会</a></li>\
											</ul>\
							        </div>\
						      </div>\
				              </div>\
							  <div class="accordion-group hide" limit="CRM_5">\
									      <div class="accordion-heading">\
										        <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseThree"><h4>合同管理</h4></a>\
									      </div>\
									      <div id="collapseThree" class="accordion-body collapse">\
										        <div class="accordion-inner">\
										    			   <ul>\
																	<li class="pd10 hide" limit="CRM_5_1"><a href="../../crm/contract/contract_list.html">我的合同</a></li>\
																	<li class="pd10 hide" limit="CRM_5_2"><a href="../../crm/contract/payment_list.html">回款概览</a></li>\
												    			   <li class="pd10 hide" limit="CRM_5_3"><a href="../../crm/contract/invoice_list.html" >开票记录</a></li>\
																	<li class="pd10 hide" limit="CRM_5_4"><a href="../../crm/contract/repay_list.html">回款记录</a></li>\
												    			   <li class="pd10 hide" limit="CRM_5_5"><a href="../../crm/contract/expend_list.html">费用支出</a></li>\
															</ul>\
										        </div>\
									      </div>\
							    </div>\
				    			   <div class="accordion-group hide" limit="CRM_6">\
								      <div class="accordion-heading">\
									        <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseSix"><h4>统计报表</h4> </a>\
								      </div>\
								      <div id="collapseSix" class="accordion-body collapse">\
									        <div class="accordion-inner">\
								    			   <ul>\
															<li class="pd10 hide" limit="CRM_6_1"><a href="../../crm/chart/chart.html#chart_cust">客户发展</a></li>\
															<li class="pd10 hide" limit="CRM_6_2"><a href="../../crm/chart/chart.html#chart_visit">客户联络</a></li>\
															<li class="pd10 hide" limit="CRM_6_3"><a href="../../crm/chart/chart.html#chart_chnc">销售预测</a></li>\
															<li class="pd10 hide" limit="CRM_6_4"><a href="../../crm/chart/chart.html#chart_sths">机会历史</a></li>\
															<li class="pd10 hide" limit="CRM_6_5"><a href="../../crm/chart/chart.html#chart_ctract">合同统计</a></li>\
															<li class="pd10 hide" limit="CRM_6_6"><a href="../../crm/chart/chart.html#chart_record">业绩统计</a></li>\
															<li class="pd10 hide" limit="CRM_6_7"><a href="../../crm/chart/chart.html#chart_granted">款项统计</a></li>\
													</ul>\
									        </div>\
								      </div>\
						    </div>\
						    			   <div class="accordion-group hide" limit="CRM_7">\
										      <div class="accordion-heading">\
											        <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseSeven"><h4>管理报表</h4> </a>\
										      </div>\
										      <div id="collapseSeven" class="accordion-body collapse">\
											        <div class="accordion-inner">\
										    			   <ul>\
																	<li class="pd10 hide" limit="CRM_7_1"><a href="../../crm/mngChart/mngChart.html#chart_mngcust">客户发展</a></li>\
																	<li class="pd10 hide" limit="CRM_7_2"><a href="../../crm/mngChart/mngChart.html#chart_mngvisit">客户联络</a></li>\
																	<li class="pd10 hide" limit="CRM_7_3"><a href="../../crm/mngChart/mngChart.html#chart_mngchnc">销售预测</a></li>\
																	<li class="pd10 hide" limit="CRM_7_3"><a href="../../crm/mngChart/mngChart.html#chart_mngsths">机会历史</a></li>\
																	<li class="pd10 hide" limit="CRM_7_4"><a href="../../crm/mngChart/mngChart.html#chart_mngctract">合同统计</a></li>\
																	<li class="pd10 hide" limit="CRM_7_5"><a href="../../crm/mngChart/mngChart.html#chart_mngrecord">业绩统计</a></li>\
																	<li class="pd10 hide" limit="CRM_7_6"><a href="../../crm/mngChart/mngChart.html#chart_mnggranted">款项统计</a></li>\
															</ul>\
											        </div>\
										      </div>\
								    </div>\
    			   </div>';
    	
						  
			
	$(".inav").html(nhtml);
	
	setHerf();
	function setHerf(){
	    var arrCust=["cust/cust_list","cust/ctm_list","cust/cust_detail","cust/ctm_detail"]
	    var myURL = document.location.href;
	    for(var i=0;i<arrCust.length;i++){
	    	 if(myURL.indexOf(arrCust[i]) != -1){
	 	    	$('.accordion-body').each(function(){
	 	    		$(this).removeClass('in')
	 	    	})
	 	    	$('#collapseTwo').addClass('in');
	 	    };
	    }
	    
	    
	    var arrChan=["chance/chanc_list","chance/cust_chance"]
	    for(var i=0;i<arrChan.length;i++){
	    	 if(myURL.indexOf(arrChan[i]) != -1){
	 	    	$('.accordion-body').each(function(){
	 	    		$(this).removeClass('in')
	 	    	})
	 	    	$('#collapseFour').addClass('in');
	 	    }
	    }
	    var arrCntr=["contract/contract_list","contract/payment_list","contract/invoice_list","contract/repay_list","contract/expend_list","contract/cust_contract","contract/contract_invoice","contract/contract_repay","contract/contract_expend"]
	    for(var i=0;i<arrCntr.length;i++){
	    	 if(myURL.indexOf(arrCntr[i]) != -1){
	 	    	$('.accordion-body').each(function(){
	 	    		$(this).removeClass('in')
	 	    	})
	 	    	$('#collapseThree').addClass('in');
	 	    };
	    }
	 	   if(myURL.indexOf("visits/vst_list") != -1){
	 	    	$('.accordion-body').each(function(){
	 	    		$(this).removeClass('in')
	 	    	})
	 	    	$('#collapseFive').addClass('in');
	 	    };
		   if(myURL.indexOf("cust_vst") != -1){
	 	    	$('.accordion-body').each(function(){
	 	    		$(this).removeClass('in')
	 	    	})
	 	    	$('#collapseFive').addClass('in');
	 	    }
		   
		   
		   var arrCnt=["chart_cust","chart_ctract","chart_record","chart_granted","chart_sths","chart_visit","chart_chnc"]
		   for(var i=0;i<arrCnt.length;i++){
			   if(myURL.indexOf(arrCnt[i]) != -1){
					$('.accordion-body').each(function(){
						$(this).removeClass('in')
					})
					$('#collapseSix').addClass('in');
				};
		   }
	    
		   var arrCnt=['mngChart']
		   for(var i=0;i<arrCnt.length;i++){
			   if(myURL.indexOf(arrCnt[i]) != -1){
					$('.accordion-body').each(function(){
						$(this).removeClass('in')
					})
					$('#collapseSeven').addClass('in');
				};
		   }
	    
	    
	    
	}
	if("CRM" in jsonlimit && jsonlimit){
		var json = jsonlimit.CRM;
		for(var key in json){
			$('#accordion2 .accordion-group[limit="'+ key +'"]').removeClass("hide");
			var jsonChd = json[key];
			for(var keyC in jsonChd){
				$('li.pd10[limit="'+ jsonChd[keyC] +'"]').removeClass("hide");
				}
			}
	}
	
	
	
	
});