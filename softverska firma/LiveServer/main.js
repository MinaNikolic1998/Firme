import {Firma} from "./firma.js";
import {Projekat} from "./projekat.js";
import {Programer} from "./programer.js";

let nizLokacija=[];
let nizNaziva=[];
fetch("https://localhost:5001/Firma/PreuzmiFirme", {
    method: "GET"
    }).then(p => p.json().then(firme => {
    firme.forEach(firma => {
    const firm= new Firma(firma.id,firma.naziv,firma.brojZaposlenih,firma.godinaOsnivanja,firma.lokacija,firma.osnovneInformacije,firma.kontakt);  
    nizLokacija.push(firma.lokacija);
    nizNaziva.push(firma.naziv);
    /*firma.projekti.forEach(projekat => {
        const proj = new Projekat(projekat.id,projekat.naziv,projekat.tip,projekat.prioritet,projekat.ocekivanoTrajanje);
        projekat.programeri.forEach(programer => {
            const prog = new Programer(programer.id, programer.ime,programer.prezime,programer.starost,programer.senioritet,programer.plata);
            proj.dodajProgramera(prog);
        })
        firm.dodajProjekat(proj);
       
    })*/
    firm.crtajFirmu(document.body);           
   })
})).then(p => {
    function createMap(error, response) {
        var map = L.mapquest.map('map', {
          layers: L.mapquest.tileLayer('map'),
          center: [0, 0],
          zoom: 12
        });
    
        var featureGroup = generateMarkersFeatureGroup(response);
    
        featureGroup.addTo(map);
        map.fitBounds(featureGroup.getBounds());
      }
      L.mapquest.key = '	Tdc3W7nAHaGKHSCPYlS26PD4QGR6OYd3';
      L.mapquest.geocoding().geocode(nizLokacija, createMap);
       
           function generateMarkersFeatureGroup(response) {
             var group = [];
             for (var i = 0; i < response.results.length; i++) {
               var location = response.results[i].locations[0];
               var locationLatLng = location.latLng;
               
               var marker = L.marker(locationLatLng, {icon: L.mapquest.icons.marker()})
                  // .bindPopup(location.adminArea5 + ', ' + location.adminArea3);
                  .bindPopup(nizNaziva[i]);
       
               group.push(marker);
             }
             return L.featureGroup(group);
           }
   }).then(p => {
    let div=document.createElement("div");
    div.id="map";
    document.body.appendChild(div);
   })











  






   
