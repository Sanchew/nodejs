
var axios = require('axios')
var page = require('webpage').create()

var home = 'https://itunesconnect.apple.com/WebObjects/iTunesConnect.woa/ra/ng/app'
page.open(home,function(status){
	page.close()
	phantom.exit()
})
axios.get()
	.then(function(response){
		console.info(response)
	})
	.catch(function(error){
		console.error(error)
	})
console.info("ended")
