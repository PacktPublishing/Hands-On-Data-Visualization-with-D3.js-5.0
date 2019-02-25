var data  = [
			    [ 450, 300 ],
			    [ 210, 240 ],
			    [ 520, 430 ],
			    [ 130, 60 ],
			    [ 350, 250 ],
			    [ 100, 80 ],
			];

// The SVG Element
var barchart_width     =   600;
var barchart_height    =   300;
var barchart_padding   =   40;
var svg             =   d3.select( '#barchart' )
    .append( 'svg' )
    .attr( 'width', barchart_width )
    .attr( 'height', barchart_height );

// Creating scales
// Width
var scale_x = d3.scaleLinear()
				.domain([0, d3.max(data, function(d){
					return d[0];
				})])
				.range([barchart_padding, barchart_width - barchart_padding * 2]);

// Height
var scale_y = d3.scaleLinear()
    			.domain([ 0, d3.max(data, function(d){
        			return d[1];
    			})])
    			.range([ barchart_height - barchart_padding, barchart_padding ]);

// Creating the clippath
svg.append('clipPath')
.attr('id', 'clipPath-area')
.append('rect')
.attr('x', barchart_padding)
.attr('y', barchart_padding)
.attr('width', barchart_width - barchart_padding * 3)
.attr('height', barchart_height - barchart_padding * 2);  

// Creating Axis
var axis_x = d3.axisBottom( scale_x );

svg.append( 'g' )
    .attr( 'class', 'x-axis' )
    .attr(
        'transform',
        'translate(0,' + (barchart_height - barchart_padding ) + ')'
    )
    .call( axis_x );

var axis_y = d3.axisLeft( scale_y )
    .ticks( 5 );

svg.append( 'g' )
    .attr( 'class', 'y-axis' )
    .attr(
        'transform',
        'translate( ' + barchart_padding + ', 0 )'
    )
    .call( axis_y );


// Creating Circles
svg.append('g')
	.attr('id', 'path-area')
	.attr('clip-path', 'url(#clipPath-area)')
	.selectAll( 'circle' )
    .data( data )
    .enter()
    .append( 'circle' )
    .attr("cx", function(d) {
        return scale_x(d[0]);
    })
    .attr("cy", function(d) {
        return scale_y(d[1]);
    })
    .attr("r", 10)
    .attr( 'fill', 'grey' );


// Events
d3.selectAll('button').on('click', function(){
	// Random data
	data = [];
	
	// Generate a maximum number for the possible numbers that can be generated
	var maximum_num = Math.random() * 800;

	for (var i = 0; i < 6; i++) {
		// Generate the two coordinates for the circles
		var coord_x = Math.floor(Math.random() * maximum_num);
		var coord_y = Math.floor(Math.random() * maximum_num);
		// Call the push function on the data array
		data.push([coord_x, coord_y]);
	}

	// Updating the scales
	scale_x.domain([0, d3.max(data, function(d){
		return d[0];
	})]);
	scale_y.domain([0, d3.max(data, function(d){
		return d[1];
	})]);

	//Apply to the graph
	svg.selectAll('circle')
		.data(data)
		.transition()
		.on('start', function(){
			d3.select(this)
				.attr('fill', 'blue')
		})
		.duration(1500)
		.attr("cx", function(d) {
        	return scale_x(d[0]);
	    })
	    .attr("cy", function(d) {
	        return scale_y(d[1]);
	    })
	    .on('end', function(){
	    	d3.select(this)
				.attr('fill', 'green')
	    });

	//Updating the axis
	svg.select('.x-axis')
		.transition()
		.duration(1500)
		.call(axis_x);
	
	svg.select('.y-axis')
		.transition()
		.duration(1500)
		.call(axis_y);    
});