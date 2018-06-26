/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

$(function() {
	/* This is our first test suite - a test suite just contains
	* a related set of tests. This suite is all about the RSS
	* feeds definitions, the allFeeds variable in our application.
	*/
	describe('RSS Feeds', function() {
		/* Test case to make sure that the 'allFeeds' variable has been defined and that it is not empty */
		it('are defined', function() {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});


		/* Test case to loop through each feed in the 'allFeeds' object and ensures it has a URL defined and that the URL is not empty. */
		it(' has a URL defined and is not empty', function(){
			allFeeds.forEach(element => {
				expect(element.url).toBeDefined();
				expect(element.url.length).not.toBe(0);
			});
		});


		/* Test case to loop through each feed in the 'allFeeds' object and ensures it has a name defined and that the name is not empty. */
		it(' has a name defined and is not empty', function(){
			allFeeds.forEach(element => {
				expect(element.name).toBeDefined();
				expect(element.name.length).not.toBe(0);
			});
		});
	});


	/* Test suite to test the "The menu" in the application */
	describe('The Menu', function(){
		/* Test case to ensure the menu element is hidden by default. */
		it('is hidden by default', function(){
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});

		 /* Test case to ensure the menu changes visibility when the menu icon is clicked */
		it('menu toggles on click', function(){
			menuIcon = $('.menu-icon-link');
			menuIcon.click();
			expect($('body').hasClass('menu-hidden')).toBe(false);
			menuIcon.click();
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});
	});

	/* Test suite to test the "Initial Entries" of the feed */
	describe('Initial Entries', function(){
		/* Test case to ensure when the loadFeed function is called and completes its work, there is at least a single .entry element within the .feed container. */

		// Calling befoerEach as it is async call.
		beforeEach(function(done){
			loadFeed(0,function(){
				done();
			});
		});
		it('should be atleast one entry',function(done){
			// Checks if the feed contains at least one article / entry in it.
			expect($(".feed .entry").length).toBeGreaterThan(0);
			// Same as above in a different way.
			expect($(".feed .entry").length).not.toBe(0);
			done();
		});
	});

	/* Test suite to test loading of new feeds, "New Feed Selection" */
	describe('The Feed Selection', function(){
		/* Test cae to ensure when a new feed is loaded by the loadFeed function that the content actually changes. */

		let htmlAfterFirstFeed; 
		let htmlAfterSecondFeed;

		beforeEach(function(done){
			loadFeed(0, function(){
				// Grab the html after first load completes
				htmlAfterFirstFeed = $('.feed').html();
				loadFeed(1,function(){
					// Grab the html after second feed is loaded.
					htmlAfterSecondFeed = $('.feed').html();
					done();
				});
			});
		});

		it('should change the content', function(done){
			expect(htmlAfterFirstFeed).not.toBe(htmlAfterSecondFeed);
			done();
		});
	});

}());
