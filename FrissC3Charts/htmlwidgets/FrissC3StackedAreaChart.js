HTMLWidgets.widget({

  name: 'FrissC3StackedAreaChart',

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

       var chart = c3.generate({
        bindto: '#' + el.id,
        data: {
          x : Data.data.x,
          columns:
            Data.data.columns,
          types:
            Data.types,
          groups: [Data.groups],
        },
        axis:
          Data.axis,
        color:
          Data.color,
        size:
          {height: Data.height},
         point:
          {show: false},
         transition: {
            duration: x.transition
         }
      });

      instance.chart = chart;

      /*}else{

      instance.chart.unload();

      // Get names of current and new series to put in the chart
      var curKeys = _.keys(instance.chart.groups()[0]);
      var newKeys = _.keys(Data.data.columns);

      // Determine the keys that are in the current chart but not in the new data
      // This difference should be unloaded
      diff = _.difference(curKeys,newKeys);

      instance.chart.load({
        columns:
          Data.data.columns
        //,
        //unload: diff,
      });

      }*/

      // Store chart instance in the div for later manipulation
      if(!$(el).data("instance"))
        $(el).data("instance",{chart: instance.chart});
  },

  // this part will be called each time we resize the containing div element
  resize: function(el, width, height, instance) {

  }

});
