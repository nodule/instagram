module.exports = {
  name: "unlike",
  ns: "instagram",
  description: "Unlike a media item",
  phrases: {
    active: "Unliking media"
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
  fn: function unlike(input, output, state, done, cb, on) {
    var r = function() {
      var opts = input.options;

      opts.complete = function(data, pagination) {
        output({
          out: data,
          pagination: pagination
        });
        done();
      };

      opts.error = function(err) {
        output({
          error: err
        });
      };

      input.instagram.media.unlike(opts);
    }.call(this);
    return {
      output: output,
      state: state,
      on: on,
      return: r
    };
  }
}