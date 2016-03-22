module.exports = {
  name: "api",
  ns: "instagram",
  description: "Instagram API",
  phrases: {
    active: "Using instagram api"
  },
  ports: {
    input: {
      client_id: {
        title: "Client ID",
        type: "string",
        required: false
      },
      client_secret: {
        title: "Client Secret",
        type: "string",
        required: false
      }
    },
    output: {
      instagram: {
        title: "Instagram",
        type: "InstagramAPI"
      }
    }
  },
  dependencies: {
    npm: {
      "instagram-node-lib": require('instagram-node-lib')
    }
  },
  fn: function api(input, $, output, state, done, cb, on, instagram_node_lib) {
    var r = function() {
      if ($.client_id) instagram_node_lib.set('client_id', $.client_id);
      if ($.client_secret) instagram_node_lib.set('client_secret', $.client_secret);
      output.instagram = $.create(instagram_node_lib);
    }.call(this);
    return {
      output: output,
      state: state,
      on: on,
      return: r
    };
  }
}