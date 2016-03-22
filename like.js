module.exports = {
  name: "like",
  ns: "instagram",
  description: "Like a media item",
  phrases: {
    active: "Liking media"
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
          media_id: {
            title: "Media ID",
            type: "number",
            required: true
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
        type: "array"
      },
      pagination: {
        title: "Pagination",
        type: "object"
      }
    }
  },
  fn: function like(input, $, output, state, done, cb, on) {
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

      $.instagram.media.like(opts);
    }.call(this);
    return {
      output: output,
      state: state,
      on: on,
      return: r
    };
  }
}