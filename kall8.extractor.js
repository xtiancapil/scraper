var cheerio = require('cheerio'),
	fs = require('fs'),
	os = require('os');

function extractCallBlocking() {
	var filename = 'data/CallBlocking.html';
	var output = filename.replace('html', 'csv');
	var str = fs.readFileSync(filename, 'utf8');
	str = '<body>' + str + '</body>';
	
	var $ = cheerio.load(str);
	
	// the first line of the csv file can contain the headers of each column
	fs.writeFile(output, 'clientId,clientName,allow,block,action' + os.EOL, function(err){
		if(err){
			console.log(err);
		}
	});	
	
	// Iterate through each <tr> element and extract the data we care about
	// Since notifications were only enabled for some of the clients, we can
	// process only a small subset of them by checking if it is "On"
	$('body').find('div').each(function(){
		$(this).find('table > tbody').find('tr').each(function(){
			var cols = $(this).find('td');
			
			if($(cols[1]).text() !== 'select' && $(cols[1]).text() !== '') {				
				fs.appendFile(output, $(cols[1]).text() + ',' + $(cols[2]).text() + ',"' + $(cols[4]).find('span').text() + '","' + $(cols[5]).find('span').text()  + '",' + $(cols[6]).text() + os.EOL, function(err){
					if(err){
						console.log(err);
					}
				});
			}
		});
	});
}

extractCallBlocking();