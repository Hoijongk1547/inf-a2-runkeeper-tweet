function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if (runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	//TODO: Filter to just the written tweets
	tweet_array = runkeeper_tweets.map(function (tweet) {
		return new tweet(tweet.text);
	})

	var writtenText = [];

	for (var i = 0; i < tweet_array.length; i++) {
		if (tweet_array[i].written == true)
			writtenText.push(tweet_array[i]);
	}

}

function addEventHandlerForSearch() {
	//TODO: Search the written tweets as text is entered into the search box, and add them to the table

	//Couldn't implement
	// $('#textFilter').keyup(function() {
	// 	var idx = 0;
	// 	var searchtext = ($("textFilter")).val();

	// 	if (searchtext == "") {
	// 		$("#tweetTable").empty();
	// 	} else if ((writtenText[i].toLowercase()).includes(searchtext)) {
	// 		var result = writtenText[i].getHTMLTableRow(idx++);
	// 		$("#tweetTable").append(result);
	// 	}

	// })




}

//Wait for the DOM to load
$(document).ready(function () {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});