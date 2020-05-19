const launchesUrl = "https://api.spacexdata.com/v3/launches";
const nextLaunchUrl = "https://api.spacexdata.com/v3/launches/next";
const upcomingLaunchUrl = "https://api.spacexdata.com/v3/launches/upcoming";
const pastLaunchUrl = "https://api.spacexdata.com/v3/launches/past";

// Fetch JSON API
async function fetchAPI() {
    try {
    const nextLaunchResp = await fetch(nextLaunchUrl);
    const nextLaunch = await nextLaunchResp.json();
    displayNextLaunch(nextLaunch);
    displayCountdown(nextLaunch);

    const upcomingLaunchResp = await fetch(upcomingLaunchUrl);
    const upcomingLaunches = await upcomingLaunchResp.json();
    displayUpcomingLaunches(upcomingLaunches);

    const pastLaunchResp = await fetch(pastLaunchUrl);
    const pastLaunch = await pastLaunchResp.json();
    displayPastLaunch(pastLaunch);
    }
    catch (error) {
        console.log(error);
    }
}

fetchAPI();

// Convert date formatting
function convertDate(launchDate) {
    let date = new Date(launchDate * 1000);
    return date.toLocaleDateString();
}

// Next launch
function displayNextLaunch(nextLaunch) {
    const nextLaunchQuery = document.querySelector(".next-launch");
    
    let html = "";
    
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

    html += `<div id="countdown">
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

    nextLaunchQuery.innerHTML = html;

    }
    




