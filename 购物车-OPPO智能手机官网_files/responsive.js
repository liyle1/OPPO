
// utils

function throttle(fn, millis) {
  var last = 0;
  return function() {
    var now = (new Date()).getTime();
    if ((now - last) > millis) {
      last = now;
      return fn.apply(this, arguments);
    }
  };
}

// plugin

(function ($) {

  var sensor;
  var objects = [];
  var states = {
    0: "mobile",
    1: "desktop"
  };

  function getResponsiveState() {
    if (!sensor) { return; }
    var state = parseInt($(sensor).css("margin-left"),10) || 0;
    return states[state];
  }

  function executeRelocation() {
    var state = getResponsiveState();
    $.each(objects, function(i, data) {
      if (data.currentState != state) {
        data.target.detach();
        $(data.options[state]).append(data.target);
        data.currentState = state;
      }
    });
  }

  $.fn.relocate = function(options) {
    objects.push({target: this, options: options});
    return this;
  };

  $.relocateStart = function(n) {
    sensor = document.createElement("div");
    sensor.className = "js-sensor";
    document.body.appendChild(sensor);
    $(window).on("resize", throttle(executeRelocation, 100));
    // data-* facade
    $("[data-mobile]").each(function(i, el) {
      var $el = $(el),
          stateName,
          options = {};
      for (var k in states) {
        stateName = states[k];
        options[stateName] = $el.attr("data-" + stateName);
      }
      $el.relocate(options);
    });
    // first run
    setTimeout(executeRelocation, n || 0);
  };

}(jQuery));

// EJEMPLO DE USO

$(function() {
  $.relocateStart(100);
});