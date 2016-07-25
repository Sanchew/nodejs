var http = require('http')
var url = require('url')
var queryString = require('querystring')
var request = require('request')
var cheerio = require("cheerio")
var promise = require('request-promise')
var iconv = require('iconv-lite')
http.createServer(function(req,resq){
	var bookname=queryString.parse(url.parse(req.url).query).n
	
	resq.setHeader('Content-Type','text/html;charset=utf8')
	resq.write("<style>*{color:#999}a{color:#009;}</style>");
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
			resq.write(`<div>total ${rows.length}</div>`)
			function buildData(index){
				if (index >= rows.length) {
					resq.end()
					return
				}
				var $e=rows.eq(index)
				var row={}
				row.title=$e.find(".title_list b").html()
				row.author=$e.find("ul").eq(1).text().replace(/\s/g,"").replace(/(&nbsp;)+/g,"|")
				row.detailUrl=$e.find("a[onclick]").attr("onclick").match(/.*?'(.*?)'.*/)[1]
				
				var randomnum = 10*Math.random(),
				    id=row.detailUrl.match(/marc_id=(\d+)/)[1],
				    cat=row.detailUrl.match(/cat=(\w+)/)[1],
				    dbid=row.detailUrl.match(/dbid=(\d+)/)[1],
				    unique=row.detailUrl.match(/unique=(\w+)/)[1]
				
				var keyvalue = '';
	  			if(cat=='ww'){
	  			   cat='cat1';
	  			}
	  			
	  			if(cat=='cat1'){
	  			        keyvalue='012b';
	  			}
	  			if(cat=='sr'){
	  			        keyvalue='012c';
	  			}
	  			if(cat=='st'){
	  			        keyvalue='012d';
	  			} if(cat=='gj'){
	  			        keyvalue='0127d';
	  			}
	  			if(cat=='df'){
	  			        keyvalue='0126d';
	  			        if(unique.indexOf('aq')>=0)
	  			        {
	  			        keyvalue='012d2';
	  			        }
	  			}
	  			if(cat=='mg'){
	  			        keyvalue='0127d';
	  			}
	  			if(cat=='aq'){
	  			        if(dbid=='cat1'){
	  			         keyvalue='012d1';
	  			        }
	  			        if(dbid=='df'){
	  			      	   keyvalue='012d2';
	  			        }
	  			        if(dbid=='sr'){
	  			      	   keyvalue='012d3';
	  			        }
	  			        
	  			}
				var apiurl = baseServer + "/clcnopac/api.action?marc_id="+id+"&cat="+cat+"&type=table&key="+keyvalue+"&rnum="+randomnum
				promise({
					uri:apiurl,
					transform: function (body){
						return cheerio.load(body)
					}
				}).then(function($){
					$("tr").find("td").each((i,e) => {
						var $e=$(e)
						var v = $e.html()
						v = iconv.encode(v,"utf8")
						console.info(`${$e.html()} ${i}`)
						if ($e.html() == "&#x5728;&#x5E93;") {
							$e.css({color:"green"})
						}
					})
					row.detail = $.html("table")
					datas.push(row)
					printData(row)
					buildData(index+1)
				})
			}
			buildData(0)
			function printData(r){
				var resBody="<div class='row'>"
				resBody+="<div>"+r.title+"<a target='_blank' style='margin-left:20px;' href='"+baseServer+r.detailUrl+"'>detail</a></div>"
				resBody+="<div>"+r.author+"</div>"
				//resBody+="<div>"+r.title+"</div>"
				resBody+=r.detail
				resBody+="</div><hr>"
				resq.write(resBody)
			}
		}else{
			resq.write(e.message)
			resq.end()
		}
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
