var co = require("co")
var request = require("co-request")
var http = require("http")
var url = require("url")
var iconv = require("iconv-lite")
var qs = require("querystring")
var axios = require("axios")
var zlib = require("zlib")
var cheerio = require("cheerio")
//var webpage = require("webpage")
//var page = webpage.create()

function log(message){
    console.info(message)
}

//var nike = "http://www.nike.com/cn/zh_cn/"
// page.on(nike,function(status){
//    page.close()
//    phantom.exit()
// })
//
//
//axios.get().then(function(response){
//    log(response)
//})

function * req(url){
    var options = {
    //	    url: "http://www.nike.com/cn/zh_cn/",
    	    url: url,
    	    headers: {
    //		    'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.835.163 Safari/535.1',
    //	        'Accept-Encoding':'',
                'Accept':"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                'Accept-Language':'zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3',
                'Cache-Control':'max-age=0',
                'Connection':"keep-alive",
    //            'Host':'www.nike.com'
            }
        }
        var login = yield request(options)
        return login.body
}
function * login(){
    var options = {
    //	    url: "http://www.nike.com/cn/zh_cn/",
    	    url: 'https://unite.nike.com/loginWithSetCookie?locale=zh_CN&backendEnvironment=default',
    	    jar: true,
    	    method: 'POST',
    	    headers: {
    //		    'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.835.163 Safari/535.1',
    //	        'Accept-Encoding':'',
                'Accept':"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                'Accept-Language':'zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3',
                'Cache-Control':'max-age=0',
                'Connection':"keep-alive",
                'Host':'unite.nike.com',
                'Origin':'http://store.nike.com'
            },
            cookies: {
                '_gscbrs_207448657':1,
                '_gscs_207448657':'72897869gsmrgq18|pv:1',
                '_gscu_207448657': '72897869inoo0f18',
                'ak_bmsc': 'EA8591D83D481817A7891F9074488DE974D36384D24D000027A3CA574C2A706E~plqi1apfEuDBxtRQ4DSoEHhxfXss/KCexMcIIDoK5JfWPkGdEodKc2TKppAfI8JfUUh6wgxTaFE1IHtTQA+lHyZ4YHGBdQuRxEsdhi8J5yzO5opYpVDkPx5OpoDiyEDpVdyv/nGq+05xdmcjY8yW1gMfZjilw+6Bg+muH61F4i9qA=',
                'AMCV_F0935E09512D2C270A490D4D%40AdobeOrg': '283337926%7CMCIDTS%7C17048%7CMCMID%7C33759463232965952798864228881092086925%7CMCAID%7CNONE%7CMCAAMLH-1473502640%7C11%7CMCAAMB-1473502640%7CNRX38WO0n5BH8Th-nqAG_A',
                'AnalysisUserId': '116.211.99.132.199221472897831485',
                'analyticsData': '%7B%22fromGridwall%22%3A%22true%22%7D',
                'dreams_sample': 62,
                'guidS': '55db70a6-33ea-4251-8a38-5d7c15d2cb90',
                'guidSTimestamp': '1472897840538|1472897840538',
                'guidU': '8ae0c3e7-2467-4e6b-92bc-9650f5d68d3f',
                'mm_wc_pmt': 1,
                'neo.swimlane': 67,
                'NIKE_COMMERCE_CCR': 1472897833878,
                'NIKE_COMMERCE_COUNTRY': 'CN',
                'NIKE_COMMERCE_LANG_LOCALE': 'zh_CN',
                'nike_locale': 'cn/zh_cn',
                'RES_SESSIONID': '90758707378983',
                'RES_TRACKINGID': '855612473953286',
                'ResonanceSegment': 1,
                's_pers': '%20s_dfa%3Dnikecomprod%7C1472899639360%3B%20c5%3Dnikecom%253Estore%2520homepage%7C1472899795693%3B%20c6%3Dhomepage%7C1472899795698%3B%20c58%3Dno%2520value%7C1472899795706%3B%20ppm%3D%257B%2522name%2522%253A%2522product%2520wall%2522%252C%2522detail%2522%253A%2522nikecom%253Estore%2520homepage%2522%252C%2522st%2522%253Anull%257D%7C1504433995715%3B',
                's_sess': '%20c51%3Dhorizontal%3B%20s_cc%3Dtrue%3B%20tp%3D21766%3B%20prevList2%3D%3B%20s_ppv%3Dnikecom%25253Estore%252520homepage%252C1%252C1%252C314%3B',
                'utag_main': '_st:1472899637900$ses_id:1472898173672%3Bexp-session'
            }
        }
        var login = yield request(options)
        return login.body
}

co(function*(){
//    var res = yield req("https://secure-store.nike.com/cn/checkout/html/checkout_login.jsp?country=CN&country=CN&l=checkout&country=cn&lang_locale=zh_cn&site=nikestore&returnURL=http://store.nike.com/cn/zh_cn/pd/flyknit-max-%25E5%25A5%25B3%25E5%25AD%2590%25E8%25B7%2591%25E6%25AD%25A5%25E9%259E%258B/pid-11042679/pgid-11422763")
    var res = yield login()
    log(res)
//    var options = {
////	    url: "http://www.nike.com/cn/zh_cn/",
//	    url: "http://store.nike.com/cn/zh_cn/pw/n/1j7?sl=Nike%20Flyknit%20Max",
//	    headers: {
////		    'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.835.163 Safari/535.1',
////	        'Accept-Encoding':'',
//            'Accept':"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
////            'Accept-Language':'zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3',
////            'Cache-Control':'max-age=0',
//            'Connection':"keep-alive",
////            'Host':'www.nike.com'
//        }
//    }
//    var login = yield request(options)
//    var $ = cheerio.load(login.body)
//    var items = $(".grid-item-box")
//
//    for(var i = 0 ; i < items.length ; i++ ) {
//        var item = items.eq(i)
////        log(iconv.encode(item.html(),"utf8"))
//        log(item.html())
//    }
//    var gzip = zlib.createGzip()
//    zlib.deflate(login.body,(e,b) => {
//        log(iconv.decode(b,"UTF-8"))
//    })
})














