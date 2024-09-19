const key = '615449855f1e4f464b5864d0c3ef3560'
url = `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${key}`



function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }

  }
  
function showPosition(position) {
console.log(position.coords.latitude);
console.log(position.coords.longitude);

}

getLocation()



fetch(url)
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json(); // Convert the response data to JSON
})
.then(data=>{
    console.log(data)
})
.catch(error=>{console.log("Caught a latent Error -", String(error));})

