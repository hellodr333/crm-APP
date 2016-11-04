/** 
 * 获取本周、本季度、本月、上月的开始日期、结束日期 
 */  
var now = new Date();                    //当前日期     
var nowDayOfWeek = now.getDay();         //今天本周的第几天     
var nowDay = now.getDate();              //当前日     
var nowMonth = now.getMonth();           //当前月     
var nowYear = now.getYear();             //当前年     
nowYear += (nowYear < 2000) ? 1900 : 0;  //    
  
var lastMonthDate = new Date();  //上月日期  
lastMonthDate.setDate(1);  
lastMonthDate.setMonth(lastMonthDate.getMonth()-1);  
var lastYear = lastMonthDate.getYear();  
var lastMonth = lastMonthDate.getMonth();  
    
//格式化日期：yyyy-MM-dd     
function formatDate(date) {      
    var myyear = date.getFullYear();     
    var mymonth = date.getMonth()+1;     
    var myweekday = date.getDate();      
         
    if(mymonth < 10){     
        mymonth = "0" + mymonth;     
    }      
    if(myweekday < 10){     
        myweekday = "0" + myweekday;     
    }     
    return (myyear+"-"+mymonth + "-" + myweekday);      
}      
    
//获得某月的天数     
function getMonthDays(myMonth){     
    var monthStartDate = new Date(nowYear, myMonth, 1);      
    var monthEndDate = new Date(nowYear, myMonth + 1, 1);      
    var   days   =   (monthEndDate   -   monthStartDate)/(1000   *   60   *   60   *   24);      
    return   days;      
}     
    
//获得本季度的开始月份     
function getQuarterStartMonth(){     
    var quarterStartMonth = 0;     
    if(nowMonth<3){     
       quarterStartMonth = 0;     
    }     
    if(2<nowMonth && nowMonth<6){     
       quarterStartMonth = 3;     
    }     
    if(5<nowMonth && nowMonth<9){     
       quarterStartMonth = 6;     
    }     
    if(nowMonth>8){     
       quarterStartMonth = 9;     
    }     
    return quarterStartMonth;     
}     
    
//获得本周的开始日期     
function getWeekStartDate() {  

	if(nowDayOfWeek==0){
		var weekStartDate = new Date(nowYear, nowMonth, nowDay -6);
		}else{
    var weekStartDate = new Date(nowYear, nowMonth, nowDay -  nowDayOfWeek + 1);      
	}    
    
    return formatDate(weekStartDate);     
}      
    
//获得本周的结束日期     
function getWeekEndDate() {
	if(nowDayOfWeek==0){
		var weekEndDate = new Date(nowYear, nowMonth, nowDay);
		}else{
    var weekEndDate = new Date(nowYear, nowMonth, nowDay + (7 - nowDayOfWeek)); 
	}
    return formatDate(weekEndDate);     
}      
    
//获得本月的开始日期     
function getMonthStartDate(){     
    var monthStartDate = new Date(nowYear, nowMonth, 1);      
    return formatDate(monthStartDate);     
}     
    
//获得本月的结束日期     
function getMonthEndDate(){     
    var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));      
    return formatDate(monthEndDate);     
}     
  
//获得上月开始时间  
function getLastMonthStartDate(){  
    var lastMonthStartDate = new Date(nowYear, lastMonth, 1);  
    return formatDate(lastMonthStartDate);    
}  
  
//获得上月结束时间  
function getLastMonthEndDate(){  
    var lastMonthEndDate = new Date(nowYear, lastMonth, getMonthDays(lastMonth));  
    return formatDate(lastMonthEndDate);    
}  
    
//获得本季度的开始日期     
function getQuarterStartDate(){     
         
    var quarterStartDate = new Date(nowYear, getQuarterStartMonth(), 1);      
    return formatDate(quarterStartDate);     
}     
    
//或的本季度的结束日期     
function getQuarterEndDate(){     
    var quarterEndMonth = getQuarterStartMonth() + 2;     
    var quarterStartDate = new Date(nowYear, quarterEndMonth, getMonthDays(quarterEndMonth));      
    return formatDate(quarterStartDate);     
}  

//=================================================获取当前是全年的第几周=================================
var thisWek=getWeekNumber(nowYear,(nowMonth+1),nowDay) ;
function getWeekNumber(y, m, d) {
	   var now = new Date(y, m - 1, d),
	         year = now.getFullYear(),
	         month = now.getMonth(),
	        days = now.getDate();
	    //那一天是那一年中的第多少天
	    for (var i = 0; i < month; i++) {
	         days += getMonthDays(year, i);
	     }
     //那一年第一天是星期几
	     var yearFirstDay = new Date(year, 0, 1).getDay() || 7;
	
	     var week = null;
	     if (yearFirstDay == 1) {
	        week = Math.ceil(days / yearFirstDay);
	    } else {
	         days -= (7 - yearFirstDay + 1);
	         week = Math.ceil(days / 7) + 1;
	     }
	 
	     return week;
	 }



//  ==============================返回当前第几季度=======================
getSeason();
function getSeason(){
	if(nowMonth<=2){
		return 1;
	}else if(nowMonth<=5 &&nowMonth>2 ){
		return 2;
	}else if(nowMonth<=8 &&nowMonth>5){
		return 3;
	}else{
		return 4;
	}
}






