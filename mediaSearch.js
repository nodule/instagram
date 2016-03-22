module.exports = {
  name: "mediaSearch",
  ns: "instagram",
  description: "With a latitude and longitude find nearby media by geography.",
  phrases: {
    active: "Fetching media"
  },
  ports: {
    input: {
      instagram: {
        title: "InstagramID",
        type: "InstagramAPI",
        required: true
      },
      options: {
        type: "object",
        title: "options",
        required: true,
        properties: {
          lat: {
            title: "Latitude",
            type: "number",
            required: true
          },
          lng: {
            title: "Longitude",
            type: "number",
            required: true
          },
          distance: {
            title: "Distance",
            type: "number",
            "default": null
          }
        }
      }
    },
    output: {
      error: {
        title: "Error",
        type: "object"
      },
      out: {
        title: "Data",
        type: "object"
      },
      pagination: {
        title: "Pagination",
        type: "object"
      }
    }
  },
  fn: function mediaSearch(input, $, output, state, done, cb, on) {
    var r = function() {
      var opts = $.options;

      opts.complete = function(val, pagination) {
        output({
          out: $.create(val),
          pagination: $.create(pagination)
        });
        done();
      };

      opts.error = function(err) {
        output({
          error: $.create(err)
        });
      };

      $.instagram.media.info(opts);
    }.call(this);
    return {
      output: output,
      state: state,
      on: on,
      return: r
    };
  }
}