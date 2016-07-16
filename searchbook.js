var http = require('http')
var url = require('url')
var queryString = require('querystring')
var request = require('request')
var cheerio = require("cheerio")
http.createServer(function(req,resq){
	var bookname=queryString.parse(url.parse(req.url).query).n
	
	resq.setHeader('Content-Type','text/html;charset=utf8')
	var data = {
		book_name:bookname,
		pageSize:999,
		keyword1:bookname
	}
	var baseServer = "http://123.127.171.216:8080"
	request(baseServer+"/clcnopac/Search.action?"+queryString.stringify(data),function(e,res,body){
		if(!e && res.statusCode==200){
			var $=cheerio.load(body,{decodeEntities:false})
			var rows=$('.search_result tr')
			var datas=[]
			rows.each(function(i,e){
				var $e=$(e)
				var row={}
				row.title=$e.find(".title_list b").html()
				row.author=$e.find("ul").eq(1).text().replace(/\s/g,"").replace(/(&nbsp;)+/g,"|")
				row.detailUrl=$e.find("a[onclick]").attr("onclick").match(/.*?'(.*?)'.*/)[1]
				datas.push(row)
			})
			
			var resBody=datas.length+" rows"
			for (var r in datas )
			{
				// yield
				var r=datas[r]
				resBody+="<div class='row'>"
				resBody+="<div>"+r.title+"<a target='_blank' style='margin-left:20px;' href='"+baseServer+r.detailUrl+"'>detail</a></div>"
				resBody+="<div>"+r.author+"</div>"
				//resBody+="<div>"+r.title+"</div>"
				resBody+="</div><hr>"
			}
			resq.write(resBody)
		}else{
			resq.write(e.message)
		}
		resq.end()
	})
	/*
	var server = {
		hostname:"123.127.171.216",
		port:8080,
		path:"/clcnopac/Search.action?" + queryString.stringify(data),
		headers:{
			"Content-Type":"application/x-www-form-urlencoded"
		},
		method:"GET"
	}
	http.request(server,function(res) {
		console.info(res.body)
		resq.write("request success")
		resq.end()

	}).on('error',function(e){
		resq.end(e.message)
	})
	*/
	//res.write(" access success search book is "+bookname)
	//res.end()

}).listen(80)

console.log(" server reading ")
