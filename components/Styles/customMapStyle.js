// customMapStyle.js
const customMapStyle = [
    {
      featureType: 'poi',  // Poistetaan kaikki 'point of interest' eli nähtävyydet
      elementType: 'all',
      stylers: [
        {
          visibility: 'off',  // Piilotetaan
        },
      ],
    },
    {
      featureType: 'poi.business',  // Poistetaan liiketoimintapaikat
      elementType: 'all',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi.park',  // Poistetaan puistot
      elementType: 'all',
      stylers: [
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'poi.place_of_worship',  // Poistetaan uskonnolliset paikat
      elementType: 'all',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi.school',  // Poistetaan koulut
      elementType: 'all',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'road.highway',  // Varmistetaan, että tiet näkyvät
      elementType: 'geometry',
      stylers: [
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'road',  // Näytetään kaikki tiet
      elementType: 'geometry',
      stylers: [
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'administrative',  // Poistetaan hallinnolliset rajat
      elementType: 'all',
      stylers: [
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'landscape',  // Näytetään maaston piirteet
      elementType: 'geometry',
      stylers: [
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'water',  // Näytetään vesialueet
      elementType: 'geometry',
      stylers: [
        {
          visibility: 'on',
        },
      ],
    },
  ];
  
  export default customMapStyle;
  