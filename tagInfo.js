module.exports = {
  name: "tagInfo",
  ns: "instagram",
  description: "Instagram Tag Info",
  phrases: {
    active: "Fetching tag information"
  },
  ports: {
    input: {
      instagram: {
        title: "InstagramID",
        type: "InstagramAPI",
        required: true
      },
      tag: {
        title: "Tag",
        type: "string",
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
  fn: function tagInfo(input, $, output, state, done, cb, on) {
    var r = function() {
      $.instagram.tags.info({
        name: $.tag,
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