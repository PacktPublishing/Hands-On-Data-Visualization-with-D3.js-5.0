var data  = {
    nodes: [
        { name: "Italy" }, 
        { name: "France" },
        { name: "Germany" }, 
        { name: "Sweeden" },
        { name: "Denmark" }, 
        { name: "Ireland" },
        { name: "Iceland" }, 
        { name: "Holland" }
    ],
    links: [
        { source: 0, target: 1 }, 
        { source: 0, target: 2 },
        { source: 0, target: 3 }, 
        { source: 0, target: 4 },
        { source: 1, target: 5 }, 
        { source: 2, target: 5 },
        { source: 2, target: 5 }, 
        { source: 3, target: 4 },
        { source: 3, target: 5 }, 
        { source: 4, target: 6 },
        { source: 5, target: 7 }, 

    ]
};

// The SVG Element
var barchart_width  =   600;
var barchart_height =   300;

// Create the force layout
var simulation = d3.forceSimulation(data.nodes)
    .force("charge", d3.forceManyBody())
    .force("link", d3.forceLink(data.links))
    .force("center", d3.forceCenter()
    	.x(barchart_width / 2)
		.y(barchart_height / 2));


var svg = d3.select( '#barchart' )
    		.append( 'svg' )
    		.attr( 'width', barchart_width )
    		.attr( 'height', barchart_height );

// Drawing the links
var lines  =   svg.selectAll("line")
    .data(data.links)
    .enter()
    .append( "line" )
    .style( "stroke", "white" )
    .style( "stroke-width", 2 );

// Drawing the nodes
var nodes  =   svg.selectAll("circle")
    .data(data.nodes)
    .enter()
    .append( "circle" )
    .attr( "r", 10 )
    .style( "fill", "orange");

// Tooltip
nodes.append("title")
     .text(function( d ) {
        return d.name;
    });