function Data(val,num){
	$.ajax({
		url:'http://api.douban.com/v2/movie/search?callback=?',
		dataType:'jsonp',
		data:{
			q:val,
			start:num
		},
		success:function(data){
			console.log(data)
			data.page = Math.ceil(data.total/data.count);
			var html = template('temp',data);
			$('#app').html(html);
		}
	})
}
