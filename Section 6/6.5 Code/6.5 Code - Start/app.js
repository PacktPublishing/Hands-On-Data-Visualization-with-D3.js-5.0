// The SVG Element
var barchart_width  =   800;
var barchart_height =   400;

// Creating projections 
var projection = d3.geoMercator()
var path = d3.geoPath(projection);

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
		.attr('stroke-width', 3);
	
});