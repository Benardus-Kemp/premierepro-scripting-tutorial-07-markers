#target premierepro

(function () {
    if (!app.project || !app.project.activeSequence) {
        alert("Open a project and select a sequence first.");
        return;
    }

    var seq = app.project.activeSequence;

    // Example marker data
    var markersToAdd = [
        { time: "00:00:05:00", name: "Intro", comment: "Start of the video", color: 2 },
        { time: "00:00:15:00", name: "Title Card", comment: "Show logo", color: 4 },
        { time: "00:00:20:00", name: "Main Section", comment: "Content begins", color: 6 }
    ];

    // Function to add a marker
    function addMarker(seq, timecode, name, comment, colorIndex) {
        try {
            var t = new Time();
            t.seconds = timecodeToSeconds(timecode, seq);

            var marker = seq.markers.createMarker(t.seconds);
            marker.name = name;
            marker.comments = comment;
            if (colorIndex !== undefined) {
                marker.setColorByIndex(colorIndex); // color index: 0–15
            }
        } catch (e) {
            alert("3Error adding marker at " + timecode + ": " + e);
        }
    }

    // Helper: convert timecode (hh:mm:ss:ff) to seconds
    function timecodeToSeconds(tc, seq) {
        var fps = seq.videoFrameRate.seconds; // e.g., 25 or 29.97
        var fps = 25
        var parts = tc.split(":");
        if (parts.length !== 4) return 0;

        var h = parseInt(parts[0], 10);
        var m = parseInt(parts[1], 10);
        var s = parseInt(parts[2], 10);
        var f = parseInt(parts[3], 10);

        return h * 3600 + m * 60 + s + (f / fps);
    }

    // Add markers
    for (var i = 0; i < markersToAdd.length; i++) {
        var m = markersToAdd[i];
        addMarker(seq, m.time, m.name, m.comment, m.color);
    }

    alert("Added " + markersToAdd.length + " markers to sequence: " + seq.name);
})();
