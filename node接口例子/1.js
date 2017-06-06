const http = require('http');
const fs = require('fs');
const urlT=require('url');
const querystring=require('querystring');
let dataArr={"momo":"123"};
//http://localhost:666/user?act=add&user=name&pass=123
http.createServer(function (require, response) {
    if(require.url === '/favicon.ico')return;
    const obj=urlT.parse(require.url);
    const url=obj.pathname;//user
//  console.log(obj);
     const Data=querystring.parse(obj.query);
//  console.log(Data);
	if(url==='/user'){
		switch(Data.act){
			case 'add':
				if(dataArr[Data.user]){
					response.write('{"code":1,"msg":"用户已经存在"}');
				}else{
					dataArr[Data.user]=Data.pass;
					response.write('{"code":0,"msg":"注册成功"}');
				}
			break;
			default:
				response.write('404');
			break;
		}
		response.end();
	}else{
		//console.log(require.url);
		var fname = 'www'+require.url
			fs.readFile(fname,function(error,data){
				response.write(data);
				response.end();
			})
	}
}).listen(808);