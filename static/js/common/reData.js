// re for all
var reDataJson={
			"":/^\S{0,}$/,
			psword:/^\d{6}$/,
			setNewPs:/^\d{6}$/,
			newPassword:/^\d{6}$/	,
			YZM:/^\d{6}$/,
			orgName:/^[\s\S]{1,60}$/,
			name60: /^[\s\S]{1,60}$/, //姓名
	    	
	    	U_1ID	    :/^$|^([\s\S]{0,20})$/, 	    //标准ID
	    	U_1ID_EX	:/^$|^([\s\S]{0,40})$/,	    //外部ID
	    	U_1ID_IN	:/^$|^(\d{0,18})$/,	    //自增长ID
	    	U_1ID_UU	:/^$|^([\s\S]{0,32})$/,	    //uuid xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx (8-4-4-4-12)
	    	U_2NAME	    :/^$|^([\s\S]{0,60})$/,	
	    	U_2NAME_L	:/^$|^([\s\S]{0,100})$/,	
	    	U_2NAME_P	:/^$|^([\s\S]{0,40})$/,	    //个人姓名
	    	U_2NAME_S	:/^$|^([\s\S]{0,20})$/,	
	    	U_2NAME_T	:/^$|^([\s\S]{0,100})$/,	    //一句话标题，比如文章的标题
	    	U_3DESC	    :/^$|^([\s\S]{0,255})$/,	    //描述性文字
	    	U_3DESC_L	:/^$|^([\s\S]{0,1024})$/,	
	    	U_3DESC_S	:/^$|^([\s\S]{0,128})$/,	
	    	U_3DESC_ZL	:/^$|^([\u4e00-\u9fa5]*)$/,                        // text	
	    	U_4INT	    :/^$|^(\d{0,10})$/,	
	    	U_4INT_L	:/^$|^(\d{0,18})$/,	
	    	U_4INT_S	:/^$|^(\d{0,5})$/,	
	    	U_5FLT	    :/^$|^(\d{0,12}(\.\d{0,2})?)$/,	
	    	U_5FLT_L	:/^$|^(\d{0,18}(\.\d{0,2})?)$/,	
	    	U_5LFT_S	:/^$|^(\d{0,7}(\.\d{0,2})?)$/,	
	    	U_6DATE		:/^$|^([0-9]{4}-(0?[0-9]|1[0-2])-(0?[1-9]|[12]?[0-9]|3[01]))$/,              //yyyy-MM-dd
	    	U_6DATETIME	:/^$|^(\d{4}-(0\d|1[0-2])-([0-2]\d|3[01])( ([01]\d|2[0-3])\:[0-5]\d\:[0-5]\d)?)$/,	//yyyy-MM-dd hh:mm:ss
	    	U_6TIME		:/^$|^(?:[01]\d|2[0-3])(?::[0-5]\d){2}$/,                  //hh:mm:ss
	    	U_7BOOL	    :/^$|^([Y|N]{1})$/,                                    //char(1)	Y/N
	    	U_8CODE	    :/^$|^([\s\S]{0,20})$/,      //编码，比如字典数据编码
	    	U_8CODE_EX	:/^$|^([\s\S]{0,40})$/,	    //外部编码，比如合同编号，发票号。。。
	    	U_8CODE_L	:/^$|^([\s\S]{0,40})$/,	    //长编码
	    	U_8CODE_S	:/^$|^([\s\S]{0,10})$/,	    //短编码，比如验证码
	    	U_9VALUE	:/^$|^([\s\S]{0,1024})$/,	//值，比如地址等
	    	U_9VALUE_L	:/^$|^([\s\S]{0,4096})$/,	//长值
	    	U_9VALUE_S	:/^$|^([\s\S]{0,512})$/,	    //短值
	    	U_AP_LNAME	:/^$|^([\s\S]{0,20})$/,	    //账号
	    	U_AP_PWD	:/^$|^(\d{6})$/,	    //密码
	   /* 	U_IN_EMAIL	:/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,	    //name@domain*/	 
        	U_IN_EMAIL	:/^$|(^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+)$/,
	    	U_IN_IP	    :/^$|^([\s\S]{0,23})$/,	    //IP4 或 ip6
	    	U_IN_IP4	:/^$|^([\s\S]{0,15})$/,	    //ipv4: 255.255.255.255
	    	U_IN_IP6	:/^$|^([\s\S]{0,23})$/,	    //ipv6: 255.255.255.255.255.255
	    	U_IN_URL	:/^$|^([\s\S]{0,1024})$/,	//url
	    	U_NM_MNY	:/^$|^(\d{0,18}(\.\d{0,2})?)$/,	//金额
	    	U_NM_PERCENT	:/^$|^(\d{0,3})$/,	//百分比
	    	U_NM_PERTHOU	:/^$|^(\d{0,4})$/,	//千分之
	    	U_NM_PERTHOUT	:/^$|^(\d{0,5})$/,	//万分之
	    	U_NM_PRC	    :/^$|^(\d{0,18}(\.\d{0,3})?)$/,	//价格
	    	U_NM_QTY	    :/^$|^(\d{0,18}(\.\d{0,2})?)$/,	//数量
	    	U_NM_QTYN	    :/^$|^(\d{0,18})$/,	//数量
	    	U_TL_MOBILE	    :/^$|^(1\d{10})$/,	//手机
	    	U_TL_PHONE	    :/^$|^((0\d{2,3}-)?[1-9]\d{6,7})$/,	//区号 - 电话 - 分机
	    	U_ZG_GEO	    :/^$|^([\s\S]{0,6})$/,	//参考规范的省市县编码，省市县各2位
	    	U_ZG_IDCARD	    :/^$|^(\d{15}(\d\d[0-9xX])?)$/,	//身份证
	    	U_ZG_IDENT	    :/^$|^([\s\S]{0,20})$/,	//企业 三证合一编码 （ 税务 工商 组织机构代码）
	    	U_ZG_POSTCODE	:/^$|^0?[1-9]\d{4,5}$/,	//邮编

	    	
	    
	    	
	
}

    