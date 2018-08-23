var responsive = (navigator.userAgent.indexOf("Firefox") != -1)  ? true : false;
var bubble_map = new Datamap({
  element: document.getElementById("bubbles"),
  responsive: responsive,
  // aspectRatio: '1',

  geographyConfig: {
    popupOnHover: false,
    highlightOnHover: false, 
    borderColor: '#36384e',
  },
  fills: {
    defaultFill: '#656677',
    USA: '#fa00ff',
    RUS: '#fa00ff'
  }
});

window.addEventListener('resize', function() {
    bubble_map.resize();
});

d3.select(window).on('resize', function() {
    bubble_map.resize();
});

$(window).on('resize', function() {
   bubble_map.resize();
});

bubble_map.bubbles([
  {
    name: 'Not a bomb, but centered on Brazil',
    radius: 5,
    centered: 'BRA',
    country: 'USA',
    yeild: 0,
    fillKey: 'USA',
    date: '1954-03-01'
  },
  {
    name: 'Not a bomb',
    radius: 3,
    yeild: 0,
    country: 'USA',
    centered: 'USA',
    date: '1986-06-05',
    significance: 'Centered on US',
    fillKey: 'USA'
  },
  {
    name: 'Castle Bravo',
    radius: 5,
    yeild: 15000,
    country: 'USA',
    significance: 'First dry fusion fuel "staged" thermonuclear weapon; a serious nuclear fallout accident occurred',
    fillKey: 'USA',
    date: '1954-03-01',
    latitude: 11.415,
    longitude: 165.1619
  },{
    name: 'Tsar Bomba',
    radius: 10,
    yeild: 50000,
    country: 'USSR',
    fillKey: 'RUS',
    significance: 'Largest thermonuclear weapon ever tested—scaled down from its initial 100 Mt design by 50%',
    date: '1961-10-31',
    latitude: 73.482,
    longitude: 54.5854
  }
], {
  popupTemplate: function(geo, data) {
    return '<div class="hoverinfo">Yield:' + data.yeild + 'Exploded on ' + data.date + ' by the '  + data.country + ''
  }
});