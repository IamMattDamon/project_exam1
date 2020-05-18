const url = 'https://api.spacexdata.com/v3/launches/upcoming';

fetch(url)
.then(function(response) {
    return response.json();    
})
.then(function(data) {
    return launches(data);
})

function launches(nextLaunch){
    nextLaunchCountdown(nextLaunch[0]);
}

function nextLaunchCountdown(data) {
    console.log(data)
    setInterval(() => {
        let distance, days, hours, minutes, seconds;
        const now = Math.floor(new Date().getTime());
    
        distance = data.launch_date_unix*1000 - now;
        weeks = Math.floor(distance / 604800000);
        days = Math.floor(distance / (1000 * 60 * 60 * 24)/7);
        hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        if (distance > 0) {
            document.getElementById('weeks').innerHTML = weeks;
            document.getElementById('days').innerHTML = days;
            document.getElementById('hours').innerHTML = hours;
            document.getElementById('minutes').innerHTML = minutes;
            document.getElementById('seconds').innerHTML = seconds;   
        }  else if (data.tbd === true) {
            document.getElementById('countdown').innerHTML = "<h3>This launch has been delayed</h3>" +
                                                             "<h3>New date to be determined</h3>" +
                                                             "<br/>" ;
        } else {
            document.getElementById('countdown').innerHTML = "<h3>Launch in progress</h3>";
        }
    }, 1000
    ) 
    
    }