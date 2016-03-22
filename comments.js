module.exports = {
  name: "comments",
  ns: "instagram",
  description: "Get comments on a media",
  phrases: {
    active: "Fetching comments"
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
  fn: function comments(input, $, output, state, done, cb, on) {
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

      $.instagram.media.comments(opts);
    }.call(this);
    return {
      output: output,
      state: state,
      on: on,
      return: r
    };
  }
}