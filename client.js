var musicData = $('.active').last().children('a[class^="queueSong"]');
var song = musicData[0].text;
var artist = musicData[1].text;
console.log(song, artist);

alert(song + ' - ' + artist);