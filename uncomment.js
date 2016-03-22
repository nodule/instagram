module.exports = {
  name: "uncomment",
  ns: "instagram",
  description: "Remove a comment on a media item",
  phrases: {
    active: "Removing comment"
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
          },
          comment_id: {
            title: "Comment ID",
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
        type: "object"
      },
      pagination: {
        title: "Pagination",
        type: "object"
      }
    }
  },
  fn: function uncomment(input, $, output, state, done, cb, on) {
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

      $.instagram.media.uncomment(opts);
    }.call(this);
    return {
      output: output,
      state: state,
      on: on,
      return: r
    };
  }
}