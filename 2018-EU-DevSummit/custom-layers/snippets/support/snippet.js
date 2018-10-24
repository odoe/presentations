function create(tag, attr) {
  var elem = document.createElement(tag);

  for (var k in attr) {
    elem[k] = attr[k];
  }

  return elem;
}

document.head.appendChild(create("link", {
  rel: "stylesheet",
  href: "//js.arcgis.com/4.7/esri/css/main.css"
}));

document.head.appendChild(create("link", {
  rel: "stylesheet",
  href: "./support/style.css"
}));

document.head.appendChild(create("script", {
  src: "//js.arcgis.com/4.7/"
}));

(function(snippet, settings) {

  window.addEventListener("load", function() {
    require(["esri/Map", "esri/views/MapView", "dojo/domReady!"], function(Map, MapView) {

      var containers = {};

      // provide default functionality
      // (to be redefined according to settings)
      var interlinks = {
        log: function() { console.log(Array.prototype.join.call(arguments, " ")); },
        playButton: function() {},
        overviewMap: {},
      };

      if (!settings.disableViewDiv) {
        containers.viewDiv = create("div", {
          id: "viewDiv"
        });

        if (!settings.disableLog) {
          containers.log = create("div", {
            id: "viewLog"
          });
          containers.viewDiv.appendChild(containers.log);

          interlinks.log = function() {
            containers.log.textContent = Array.prototype.join.call(arguments, " ");
          };
        }

        if (!settings.disableOverviewMap) {
          containers.overviewMap = create("div", {
            id: "overviewDiv"
          });
          containers.viewDiv.appendChild(containers.overviewMap);
        }

        document.body.appendChild(containers.viewDiv);
      }

      snippet(containers, interlinks);

      window.addEventListener("message", function(m) {
        if (m.data && m.data.play) {
          interlinks.playButton();
        }
      }, false);

      if (!settings.disableOverviewMap) {
        var mapView = new MapView({
          map: new Map({
            basemap: "streets"
          }),

          container: containers.overviewMap,

          ui: {
            components: []
          }
        });

        mapView.then(function() {
          mapView.constraints.snapToZoom = false;
        });

        interlinks.overviewMap = mapView;
      }
    });
  });
})(window.snippet, window.settings || {});
