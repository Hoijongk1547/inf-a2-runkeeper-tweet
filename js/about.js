function parseTweets(runkeeper_tweets) {

	//Do not proceed if no tweets loaded
	if (runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function (tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	$('#firstDate').text(tweet_array[tweet_array.length - 1].time.toLocaleDateString('en-US', options));
	$('#lastDate').text(tweet_array[0].time.toLocaleDateString('en-US', options));

	 live_eventCount = 0;
	 achievementCount = 0;
	 completed_eventCount = 0;
	 miscellaneousCount = 0;
	 writtenCount = 0;
	
	for (var i = 0; i < tweet_array.length ; i++) {
		if (tweet_array[i].source == 'live_event') {
			live_eventCount++;
		} else if (tweet_array[i].source == 'achievement') {
			achievementCount++;
		} else if (tweet_array[i].source == 'completed_event') {
			completed_eventCount++;
		} else if (tweet_array[i].source == 'miscellaneous') {
			miscellaneousCount++;
		}

		if (tweet_array[i].written == true) {
			writtenCount++;
		}
	}
	

	$('.completedEvents').text(completed_eventCount);
	$('.liveEvents').text(live_eventCount);
	$('.achievements').text(achievementCount);
	$('.miscellaneous').text(miscellaneousCount);
	$('.written').text(writtenCount);

	$('.completedEventsPct').text(math.format((completed_eventCount / tweet_array.length) * 100) + '%');
	$('.liveEventsPct').text(math.format((live_eventCount / tweet_array.length) * 100) + '%');
	$('.achievementsPct').text(math.format((achievementCount / tweet_array.length) * 100)) + '%';
	$('.miscellaneousPct').text(math.format((miscellaneousCount / tweet_array.length) * 100) + '%');
	$('.writtenPct').text(math.format((writtenCount / tweet_array.length) * 100) + '%');
	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	$('#numberTweets').text(tweet_array.length);

	
	
}

//Wait for the DOM to load
$(document).ready(function () {
	loadSavedRunkeeperTweets().then(parseTweets);
});
