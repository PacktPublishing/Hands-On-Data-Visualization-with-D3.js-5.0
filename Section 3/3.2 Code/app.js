var colors = ['white', 'red', 'green', 'blue', 'black'];

var scale = d3.scaleBand()
			.domain(d3.range(colors.length))
			.range([0, 500]);
