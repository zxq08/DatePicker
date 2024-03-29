(function(){
	
	var datepicker = window.datepicker;
	
	var monthData;
	var $wrapper;
	
	datepicker.buildUi = function(year ,month){
		
		monthData = datepicker.getMonthData(year ,month);
		
		console.log(monthData);
		var html = '<div class="ui-datepicker-header">'+
			'<a href="#" class="ui-datepicker-btn ui-datepicker-prev-btn">&lt;</a>'+
			'<a href="#" class="ui-datepicker-btn ui-datepicker-next-btn">&gt;</a>'+
			'<span  class="ui-datepicker-curr-month">'+ monthData.year +'-'+ monthData.month +'</span>'+
		'</div>'+
		'<div class="ui-datepicker-body">'+
			'<table>'+
				'<thead>'+
					'<tr>'+
						'<th>一</th>'+
						'<th>二</th>'+
						'<th>三</th>'+
						'<th>四</th>'+
						'<th>五</th>'+
						'<th>六</th>'+
						'<th>日</th>'+
					'</tr>'+
				'</thead>'+
				'<tbody>';
				
				for(var i=0; i<monthData.days.length; i++){
					var date = monthData.days[i];
					if(i%7 === 0){
						html += '<tr>';
					};
					html += '<td data-date="'+date.date+'">' + date.showDate + '</td>';
					if(i%7 === 6){
						html += '</tr>';
					}
				}
					
				html += '</tbody>'+
			'</table>'+
		'</div>';
		
		return html;
	};
	
	datepicker.render = function(direction){
		
		var year,month;
		if(monthData){
			year = monthData.year;
			month = monthData.month;
		}
				
		if(direction === 'prev') month--;
		if(direction === 'next') month++;
		
		console.log(year,month);
		var html = datepicker.buildUi(year,month);
		
		if(!$wrapper){
			$wrapper = document.createElement('div');
			$wrapper.className = 'ui-datepicker-wrapper';
			document.body.appendChild($wrapper);
		}
		$wrapper.innerHTML = html;
		
	}
	
	datepicker.init = function(input){
		
		datepicker.render();
		
		var $input = document.querySelector(input);
		var isOpen = false;
		
		$input.addEventListener('click',function(){
			if(isOpen){
				$wrapper.classList.remove('ui-datepicker-wrapper-show');
				isOpen = false;
			}else {
				$wrapper.classList.add('ui-datepicker-wrapper-show');
				var left = $input.offsetLeft;
				var top = $input.offsetTop;
				var height = $input.offsetHeight;
				$wrapper.style.top = top + height + 2 + 'px';
				$wrapper.style.left = left + 'px';
				isOpen = true;
			}
		},false);
		
		$wrapper.addEventListener('click', function(e){
			var $target = e.target;	
			if( !$target.classList.contains('ui-datepicker-btn') ){
				return;
			}
				
			
			//上一个月
			if($target.classList.contains('ui-datepicker-prev-btn')){
				//console.log(month);
				datepicker.render('prev');
				//console.log(month);
			}else if($target.classList.contains('ui-datepicker-next-btn')){
				datepicker.render('next');
			}
		},false);
		
		$wrapper.addEventListener('click',function(e){
			var $target = e.target;
			if($target.tagName.toLowerCase() !== 'td') return;
			
			var date = new Date(monthData.year, monthData.month -1, $target.dataset.date);
			
			$input.value = format(date);
			
			$wrapper.classList.remove('ui-datepicker-wrapper-show');
			isOpen = false;
		},false);
		
	};
	
	function format(date){
		ret = '';
		
		var padding = function(num){
			if(num<=9){
				return '0' + num;
			}
			return num;
		}
		
		ret += date.getFullYear() + '-';
		
		ret += padding(date.getMonth()+ 1)  +'-';

		ret += padding(date.getDate());
		
		return ret;
	}
})();