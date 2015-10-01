# Selenium-based web scraper for Kall8

This uses Selenium to drive the extraction of data from Kall8's site.

## Prerequisites
* node.js >= 0.12
* Firefox (if using the default web driver for Selenium)

## Installation

To run, ensure Firefox is installed. Clone this repo and switch to the directory and run npm install
to get dependencies.

```
npm install
```

To scraping the site, run the command:

```
npm run scraper
```

To parse and extract the data, run the command:

```
npm run extract
```

## Data
Data is saved in the *data* folder.

## Editing

To make changes or edit the program, the entry point of the application is kall8.js.

## Resources

For documentation on the selenium-webdriver APIs, see the [documentation page](http://selenium.googlecode.com/git/docs/api/javascript/index.html).

To parse the HTML, we are using the cheeriojs library. For documentation, refer to the [github page](https://github.com/cheeriojs/cheerio).


