
$.fn.extend({
	upload:function(obj){
		let up = new Uploads();
		up.init(obj);
		
		return up;
	}
})

class Uploads{
	constructor(){
		this.settings={
			fileName:null,
			btn:null,
			view:function(){}
		},
		this.arr = [],
		this.num = 0
	}
}

$.extend(Uploads.prototype,{
	init:function(obj){
		$.extend(this.settings,obj);
		let _this = this;
		this.settings.fileName.on('change',function(){
			_this.addData(this);
		});
		this.settings.btn.on('click',function(){
			if(_this.arr.length){
				_this.send();
			}
		})
	},
	
	addData:function(that){
		if(this.arr.every(function(e){
			return that.files[0].name != e.name;
		})){
			this.arr.push(that.files[0]);
			this.settings.view(that.files[0]);
			this.num++;
		}
	},
	/*
		 new FileReader() + fr.readAsDataURL(data);
		 
		 将把files[0]转成图片源码，通过onload中的ev.target.result
		 去取源码。
	*/
	readFile:function(data,callback){
		let fr = new FileReader();
		fr.onload = function(ev){
			//把图片源码传给开发人员。
			callback && callback(ev.target.result);
		}
		fr.readAsDataURL(data);
	},
	
	send:function(){
		let _this = this;
		this.arr.forEach(function(e){
			let fd = new FormData();
			fd.append('file',e)
			$.ajax({
				url:_this.settings.url,
				type:'post',
				data:fd,
				// 告诉jQuery不要去处理发送的数据
				processData : false, 
				// 告诉jQuery不要去设置Content-Type请求头
				contentType : false,
				
				success:function(data){
					if(_this.num = _this.arr.length){
						//全部上传完后
						_this.arr.length = 0;
						_this.settings.clear()
					}
					
				}
				
			})
		})
		
	}
	
	
})


