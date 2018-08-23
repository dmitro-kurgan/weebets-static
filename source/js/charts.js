window.addEventListener("resize", function () {
        removeSvg();
        areaChart(1, '#chart3', 20, '#60542c', 1);
        areaChart(2, '#chart4', 10, '#461F58', 1);
        areaChart(3, '#chart4', 50, '#183168', 0.4);
        areaChart(4, '#chart5', 20, '#583F37', 1);
        areaChart(5, '#chart5', 30, '#1D4472', 0.3);
    });

    //Area Chart
    function areaChart(id, sel, xcount, color, opacity) {
        var chart = document.querySelector(sel);
        var w = chart.offsetWidth;
        var h = chart.offsetHeight;

        var width = w,
                height = h;

        var svg = d3.select(sel).append("svg")
                .attr("width", width)
                .attr("height", height)
                .attr("clip-path", "url(#svgclip)")
                .attr("filter", "url(#glow"+id+")");

        var defs = svg.append("defs");

        var clip = defs.append("clipPath")
                .attr("id", "svgclip");

        clip.append('rect')
                .attr("x",0)
                .attr("y",0)
                .attr("width","100%")
                .attr("height","100%");

        var filter = defs.append("filter")
                .attr("id", "glow"+id);


        filter.append("feMorphology")
                .attr("in", "SourceAlpha")
                .attr("operator", "dilate")
                .attr("radius", 1)
                .attr("result", "thicken");

        filter.append("feGaussianBlur")
                .attr("in", "thicken")
                .attr("stdDeviation", 3)
                .attr("result", "blurred");

        filter.append("feFlood")
                .attr("flood-color", color)
                .attr("result", "glowColor");

        filter.append("feComposite")
                .attr("in", "glowColor")
                .attr("in2", "blurred")
                .attr("operator", "in")
                .attr("result", "softGlow_colored");


        var feMerge = filter.append("feMerge");

        feMerge.append("feMergeNode")
                .attr("in", "softGlow_colored")
        feMerge.append("feMergeNode")
                .attr("in", "SourceGraphic");

        var data = [];
        for (var i = 0; i < xcount; i++) {
            data.push({x: i, y: randomInteger(1000, 3000) / 100});
        }

        var x = d3.scale.linear()
                .domain([0, d3.max(data, function (d) {
                    return d.x;
                })])
                .range([0, width]);

        var y = d3.scale.linear()
                .domain([0, d3.max(data, function (d) {
                    return d.y;
                })])
                .range([height, height / 2]);

        var area = d3.svg.area()
                .interpolate("linear")
                .x(function (d) {
                    return x(d.x);
                })
                .y0(height)
                .y1(function (d) {
                    return y(d.y);
                });

        var focus = svg.append("g")
                .attr("class", "focus");

        focus.append("path")
                .datum(data)
                .attr("class", "area")
                .attr("style", "fill:" + color + "; opacity:" + opacity)
                .attr("d", area);

        function redrawWithAnimation() {
            x.domain([i - xcount, d3.max(data, function (d) {
                return d.x;
            })])
                    .range([0, width]);

            y.domain([0, d3.max(data, function (d) {
                return d.y;
            })])
                    .range([height, height / 2]);

            svg.selectAll("path")
                    .datum(data)
                    .attr("d", area);

        }

        function randomInteger(min, max) {
            var rand = min + Math.random() * (max + 1 - min);
            rand = Math.floor(rand);
            return rand;
        }

        setInterval(function () {
            data.push({x: i, y: randomInteger(1000, 3000) / 100});
            i++;
            data.splice(0, 1);
            redrawWithAnimation();
        }, 500);
    }
    //Remove SVG
    function removeSvg() {

        [].forEach.call(document.querySelectorAll('.chart svg'),function(e){
            e.parentNode.removeChild(e);
        });

    }

    areaChart(1, '#chart3', 20, '#60542c', 1);
    areaChart(2, '#chart4', 10, '#461F58', 1);
    areaChart(3, '#chart4', 50, '#183168', 0.4);
    areaChart(4, '#chart5', 20, '#583F37', 1);
    areaChart(5, '#chart5', 30, '#1D4472', 0.3);