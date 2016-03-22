module.exports = {
  name: "mediaPopular",
  ns: "instagram",
  description: "Get a set of 32 current popular media, each with it's associated likes and comments.",
  phrases: {
    active: "Fetching popular media"
  },
  ports: {
    input: {
      instagram: {
        title: "InstagramID",
        type: "InstagramAPI",
        required: true
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
  fn: function mediaPopular(input, $, output, state, done, cb, on) {
    var r = function() {
      $.instagram.media.popular({
        complete: function(val, pagination) {
          output({
            out: $.create(val),
            pagination: $.create(pagination)
          });
          done();
        },
        error: function(err) {
          output({
            error: $.create(err)
          });
        }
      });
    }.call(this);
    return {
      output: output,
      state: state,
      on: on,
      return: r
    };
  }
}