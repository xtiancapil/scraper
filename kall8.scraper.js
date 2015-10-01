var webdriver = require('selenium-webdriver'),
	By = require('selenium-webdriver').By,
	until = require('selenium-webdriver').until,
	chrome = require('selenium-webdriver/chrome'),
	fs = require('fs');
	
var driver = new webdriver.Builder()
	.forBrowser('firefox')
	.build();

var i = 0;	
	
var kall8 = {
	username: '<>',
	password: '<>',
	title: 'Kall8 : customtollfree : D90246',
	pages: [
		{
			url: 'https://secure.kall8.com/Numbers/HuntGroups.aspx',
			htmlContainerId: 'ctl00_ctl00_b_p_Rp'
		},
		{
			url: 'https://secure.kall8.com/Numbers/Settings.aspx',
			htmlContainerId: 'ctl00_ctl00_b_p_GridSettings',
			hasPagination: true
		},
		{
			url: 'https://secure.kall8.com/Numbers/CallBlocking.aspx',
			htmlContainerId: 'ctl00_ctl00_b_p_G',
			hasPagination: true
		},
		{
			url: 'https://secure.kall8.com/Numbers/CallLength.aspx',
			htmlContainerId: 'ctl00_ctl00_b_p_GridSettings',
			hasPagination: true
		},
		{
			url: 'https://secure.kall8.com/Numbers/Notification.aspx',
			htmlContainerId: 'ctl00_ctl00_b_p_CallNotify1_GridSettings',
			hasPagination: true
		}
	]
};	

function loadNextPage() {
	driver.findElement(By.css('input.rgPageNext')).click()
	driver.sleep(7000);	
}

function getHtmlSnippet(page) {
	var locator = By.id(page.htmlContainerId);
	var index = page.url.lastIndexOf('/');
	
	// takes the page and uses it for the filename
	var filename = 'data/' + page.url.substr(index).replace('aspx', 'html').replace('/','');	
	driver.get(page.url);
	driver.sleep(3000);
	driver.wait(until.elementLocated(locator, 15000));
	
	if(page.hasPagination) {
		// click the 'show all' button
		driver.findElement(By.css('input[value="Show All"]')).click();				
		driver.sleep(7000);
				
		driver.findElement(locator).getOuterHtml().then(function(data) {			
			fs.writeFile(filename, data, function(err){
				if(!err){
					console.log('saved ' + filename);
				}
			});	
		});
		
		loadNextPage();
		driver.findElement(locator).getOuterHtml().then(function(data) {			
				fs.appendFile(filename, data, function(err){
					if(!err){
						console.log('saved ' + filename);
					}
				});	
			});		
			
		loadNextPage();
		driver.findElement(locator).getOuterHtml().then(function(data) {			
				fs.appendFile(filename, data, function(err){
					if(!err){
						console.log('saved ' + filename);
					}
				});	
			});
			
		loadNextPage();
		driver.findElement(locator).getOuterHtml().then(function(data) {			
				fs.appendFile(filename, data, function(err){
					if(!err){
						console.log('saved ' + filename);
					}
				});	
			});		
		
		// wait until the loader is done
		// loading id b_p_Loading1ctl00_ctl00_b_p_RadAjax1	
		
	} else {
		driver.findElement(locator).getOuterHtml().then(function(data) {			
			fs.writeFile(filename, data, function(err){
				if(!err){
					console.log('saved ' + filename);
				}
			});	
		});
	}
};
	// Let's get all the HTML we need first and save it. Then we can try to process them using
	// cheerio later.
	driver.get('http://secure.kall8.com');
	driver.findElement(By.id('b_p_AccountLogin_UserName')).sendKeys(kall8.username);
	driver.findElement(By.id('b_p_AccountLogin_Password')).sendKeys(kall8.password);
	driver.findElement(By.id('b_p_AccountLogin_LoginButton')).click();
	driver.wait(until.titleIs(kall8.title), 1000);
	
	for(i = 0; i < kall8.pages.length; i++) {
		(function() {
			getHtmlSnippet(kall8.pages[i])
		})();		
	}
	
	driver.wait(function pauseBeforeClosing() { return false; }, 5000);
	driver.quit();