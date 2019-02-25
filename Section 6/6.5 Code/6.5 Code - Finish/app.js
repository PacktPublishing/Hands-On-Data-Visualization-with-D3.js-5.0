// The SVG Element
var barchart_width  =   800;
var barchart_height =   400;

// Creating projections 
var projection = d3.geoMercator();
var path = d3.geoPath(projection);
var color = d3.range([
	'rgb(255,205,210)', 'rgb(239,154,154)', 'rgb(229,115,115)', 'rgb(239,83,80)', 
	'rgb(244,67,54)', 'rgb(229,57,53)', 'rgb(211,47,47)', 'rgb(198,40,40)']);

var svg = d3.select( '#barchart' )
    		.append( 'svg' )
    		.attr( 'width', barchart_width )
    		.attr( 'height', barchart_height );

// Data
d3.json('data.json').then(function(data){
	svg.selectAll('path')
		.data(data.features)
		.enter()
		.append('path')
		.attr('d', path)
		.attr('fill', 'grey')
		.attr('stroke', 'black')
		.attr('stroke-width', 2);
});