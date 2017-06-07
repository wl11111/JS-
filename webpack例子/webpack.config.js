const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

//对webpack进行配置
//入口，出口，loader，插件    webpack核心
module.exports = {
  entry:'./app.js',
  //或
  //entry:{
  //	paa:'./app.js'
  //}
  output:{
    filename:'app.js',
    //或
    //filename:'[name].js'   name --> paa；name就是entry里的key:ppa
    path: path.resolve(__dirname, 'build')//__dirname绝对路径，当前目录
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        use:[
	        {
	          loader:'babel-loader'
	        }
        ]
      },
      //自动引入css
      {
      	test:/\.css$/,
      	/*use:[
      			'style-loader','css-loader'
      	]*/
      	use:ExtractTextPlugin.extract({
      		fallback:'style-loader',
      		use:'css-loader'
      	})
      }
    ]
  },
  //自动在html文件中引入js文件
  plugins:[
     new HtmlWebpackPlugin({
     		filename:'test.html', // 打包好的build文件夹下会创建test.html；../可以在上一层目录创建
        template:'./index.html' // 引自己的模版文件路径
     }),
     //配置显示link
     new ExtractTextPlugin("index.css")
 ]
}