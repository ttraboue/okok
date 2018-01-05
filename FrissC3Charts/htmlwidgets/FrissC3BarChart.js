HTMLWidgets.widget({

  name: 'FrissC3BarChart',

  type: 'output',

  initialize: function(el, width, height) {

    return {replace: false, width: width, height: height};

  },

  renderValue: function(el, x, instance) {

    var Data = x;

    console.log("FrissC3BarChart data");
    console.log(Data);

    if(typeof(instance.chart) == 'undefined'){

    var chart = c3.generate({
      bindto: '#' + el.id,
      size: {
        height: Data.height
      },
      padding: Data.padding,
      data: {
        columns: Data.columns,
      type: 'bar',
        //onclick: function (d, element) { console.log("onclick", d, element); },
        //onmouseover: function (d) { console.log("onmouseover", d); },
        //onmouseout: function (d) { console.log("onmouseout", d); }
      },
      grid: {
        x: {show: true},
        y: {show: true}
      },
      legend: {
        show: Data.legend_show,
        position: Data.legend_position
      },
      axis: {
	      rotated: Data.rotated,
        x: {
          type: 'category',
          categories: Data.categories
        },

         y : {
            tick: {
                format: function (d) { return d + Data.yUnit; }
            }
        }
      },
      bar: {
        width: {
          ratio: 0.5
        },
      },
      transition: {
        duration: 800
      }

    });

    instance.Data = Data;
    instance.chart = chart;

    }else{

        if(Data.columns !== undefined){
          instance.chart.load({
            columns:
              Data.columns
            ,
            unload: instance.chart.columns,
            categories: Data.categories
          });

        }
      }

    // Store chart instance in the div for later manipulation
    if(!$(el).data("instance"))
      $(el).data("instance",{chart: instance.chart});

  },

  resize: function(el, width, height, instance) {

  }

});
