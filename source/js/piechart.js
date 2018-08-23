$(document).ready(function(){
    $('#gadgets').click(function(){
        $('.user-det_left').hide();
        $('.user-det_right').show();
        $("#chart2").removeClass('traffic');
        $("#chart2").addClass('gadgets');
    })
    $('#traffic').click(function() {
        $('.user-det_left').show();
        $('.user-det_right').hide();
         $("#chart2").removeClass('gadgets');
        $("#chart2").addClass('traffic');
    })
    $("#gadgets, #traffic").click(function(e) {
        e.preventDefault();
        $("#gadgets, #traffic").removeClass('active');
        $(this).addClass('active');
        removePieSvg();
        pieChart('#chart1');
        doublePieChart('#chart2');
    })
})


window.addEventListener("resize", function () {
        removePieSvg();
        pieChart('#chart1');
        doublePieChart('#chart2');
    });

    function pieChart(sel) {
        var chart = document.querySelector(sel);
        var w = chart.offsetWidth;
        var h = chart.offsetHeight;

        var width = w,
            height = h;

        var dataset = {
            traffic: [{
                "name": "first",
                "score": 5
            }, {
                "name": "second",
                "score": 43
            }, {
                "name": "third",
                "score": 22
            }, {
                "name": "fourth",
                "score": 15
            }, {
                "name": "fifth",
                "score": 15
            }, {
                "name": "sixth",
                "score": 15
            }]
        };

        var radius = 160;// Math.min(width, height) / 2;

        //make an SVG
        var svg = d3.select(sel).append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        makeCircle();

        function makeCircle() {
            var pie = d3.layout.pie()
                    .sort(null).value(function (d) {
                        return d.score;//score is the value for teh pie
                    });

            var arc = d3.svg.arc().cornerRadius(20).padAngle(.04)
                    .innerRadius(radius - 104)
                    .outerRadius(radius - 100);
            var g = svg.selectAll(".arc1")
                    .data(pie(dataset.traffic))
                    .enter().append("g")
                    .attr("class", "arc1")
                    .attr("data-id", function(d, i) {
                        return d.data.name;

                    });

            // filters go in defs element
            var defs = svg.append("defs");
            var filter = defs.append("filter")
                    .attr("id", "drop-shadow2")
                    .attr("height", "130%");
            filter.append("feGaussianBlur")
                    .attr("in", "SourceGraphic")
                    .attr("stdDeviation", 3)
                    .attr("result", "blur");

            var feMerge = filter.append("feMerge");

            feMerge.append("feMergeNode")
                    .attr("in", "blur")
            feMerge.append("feMergeNode")
                    .attr("in", "SourceGraphic");

            g.append("path")
                    .attr("d", arc)
                    .attr("fill", function(d,i) { return colors2(i); } )
                    .style("filter", "url(#drop-shadow2)")
                    .on("mouseover", function(){

                        var id = d3.select(this.parentNode).attr('data-id');
                        var tds = document.getElementById('ftable').getElementsByTagName('td');

                        for (var i = 0; i < tds.length; i++) {
                            tds[i].style.color = '#aaa';
                        }

                        var td = document.getElementById('ftable').querySelectorAll('tr[data-id='+id+'] td');
                        td[0].style.color = '#fff';

                        d3.select(sel+" svg").selectAll("g").style("fill-opacity", "0.46");
                        d3.select(this.parentNode).style("fill-opacity", "1");
                    }).on("mouseout", function(){

                        d3.select(sel+" svg").selectAll("g").style("fill-opacity", "1");

                        var tds = document.getElementById('ftable').getElementsByTagName('td');

                        for (var i = 0; i < tds.length; i++) {
                            tds[i].style.color = '#fff';
                        }
                    });
        }

    }

    function doublePieChart(sel) {
        var chart = document.querySelector(sel);
        var w = chart.offsetWidth;
        var h = chart.offsetHeight;

        var width = w,
                height = h;

        var dataset = {
            traffic: [{
                "name": "direct",
                "score": 43
            }, {
                "name": "organic",
                "score": 13
            }, {
                "name": "refferal",
                "score": 13
            }, {
                "name": "social",
                "score": 18
            }, {
                "name": "other",
                "score": 13
            }],
            gadgets: [{
                "name": "apple1",
                "score": 18
            }, {
                "name": "apple2",
                "score": 13
            }, {
                "name": "google",
                "score": 15
            }, {
                "name": "htc",
                "score": 18
            }, {
                "name": "xperia",
                "score": 18
            }, {
                "name": "galaxy",
                "score": 18
            }]
        };

        var radius = 160;// Math.min(width, height) / 2;

        //make an SVG
        var svg = d3.select(sel).append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

		if (screen.width >= 768) {
            makeInnerCircle();
			makeOuterCircle(); 
         } else {
			if($('#traffic').hasClass('active')) {
				makeOuterCircle();
			}
			else {
				makeInnerCircle();
			}
        }

        function makeOuterCircle() {
            var pie = d3.layout.pie()
                    .sort(null).value(function (d) {
                        return d.score;
                    });

            var opacity = 0.46;

            if (window.innerWidth < 768) {
            	radius = 136;
            	opacity = 1;
            }

            var arc = d3.svg.arc().cornerRadius(20).padAngle(.04)
                    .innerRadius(radius - 80)
                    .outerRadius(radius - 76);
            var g = svg.selectAll(".arc")
                    .data(pie(dataset.gadgets))//dataset for gadgets
                    .enter().append("g")
                    .attr("class", "arc")
                    .attr("style", "opacity: "+opacity);

            // filters go in defs element
            var defs = svg.append("defs");
            var filter = defs.append("filter")
                    .attr("id", "drop-shadow")
                    .attr("height", "130%");
            filter.append("feGaussianBlur")
                    .attr("in", "SourceGraphic")
                    .attr("stdDeviation", 3)
                    .attr("result", "blur");

            var feMerge = filter.append("feMerge");

            feMerge.append("feMergeNode")
                    .attr("in", "blur")
            feMerge.append("feMergeNode")
                    .attr("in", "SourceGraphic");

            g.append("path")
                    .attr("d", arc)
                    .attr("fill", function(d,i) { return colors1(i); } )
                    .style("filter", "url(#drop-shadow)");

        }
        function makeInnerCircle() {
            var pie = d3.layout.pie()
                    .sort(null).value(function (d) {
                        return d.score;//score is the value for teh pie
                    });

            var arc = d3.svg.arc().cornerRadius(20).padAngle(.04)
                    .innerRadius(radius - 104)
                    .outerRadius(radius - 100);
            var g = svg.selectAll(".arc1")
                    .data(pie(dataset.traffic))
                    .enter().append("g")
                    .attr("class", "arc1");

            // filters go in defs element
            var defs = svg.append("defs");
            var filter = defs.append("filter")
                    .attr("id", "drop-shadow2")
                    .attr("height", "130%");
            filter.append("feGaussianBlur")
                    .attr("in", "SourceGraphic")
                    .attr("stdDeviation", 3)
                    .attr("result", "blur");

            var feMerge = filter.append("feMerge");

            feMerge.append("feMergeNode")
                    .attr("in", "blur")
            feMerge.append("feMergeNode")
                    .attr("in", "SourceGraphic");

            g.append("path")
                    .attr("d", arc)
                    .attr("fill", function(d,i) { return colors2(i); } )
                    .style("filter", "url(#drop-shadow2)");
        }

    }

    function colors1(n) {
        var colores_g = ["#0193FF", "#0145FF", "#01FF7A", "#FFCE01", "#ED01FF", "#FF0101", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac"];
        return colores_g[n % colores_g.length];
    }
    function colors2(n) {
        var colores_g = ["#0193FF", "#01FF7A", "#FFCE01", "#ED01FF", "#FF0101", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac", "#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477"];
        return colores_g[n % colores_g.length];
    }
    //Remove SVG
    function removePieSvg() {

        [].forEach.call(document.querySelectorAll('.piechart svg'), function (e) {
            e.parentNode.removeChild(e);
        });

    }

    pieChart('#chart1');
    doublePieChart('#chart2');