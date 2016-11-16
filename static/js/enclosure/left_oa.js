$(function(){
		var nhtml="";
		nhtml+='<div class="accordion"  id="accordion2">\
					<div class="accordion-group hide" limit="SET_1">\
							  <div class="accordion-heading">\
									<a class="accordion-toggle"  data-toggle="collapse"  data-parent="#accordion2" href="#collapseOne"><h4>OA</h4></a>\
							  </div>\
							  <div id="collapseOne" class="accordion-body collapse in">\
									<div class="accordion-inner"  >\
										   <ul>\
													<li class="pd10 hide" limit="SET_1_1"><a href="../../oa/index_oa/index_oa.html">首页</a></li>\
											</ul>\
									</div>\
							  </div>\
					</div>\
					<div class="accordion-group hide" limit="SET_2">\
						  <div class="accordion-heading">\
								<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseTwo"><h4>论坛</h4></a>\
						  </div>\
						  <div id="collapseTwo" class="accordion-body collapse">\
								<div class="accordion-inner">\
									   <ul>\
											<li class="pd10 hide" limit="SET_2_1"><a   href="../../oa/forum/forum_list.html">论坛</a></li>\
									</ul>\
								</div>\
						  </div>\
				</div>\
					<div class="accordion-group hide" limit="SET_3">\
					  <div class="accordion-heading">\
							<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseThree"><h4>日程</h4></a>\
					  </div>\
					  <div id="collapseThree" class="accordion-body collapse">\
							<div class="accordion-inner">\
								   <ul>\
										<li class="pd10 hide" limit="SET_3_1"><a   href="../../oa/calendar/calendar.html">日程</a></li>\
								</ul>\
							</div>\
					  </div>\
			</div>\
			<div class="accordion-group hide" limit="SET_3">\
					  <div class="accordion-heading">\
							<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseFour"><h4>资料中心</h4></a>\
					  </div>\
					  <div id="collapseFour" class="accordion-body collapse">\
							<div class="accordion-inner">\
								   <ul>\
										<li class="pd10 hide" limit="SET_3_1"><a   href="../../oa/enterprise/enterprise.html">资料中心</a></li>\
								</ul>\
							</div>\
					  </div>\
			</div>\
		</div>'



		
		
		
		
		$(".inav").html(nhtml);
		if("SET" in jsonlimit && jsonlimit){
			var json = jsonlimit.SET;
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
			var cal=["calendar"]
			var myURL = document.location.href;
			for(var i=0;i<cal.length;i++){
				 if(myURL.indexOf(cal[i]) != -1){
					$('.accordion-body').each(function(){
						$(this).removeClass('in')
					})
					$('#collapseThree').addClass('in');
				};
			}
			
			cal=["forum"]
			for(var i=0;i<cal.length;i++){
				 if(myURL.indexOf(cal[i]) != -1){
					$('.accordion-body').each(function(){
						$(this).removeClass('in')
					})
					$('#collapseTwo').addClass('in');
				};
			}
			
			cal=["enterprise"]
			for(var i=0;i<cal.length;i++){
				 if(myURL.indexOf(cal[i]) != -1){
					$('.accordion-body').each(function(){
						$(this).removeClass('in')
					})
					$('#collapseFour').addClass('in');
				};
			}
			
		}
	})