function millisToMinutesAndSeconds(millis:any) {
    var minutes = Math.floor(millis / 60000);
    var seconds:any = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

export default millisToMinutesAndSeconds;