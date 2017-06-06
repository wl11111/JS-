var $val = $('#txt');
var $btn = $('#btn');

var num = 0;

$btn.click(function(){
	var val = $val.val();
	Data(val,num);
	$('#temp').html(view());
	
})


$('#app').on('click','a',function(ev){
	num = (ev.target.innerHTML-1)*20;
	Data($val.val(),num);
	$('#temp').html(view());
})
