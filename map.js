function loadMap(){
 Plotly.setPlotConfig({
        mapboxAccessToken: 'pk.eyJ1Ijoia2luZ2ZyYW5rMTIzIiwiYSI6ImNqcDRmM3k4ODAwc3Iza212Nm1nNDh4MGEifQ.gTwz3HGWpquQfM7wOQaDkQ'
        
    });

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200){
            var mapParams = getMapParams(this.response);
            Plotly.plot('map', mapParams.data, mapParams.layout);
        }
    };
    xhttp.open("GET", "/tickets");
    xhttp.send();
}
function setupMapData(a){
    var lati = [];
    var longit = [];
    var text = [];

    for (var line in a){
        lati.push(a[line][0]);
        console.log(a[line][0]);
        longit.push(a[line][1]);
        text.push(a[line][2]);
    }
    var data = [{
  type:'scattermapbox',
  lat:lati,
  lon:longit,
  mode:'markers',
  marker: {
    size:5,
    color:'rgb(255,0,0)'
  },
  text:text
}];
    return data;
}

function findCenter(a){
    var avg = []
    var biglat=a[0][0];
    var smalllat=a[0][0];
    var biglon=a[0][1];
    var smalllon=a[0][1];
    for (var line in a){
        if(biglat < a[line][0]){
            biglat = a[line][0];
        }
        if(smalllat > a[line][0]){
            smalllat = a[line][0];
        }
        if(biglon < a[line][1]){
            biglon = a[line][1];
        }
        if(smalllon > a[line][1]){
            smalllon = a[line][1];
        }
    }
    avg.push((biglat + smalllat)/2);
    avg.push((smalllon + biglon)/2);
    return avg;
}

function setupMapLayout(a){
    var lati= [];
    var longti = [];
    var layout = {
  autosize: true,
  hovermode:'closest',
  mapbox: {
    style:"satellite-streets",
    zoom:11,
    center: {
      lat:findCenter(a)[0],
      lon:findCenter(a)[1]
    },
  }
}
return layout;
}

function getMapParams(a){
    var b = JSON.parse(a);
    var obj = {data:setupMapData(b),layout:setupMapLayout(b)};
    return obj;
}