// The SVG Element
var barchart_width  =   800;
var barchart_height =   400;

// Creating projections 
var projection = d3.geoMercator()
.scale([barchart_height])
.translate([barchart_width/2, barchart_height]);				

var path = d3.geoPath(projection); 
var color = d3.scaleQuantize().range([
	'rgb(255,205,210)', 'rgb(239,154,154)', 'rgb(229,115,115)', 'rgb(239,83,80)', 
	'rgb(244,67,54)', 'rgb(229,57,53)', 'rgb(211,47,47)', 'rgb(198,40,40)']);

var svg = d3.select( '#barchart' )
    		.append( 'svg' )
    		.attr( 'width', barchart_width )
    		.attr( 'height', barchart_height );

var zoom_map = d3.zoom().on('zoom', function(){
	console.log(d3.event);
	var original_coordinates = projection.translate();

	original_coordinates[0] += d3.event.dx; 
	original_coordinates[1] += d3.event.dy;

	projection.translate(original_coordinates); 

	svg.selectAll('path')
		.transition()
		.attr('d', path);
		
	svg.selectAll('circle')
	    .transition()
		.attr('cx', function(d){
			return projection([d.lon, d.lat])[0];
		})
		.attr('cy', function(d){
			return projection([d.lon, d.lat])[1];
		});
});

var my_map = svg.append('g')
			 .attr('id', 'my_map')
			 .call( zoom_map);

my_map.append('rect')
		.attr('x', 0)
		.attr('y', 0)
		.attr('width', barchart_width)
		.attr('height', barchart_height)
		.attr('opacity', 0);

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

	my_map.selectAll('path')
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
		my_map.selectAll('circle')
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
 
d3.selectAll('#buttons button').on('click', function(){
	
	var original_coordinates = projection.translate();
	
	var distance = 10; 
	
	var direction = d3.select(this).attr('class');
	
	if (direction == "left") { 
		original_coordinates[0] -=distance; 
	} else if (direction == "right") {
		original_coordinates[0] +=distance;
	} else if (direction == "up") {
		 original_coordinates[1] -=distance;
	} else if (direction == "down") {
		original_coordinates[1] +=distance;
	}

	projection.translate(original_coordinates);

	svg.selectAll('path')
		.transition()
		.attr('d', path);
		
	svg.selectAll('circle')
	    .transition()
		.attr('cx', function(d){
			return projection([d.lon, d.lat])[0];
		})
		.attr('cy', function(d){
			return projection([d.lon, d.lat])[1];
		});
});


