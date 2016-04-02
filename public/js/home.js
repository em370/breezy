var arr = ["Religion", "Science", "Politics", "Philosophy", "Education", "Food", "Sports", "Ethics", "Culture", "Music", "Hobbies", "Movies and Film", "Literature", "Comedy", "Something", "Anything"];

var i = 0;

var topic;

function getTopic() {
    if (i < arr.length) {
        topic = arr[i];
        i += 1;
    } else {
        i = 0;
    }
    return topic;
}

setInterval(function(){ document.getElementById('topic').innerHTML = getTopic(); }, 1250);

