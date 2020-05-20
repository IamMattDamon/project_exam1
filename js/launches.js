// Project Exam 1 - Launches.js

const launchesUrl = "https://api.spacexdata.com/v3/launches";
const nextLaunchUrl = "https://api.spacexdata.com/v3/launches/next";
const upcomingLaunchUrl = "https://api.spacexdata.com/v3/launches/upcoming";
const pastLaunchUrl = "https://api.spacexdata.com/v3/launches/past";

// Fetch JSON API
async function fetchAPI() {
    try {
    const nextLaunchResp = await fetch(nextLaunchUrl);
    const nextLaunch = await nextLaunchResp.json();
    arrayNextLaunch(nextLaunch);
    arrayCountdown(nextLaunch);

    const upcomingLaunchResp = await fetch(upcomingLaunchUrl);
    const upcomingLaunches = await upcomingLaunchResp.json();
    arrayUpcomingLaunches(upcomingLaunches);

    const pastLaunchResp = await fetch(pastLaunchUrl);
    const pastLaunch = await pastLaunchResp.json();
    arrayPastLaunches(pastLaunch);
    
    }   catch (error) {
        console.log(error);
    }
}

fetchAPI();

// Convert date formatting (code from same source as the countdown)
function convertDate(launchDate) {
    let date = new Date(launchDate * 1000);
    return date.toLocaleDateString();
}

// Next launch section
function arrayNextLaunch(nextLaunch) {
    const nextLaunchContainer = document.querySelector(".next-launch");
    
    let html = "";

    html += `   
    <h4 class="launch-header-small">NEXT LAUNCH</h4>
        <hr class="hr-launch">
            <div id="countdown">
                <table>
                    <tr>
                    <td>weeks</td>
                    <td>days</td>
                    <td>hours</td>
                    <td>mins</td>
                    <td>secs</td>
                    </tr>
                    <tr class="nums">
                    <th id="weeks"></th>
                    <th id="days"></th>
                    <th id="hours"></th>
                    <th id="minutes"></th>
                    <th id="seconds"></th>
                    </tr>
                </table>
            </div>
        `;
    
    html += `<h4 class="launch-header-small">MISSION</h4>
            <hr class="hr-launch">
            <p class="launch-details">${nextLaunch.mission_name}</p>
                
            <h4 class="launch-header-small">DATE</h4>
            <hr class="hr-launch">
            <p class="launch-details">${convertDate(nextLaunch.launch_date_unix)}</p>

            <h4 class="launch-header-small">ROCKET</h4>
            <hr class="hr-launch">
            <p class="launch-details">${nextLaunch.rocket.rocket_name}</p>

            <h4 class="launch-header-small">DETAILS</h4>
            <hr class="hr-launch">
            <p class="launch-details">${nextLaunch.details}</p>            
            `;

    nextLaunchContainer.innerHTML = html;

    }

    // Countdown to next launch (Not my own code - references)
    function arrayCountdown(data) {
        setInterval(function() {
            let distance, weeks, days, hours, minutes, seconds;
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
            } else if (data.tbd === true) {
                document.getElementById('countdown').innerHTML = `<h3>Launch is delayed</h3>
                                                                 <h3>New date to be determined</h3>
                                                                 `;
            } else {
                document.getElementById('countdown').innerHTML = `<h3>Launch in progress</h3>`;
            }
        }, 1000
        ) 
        
        }
        
        // Upcoming launches section
        function arrayUpcomingLaunches(upcomingLaunches) {
            const upcomingLaunchesContainer = document.querySelector(".upcoming-launches");

            let html = "";

            for (let i = 1; i < upcomingLaunches.length; i++) {
                html += `
                        <div class="upcoming-container">
                        <input type="checkbox" id="ul_toggle${i}" class="toggle">
                        <label class="dropdown-btn" for="ul_toggle${i}">
                            <h3 class="dropdown-btn centered">${upcomingLaunches[i].mission_name}</h3>
                        </label>
                            <div class="dropdown-content">
                                <div class="upcoming-data">
                                    <h4 class="launch-header-small">DATE</h4>
                                        <hr class="hr-launch">
                                        <p class="launch-details">${convertDate(upcomingLaunches[i].launch_date_unix)}</p>
                                    <h4 class="launch-header-small">ROCKET</h4>
                                        <hr class="hr-launch">
                                        <p class="launch-details">${upcomingLaunches[i].rocket.rocket_name}</p>
                                    <h4 class="launch-header-small">LAUNCH SITE</h4>
                                        <hr class="hr-launch">
                                        <p class="launch-details">${upcomingLaunches[i].launch_site.site_name_long}</p>
                                    <h4 class="launch-header-small">DETAILS</h4>
                                        <hr class="hr-launch">                                      
                            `;

                if (!upcomingLaunches[i].details) {
                    html += `<p class="launch-details">No details available for this mission</p>`
                } 
                else {
                    html += `<p class="launch-details">${upcomingLaunches[i].details}</p>`
                }
            
                html += `</div>
                         </div>
                         </div>
                        `;    
            }

            upcomingLaunchesContainer.innerHTML = html;
            
        }

        // Past launches section
        function arrayPastLaunches(completedLaunches) {
            const completedLaunchesContainer = document.querySelector(".completed-launches");

            let html = "";

            for (var i = completedLaunches.length -1; i >= 0; i--) {
                html += `
                        <div class="completed-container">
                        <input type="checkbox" id="ul_toggle${i}" class="toggle">
                        <label class="dropdown-btn" for="ul_toggle${i}">
                            <h3 class="dropdown-btn centered">${completedLaunches[i].mission_name}</h3>
                        </label>
                        <div class="dropdown-content">
                        <div class="completed-data">
                            <h4 class="launch-header-small">DATE</h4>
                                <hr class="hr-launch">
                                <p class="launch-details">${convertDate(completedLaunches[i].launch_date_unix)}</p>
                            <h4 class="launch-header-small">ROCKET</h4>
                                <hr class="hr-launch">
                                <p class="launch-details">${completedLaunches[i].rocket.rocket_name}</p>
                            <h4 class="launch-header-small">LAUNCH SITE</h4>
                                <hr class="hr-launch">
                                <p class="launch-details">${completedLaunches[i].launch_site.site_name}</p>
                            <h4 class="launch-header-small">DETAILS</h4>
                                <hr class="hr-launch">
                                <p class="launch-details">${completedLaunches[i].details}</p>
                        </div>
                        </div>
                        </div>
                        `;
            }

            completedLaunchesContainer.innerHTML = html;
        }



