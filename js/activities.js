function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if (runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function (tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	//"Running","Walking","FreeStyle","Elliptical workout","Spinning workout","Meditation","Swim","Bike"
	//"Treadmill","Hiking","Bootcamping","Crossfit","Strength workout", "Circuit","Yoga","Activity"
	var arr_activitity = [];

	var run = 0, walk = 0, fsty = 0, ellip = 0, spinn = 0, medit = 0, swim = 0, bik = 0, hik = 0, bootc = 0, cros = 0, stren = 0, circ = 0, yog = 0, acti = 0;
	var cartegorycount = 0;
	var mostNum = [0, 0, 0]; //Running,walking,Biking
	var runcount = 0, walkcount = 0, bikecount = 0;
	for (var i = 0; i < tweet_array.length; i++) {
		arr_activitity.push({ NameofActivity: tweet_array[i].activityType, disOfAct: tweet_array[i].distance, Day: tweet_array[i].time.getDay() });
		if (arr_activitity[i].NameofActivity == "Running") {
			run++;
			runcount += arr_activitity[i].disOfAct;
		} else if (arr_activitity[i].NameofActivity == "Walking") {
			walk++;
			walkcount += arr_activitity[i].disOfAct;
		} else if (arr_activitity[i].NameofActivity == "FreeStyle") {
			fsty++;
		} else if (arr_activitity[i].NameofActivity == "Elliptical workout") {
			ellip++;
		} else if (arr_activitity[i].NameofActivity == "Spinning workout") {
			spinn++;
		} else if (arr_activitity[i].NameofActivity == "Meditation") {
			medit++;
		} else if (arr_activitity[i].NameofActivity == "Swim") {
			swim++;
		} else if (arr_activitity[i].NameofActivity == "Bike") {
			bik++;
			bikecount += arr_activitity[i].disOfAct;
		} else if (arr_activitity[i].NameofActivity == "Hiking") {
			hik++;
		} else if (arr_activitity[i].NameofActivity == "Bootcamping") {
			bootc++;
		} else if (arr_activitity[i].NameofActivity == "Crossfit") {
			cros++;
		} else if (arr_activitity[i].NameofActivity == "Strength workout") {
			stren++;
		} else if (arr_activitity[i].NameofActivity == "Circuit") {
			circ++;
		} else if (arr_activitity[i].NameofActivity == "Yoga") {
			yog++;
		} else if (arr_activitity[i].NameofActivity == "Activity") {
			acti++;
		}
		if (arr_activitity[i].Day == 0) {
			arr_activitity[i].Day = "Sun";
		} else if (arr_activitity[i].Day == 1) {
			arr_activitity[i].Day = "Mon";
		} else if (arr_activitity[i].Day == 2) {
			arr_activitity[i].Day = "Tue";
		} else if (arr_activitity[i].Day == 3) {
			arr_activitity[i].Day = "Wed";
		} else if (arr_activitity[i].Day == 4) {
			arr_activitity[i].Day = "Thu";
		} else if (arr_activitity[i].Day == 5) {
			arr_activitity[i].Day = "Fri";
		} else if (arr_activitity[i].Day == 6) {
			arr_activitity[i].Day = "Sat";
		}
	}


	$('#numberActivities').text(15);
	arr_activitity.sort(function (a, b) { return a.Day - b.Day; });
	//0 Sun -6 Sat
	$('#firstMost').text("Running");
	$('#secondMost').text("Walking");
	$('#thirdMost').text("Biking");

	var threemostActs = [];
	var firstmost = [], secondmost = [], thirdmost = [];
	var test = [];
	var daysofweek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	for (var i = 0; i < arr_activitity.length; i++) {
		if (arr_activitity[i].NameofActivity == "Running") {
			threemostActs.push({ ActivityName: arr_activitity[i].NameofActivity, disoftheAct: arr_activitity[i].disOfAct, Days: arr_activitity[i].Day });

		} else if (arr_activitity[i].NameofActivity == "Walking") {
			threemostActs.push({ ActivityName: arr_activitity[i].NameofActivity, disoftheAct: arr_activitity[i].disOfAct, Days: arr_activitity[i].Day });

		} else if (arr_activitity[i].NameofActivity == "Bike") {
			threemostActs.push({ ActivityName: arr_activitity[i].NameofActivity, disoftheAct: arr_activitity[i].disOfAct, Days: arr_activitity[i].Day });

		}
	}


	//	A plot of how many of each type of activity exists in the dataset.



	activity_vis_spec = {
		"$schema": "https://vega.github.io/schema/vega-lite/v4.json",
		"description": "A simple bar chart with embedded data.",
		"width": 600,
		"height": 300,
		"data": {
			"values": [
				{ "Name of Activity": "Running" + "(" + run + "times)", "Frequency of Activity": run },
				{ "Name of Activity": "Walking" + "(" + walk + "times)", "Frequency of Activity": walk },
				{ "Name of Activity": "FreeStyle" + "(" + fsty + "times)", "Frequency of Activity": fsty },
				{ "Name of Activity": "Elliptical workout" + "(" + ellip + "times)", "Frequency of Activity": ellip },
				{ "Name of Activity": "Spinning workout" + "(" + spinn + "times)", "Frequency of Activity": spinn },
				{ "Name of Activity": "Meditation" + "(" + medit + "times)", "Frequency of Activity": medit },
				{ "Name of Activity": "Swim" + "(" + swim + "times)", "Frequency of Activity": swim },
				{ "Name of Activity": "Bike" + "(" + bik + "times)", "Frequency of Activity": bik },
				{ "Name of Activity": "Hiking" + "(" + hik + "times)", "Frequency of Activity": hik },
				{ "Name of Activity": "Bootcamping" + "(" + bootc + "times)", "Frequency of Activity": bootc },
				{ "Name of Activity": "Crossfit" + "(" + cros + "times)", "Frequency of Activity": cros },
				{ "Name of Activity": "Strength workout" + "(" + stren + "times)", "Frequency of Activity": stren },
				{ "Name of Activity": "Circuit" + "(" + circ + "times)", "Frequency of Activity": circ },
				{ "Name of Activity": "Yoga" + "(" + yog + "times)", "Frequency of Activity": yog },
				{ "Name of Activity": "Activity" + "(" + acti + "times)", "Frequency of Activity": acti }
			]
		},
		"mark": "bar",
		"encoding": {
			"x": { "field": "Name of Activity", "type": "nominal", "axis": { "labelAngle": 60 } },
			"y": { "field": "Frequency of Activity", "type": "quantitative" }
		}
	};
	vegaEmbed('#activityVis', activity_vis_spec, { actions: false });

	distanceVis_spec = {
		"$schema": "https://vega.github.io/schema/vega-lite/v4.json",
		"description": "A scatterplot showing body mass and flipper lengths of penguins.",
		"width": 600,
		"height": 500,
		"data": {
			"values": threemostActs
		},

		"mark": "point",
		"encoding": {
			"x": {
				"field": "Days",
				"type": "ordinal",
				"sort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
			},
			"y": {
				"field": "disoftheAct",
				"type": "quantitative",
				"axis": { "title": "Distance" }
			},
			"color": { "field": "ActivityName" }

		}
	};
	vegaEmbed('#distanceVis', distanceVis_spec, { actions: false });
	distanceVisAggregated_spec = {
		"$schema": "https://vega.github.io/schema/vega-lite/v4.json",
		"description": "A scatterplot showing body mass and flipper lengths of penguins.",
		"width": 600,
		"height": 500,
		"data": {
			"values": threemostActs
		},

		"mark": "point",
		"encoding": {
			"x": {
				"field": "Days",
				"type": "ordinal",
				"sort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
			},
			"y": {
				"aggregate": "mean",
				"field": "disoftheAct",
				"type": "quantitative",
				"axis": { "title": "Mean of Activity" }
			},
			"color": { "field": "ActivityName" }

		}
	};
	vegaEmbed('#distanceVisAggregated', distanceVisAggregated_spec, { actions: false });

	$("#distanceVisAggregated").hide();
	$("#aggregate").click(function () {
		if ($("aggregate").text() == "Show means") {
			$("#aggregate").text("Show all activities");
			$("#distanceVisAggregated").toggle();
			$("#distanceVis").toggle();
		} else {
			$("#aggregate").text("Show all activities");
			$("#distanceVisAggregated").toggle();
			$("#distanceVis").toggle();
			//$("#aggregate").text("Show means");
		}

		
	})

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
}

//Wait for the DOM to load
$(document).ready(function () {
	loadSavedRunkeeperTweets().then(parseTweets);
});