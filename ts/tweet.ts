class Tweet {
    private text: string;
    time: Date;

    constructor(tweet_text: string, tweet_time: string) {
        this.text = tweet_text;
        this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
    }

    //returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source(): string {
        if (this.text.includes("Just completed") || this.text.includes("Just posted")) {
            return "completed_event";
        } else if (this.text.startsWith("Achieved")) {
            return "achievement";
        } else if (this.text.startsWith("Watch")) {
            return "live_event";
        } else {
            return "miscellaneous";
        }
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written(): boolean {
        if (!this.text.includes('-')) {
            return true;
        } else {
            return false;
        }

        //TODO: identify whether the tweet is written
    }

    get writtenText(): string {
        if (!this.written) {
            return "";
        }
        var idx = this.text.indexOf("-");
        var result = this.text.substring(idx + 1);
        //TODO: parse the written text from the tweet
        return result;
    }
    // run(mi run, km run), walk(mi work km work), Freestyle, elliptical, spinning, meditation, swim, bike
    // Treadmill, hike, bootcamp, crossfit, strength workout, circuit, yoga, activity
    get activityType(): string {
        if (this.source != 'completed_event') {
            return "unknown";
        }
        //TODO: parse the activity type from the text of the tweet
        if (this.text.toLowerCase().includes("mi run") || this.text.toLowerCase().includes("km run")) {
            return "Running";
        } else if (this.text.toLowerCase().includes("mi walk") || this.text.toLowerCase().includes("km walk")) {
            return "Walking";
        } else if (this.text.toLowerCase().includes("freestyle")) {
            return "FreeStyle";
        } else if (this.text.toLowerCase().includes("elliptical")) {
            return "Elliptical workout";
        } else if (this.text.toLowerCase().includes("spinning")) {
            return "Spinning workout";
        } else if (this.text.toLowerCase().includes("meditation")) {
            return "Meditation";
        } else if (this.text.toLowerCase().includes("swim")) {
            return "Swim";
        } else if (this.text.toLowerCase().includes("bike")) {
            return "Bike";
        } else if (this.text.toLowerCase().includes("treadmill")) {
            return "Treadmill";
        } else if (this.text.toLowerCase().includes("hike")) {
            return "Hiking";
        } else if (this.text.toLowerCase().includes("bootcamp")) {
            return "Bootcamping";
        } else if (this.text.toLowerCase().includes("crossfit")) {
            return "Crossfit";
        } else if (this.text.toLowerCase().includes("strength")) {
            return "Strength workout";
        } else if (this.text.toLowerCase().includes("circuit")) {
            return "Circuit";
        } else if (this.text.toLowerCase().includes("yoga")) {
            return "Yoga";
        } else if (this.text.toLowerCase().includes("activity"))
            return "Activity";
        return "";
    }

    get distance(): number {
        if (this.source != 'completed_event') {
            return 0;
        }
        var regex = /[0-9]/;
        var numidx = this.text.search(regex);

        var km_idx = this.text.toLowerCase().indexOf("km");
        var mi_idx = this.text.toLowerCase().indexOf("mi")
        var dis_In_KM = this.text.substring(numidx, km_idx);
        var dis_In_MI = this.text.substring(numidx, mi_idx);
        var distance_mi = 0;
        //Convert KM to MI
        if (!isNaN(parseFloat(dis_In_KM))) {
            distance_mi = Number(dis_In_KM) / 1.609;
        } else if (!isNaN(parseFloat((dis_In_MI)))) {
            distance_mi = Number(dis_In_KM);
        } else { }
        //TODO: prase the distance from the text of the tweet
        return distance_mi;
    }

    getHTMLTableRow(rowNumber: number): string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        var linkidx = this.text.indexOf("http");
        var endidx = this.text.indexOf("#");
        var links = this.text.substring(linkidx, endidx - 1);
        var canClick = "<a href=" + links + "</a>";
        var text = "<td>" + this.text.substring(0, linkidx - 1);
        var remainText = this.text.substring(endidx - 1) + "</td>";
        var num = "<td>" + rowNumber + "</td>"
        var activityStr = "<td>" + this.activityType + "</td>";
        return "<tr>" + num + activityStr + text + links + remainText + "</tr>";
    }
}