// The SVG Element
var barchart_width  =   800;
var barchart_height =   400;

// Creating projections 
var projection = d3.geoMercator();
var path = d3.geoPath(projection);
var color = d3.scaleQuantize().range([
	'rgb(255,205,210)', 'rgb(239,154,154)', 'rgb(229,115,115)', 'rgb(239,83,80)', 
	'rgb(244,67,54)', 'rgb(229,57,53)', 'rgb(211,47,47)', 'rgb(198,40,40)']);

var svg = d3.select( '#barchart' )
    		.append( 'svg' )
    		.attr( 'width', barchart_width )
    		.attr( 'height', barchart_height );

// Data
d3.json('fires.json').then(function(fires_data) { 
	color.domain([0,1000]);

	d3.json('data.json').then(function(countries_data){
		countries_data.features.forEach(function (countries_e, countries_i){
			fires_data.forEach(function(fires_e, fires_i){
				if (countries_e.properties.name !== fires_e.country) {
					return null;
				}
				countries_data.features[countries_i].properties.num = parseFloat(fires_e.num);
			});
		});

	svg.selectAll('path')
		.data(countries_data.features)
		.enter()
		.append('path')
		.attr('d', path)
		.attr('fill', function(d){
			var num = d.properties.num;
			return num ? color (num) : 'yellow';
		})
		.attr('stroke', 'black')
		.attr('stroke-width', 2);

		add_capitals();
	});

});

function add_capitals() {
	d3.json('cities.json').then(function(capital_data){
		svg.selectAll('circle')
		.data(capital_data)
		.enter()
		.append('circle')
		.attr('fill', 'blue')
		.attr('opacity', '0.5')
		.attr('cx', function(d){
			return projection([d.lon, d.lat])[0];
		})
		.attr('cy', function(d){
			return projection([d.lon, d.lat])[1];
		})
		.attr('r', function(d){
			return Math.sqrt(parseInt (d.population) * 0.0000005);
		})
		.append('title')
		.text(function(d){
			return d.capital;
		});
	});
}


