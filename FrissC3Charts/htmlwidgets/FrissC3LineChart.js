HTMLWidgets.widget({

  name: 'FrissC3LineChart',

  type: 'output',

  initialize: function(el, width, height) {

    return {replace: false, width: width, height: height};

  },

  renderValue: function(el, x, instance) {

    console.log("Rendering chart");

    var Data = x;

    if(typeof(instance.chart) == 'undefined'){
    instance.Data = Data;

    var chart = c3.generate({
        bindto: '#' + el.id,
        data: {
            x: 'timeData',
            columns:
              Data.data.columns,
            axes:
              Data.data.axes,
        },
            axis:
              Data.axis,
            color:
              Data.color,
            subchart:{
              show: Data.subchart.show,
              // Only trigger oninputchange when component is run from shiny
              onbrush : debounce(function (domain) {if(typeof Shiny !== 'undefined' && typeof(Shiny.onInputChange) == 'function')
                            {Shiny.onInputChange(el.id, domain)}},Data.debounce)
            },
            transition: {
              duration: Data.transition
            },
            size:
              {height: Data.height}
        });

        instance.chart = chart;
      }else{

        if(Data.data.columns !== undefined){
          instance.chart.load({
            columns:
              Data.data.columns
            ,
            unload: instance.chart.columns,
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
