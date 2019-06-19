(function(){
	var datepicker = {};
	
	datepicker.getMonthData = function(year, month){
		
		var ret = [];
		
		if(!year || !month){
			if(month === 0 && year){
				year --;
				month = 12;
			}else{
				var today = new Date();
				year = today.getFullYear();
				month = today.getMonth() + 1;
			}
			
		}
		
		//判断这个月第一天是周几
		var firstDay = new Date(year, month - 1 ,1);
		var firstDayWeekDay = firstDay.getDay();
		if(firstDayWeekDay === 0) firstDayWeekDay = 7;
		
		year = firstDay.getFullYear();
		month = firstDay.getMonth() + 1;
		
		var lastDayOfLastMonth = new Date(year, month - 1 ,0);
		var lastDateOfLastMonth = lastDayOfLastMonth.getDate();
		
		//需要补充上个月的日期个数
		var preMonthDayCount = firstDayWeekDay - 1;
		
		//判断下个月第一天是周几
		var lastDay = new Date(year ,month ,0);
		var lastDate = lastDay.getDate();
		
		//循环获取一个月日期
		for(var i=0; i<7*6; i++){
			var date = i + 1 - preMonthDayCount;
			var showDate = date;
			var thisMonth = month;
			if(date <= 0){
				//上一月
				thisMonth = month - 1;
				showDate = lastDateOfLastMonth + date;
			}else if(date > lastDate){
				//下一月
				thisMonth = month + 1;
				showDate = showDate - lastDate;
			}
			
			if(thisMonth === 0) thisMonth = 12;
			if(thisMonth === 13) thisMonth = 1;
			
			ret.push({
				month:thisMonth,
				date:date,
				showDate:showDate
			});
		}
		
		return {
			year : year,
			month : month,
			days : ret
		};
		
	}
	
	
	window.datepicker = datepicker;
})();