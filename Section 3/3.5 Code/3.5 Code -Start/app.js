var data            =   [5,9,21,17,10,3,26,9,15];

// The SVG Element
var barchart_width     =   600;
var barchart_height    =   300;
var barchart_padding     =   5;
var svg             =   d3.select( '#barchart' )
    .append( 'svg' )
    .attr( 'width', barchart_width )
    .attr( 'height', barchart_height );

// Creating scales
var scale_x = d3.scaleBand()
.domain(d3.range(data.length))
.rangeRound([0, barchart_width])
.paddingInner(0.1);

// Binding data and creating bars
svg.selectAll( 'rect' )
    .data( data )
    .enter()
    .append( 'rect' )
    .attr( 'x', function( d, i ){
		return scale_x(i); 
    })
    .attr( 'y', function(d ){
        return barchart_height - d * 5;
    })
    
	.attr( 'width', scale_x.bandwidth()) 
    .attr( 'height', function( d ){
        return d * 5;
    })
    .attr( 'fill', 'grey' );

// Creating labels
svg.selectAll( 'text' )
    .data(data)
    .enter()
    .append( 'text' )
    .text(function( d ){
        return d;
    })
    .attr( 'x', function( d, i ){
        return i * ( barchart_width / data.length ) +
                   ( barchart_width / data.length - barchart_padding ) / 2;
    })
    .attr( 'y', function(d ){
        return barchart_height - (d * 5) + 15;
    })
    .attr( 'font-size', 15 )
    .attr( 'fill', 'black' )
    .attr( 'text-anchor', 'middle' );