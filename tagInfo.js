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
  fn: function tagInfo(input, output, state, done, cb, on) {
    var r = function() {
      input.instagram.tags.info({
        name: input.tag,
        complete: function(data, pagination) {
          output({
            out: data,
            pagination: pagination
          });
          done();
        },
        error: function(err) {
          output({
            error: err
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