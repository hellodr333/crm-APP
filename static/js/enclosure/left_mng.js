$(function(){
		var nhtml="";
		nhtml+='<div class="accordion"  id="accordion2">\
					<div class="accordion-group hide" limit="SET_1">\
							  <div class="accordion-heading">\
									<a class="accordion-toggle"  data-toggle="collapse"  data-parent="#accordion2" href="#collapseOne"><h4>系统设置</h4></a>\
							  </div>\
							  <div id="collapseOne" class="accordion-body collapse in">\
									<div class="accordion-inner"  >\
										   <ul>\
													<li class="pd10 hide" limit="SET_1_1"><a href="../../mng/index_set/index_set.html">首页</a></li>\
											</ul>\
									</div>\
							  </div>\
					</div>\
					<div class="accordion-group hide" limit="SET_2">\
						  <div class="accordion-heading">\
								<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseTwo"><h4>企业设置</h4></a>\
						  </div>\
						  <div id="collapseTwo" class="accordion-body collapse">\
								<div class="accordion-inner">\
									   <ul>\
											<li class="pd10 hide" limit="SET_2_1"><a   href="../../mng/ent/ent_info.html">企业信息</a></li>\
											<li  class="pd10 hide" limit="SET_2_2"><a  href="../../mng/ent/dep_emp.html">机构人员</a></li>\
									</ul>\
								</div>\
						  </div>\
				</div>\
				<div class="accordion-group hide" limit="SET_3">\
						  <div class="accordion-heading">\
								<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseThree"><h4>基础设置</h4></a>\
						  </div>\
						  <div id="collapseThree" class="accordion-body collapse">\
								<div class="accordion-inner">\
									   <ul>\
											<li class="pd10 hide" limit="SET_3_1"><a  href="../../mng/intpr/intpr_product.html">产品设置</a></li>\
									</ul>\
								</div>\
						  </div>\
				</div>\
			</div>'



		
		
		
		
		$(".inav").html(nhtml);
		if("SET" in jsonlimit && jsonlimit){
			var json = jsonlimit.SET;
			console.log(json)
			for(var key in json){
				$('#accordion2 .accordion-group[limit="'+ key +'"]').removeClass("hide");
				var jsonChd = json[key];
				for(var keyC in jsonChd){
					$('li.pd10[limit="'+ jsonChd[keyC] +'"]').removeClass("hide");
					}
				}
		}
		
		setHerf();
		function setHerf(){
			var arrCust=["ent_info","dep_emp"]
			var myURL = document.location.href;
			for(var i=0;i<arrCust.length;i++){
				 if(myURL.indexOf(arrCust[i]) != -1){
					$('.accordion-body').each(function(){
						$(this).removeClass('in')
					})
					$('#collapseTwo').addClass('in');
				};
			}
			var arrCust=["intpr_product"]
			var myURL = document.location.href;
			for(var i=0;i<arrCust.length;i++){
				 if(myURL.indexOf(arrCust[i]) != -1){
					$('.accordion-body').each(function(){
						$(this).removeClass('in')
					})
					$('#collapseThree').addClass('in');
				};
			}
		}
	})