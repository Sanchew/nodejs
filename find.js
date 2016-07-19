var http = require('http')
var url = require('url')
var queryString = require('querystring')
var request = require('request')
var cheerio = require("cheerio")
var iconv = require("iconv-lite")
http.createServer(function(req,resq){
	
	for(var i=0;i<=9;i++){
		for(var j=0;j<=9;j++){	
			var mobile = "153"+i+j+"135526"
			var url = "http://www.ip138.com:8080/search.asp?mobile="+mobile+"&action=mobile"
			var headers = {  
				'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
			}	
			var options = {
				url:url,
				encoding:null,
				headers:headers
			}
			resq.setHeader('Content-Type','text/html;charset=utf8')
			request(options,function(e,res,body){
				body=iconv.decode(body,"gb2312")
				if(!e && res.statusCode==200){
					var $=cheerio.load(body,{decodeEntities:false})
					var address=$("table").eq(1).find("tr").eq(2).find(".tdc2").text().replace("&nbsp;","")
					var mobile=$("table").eq(1).find("tr").eq(1).find(".tdc2").text().substring(0.11)
					resq.write(mobile+"==>"+address+"<br>")
				}else{
					resq.write(e.message)
				}
				if(i==9&j==9)resq.end()
			})
		}
	}
}).listen(8080)

console.log(" server reading ")
