// The SVG Element
var barchart_width  =   800;
var barchart_height =   400;

var svg = d3.select( '#barchart' )
    		.append( 'svg' )
    		.attr( 'width', barchart_width )
    		.attr( 'height', barchart_height );

