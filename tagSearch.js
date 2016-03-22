module.exports = {
  name: "tagSearch",
  ns: "instagram",
  description: "Search for matching tags by name",
  phrases: {
    active: "Searching tags like {{input.tag}}"
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
  fn: function tagSearch(input, $, output, state, done, cb, on) {
    var r = function() {
      $.instagram.tags.search({
        q: $.tag,
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