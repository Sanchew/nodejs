var cheerio = require("cheerio")
var co = require('co')
var corequest = require('co-request')
var express = require('express')
var app = express()

app.use('/static',express.static('public'))
app.get('/kingboo',function(req,res){
	res.redirect("/static/kingboo.html")
})
app.get('/',function(req,resq){
	
	resq.set('Content-Type','text/html;charset=utf8')
	resq.write("<style>*{margin:0;padding:0;}img{width:100%}</style>");
	co(function*(){
		for (var l = 1 ; l < 10 ; l++) {
			var url = "http://m.show160.com/user/3887129/photo-p"+l
			console.info(url)
			var body = yield corequest(url)
			var $=cheerio.load(body.body)//,{decodeEntities:false})
			// console.info(body.body)
			var rows=$('.rencai ul img')
			
			for(var i=0;i<rows.length;i++) {
				var $e=rows.eq(i)
				
				resq.write(`<div><img src="${$e.attr('src').replace('_s.jpg','.jpg')}"></div>`)
			}
		}
		resq.end()
	})

})
var server = app.listen(80,function(){
    var host = server.address().address,
	port = server.address().port
    console.log('app listening at http://%s:%s',host,port)
})