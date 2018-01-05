HTMLWidgets.widget({

  name: 'FrissC3LineBarChart',

  type: 'output',

  // initialization
  initialize: function(el, width, height) {
      return{replace: false, width: width, height: height};
  },

  // this part will be called each time we send an update
  renderValue: function(el, x, instance) {
       var Data = x;

    if(typeof(instance.chart) != 'undefined'){
      instance.chart.destroy();
    }
      instance.Data = Data;

      var chart = c3.generate({
        bindto: '#' + el.id,
        data: {
          x : Data.data.x,
          columns:
            Data.data.columns,
          axes:
            Data.data.axes
          ,
          types:
            Data.types
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
    //}

    // Store chart instance in the div for later manipulation
    if(!$(el).data("instance"))
      $(el).data("instance",{chart: instance.chart});

  },

  // this part will be called each time we resize the containing div element
  resize: function(el, width, height, instance) {

  }

});
