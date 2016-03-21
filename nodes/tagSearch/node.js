output = function(cb) {
  $.instagram.tags.search({
    q: $.tag,
    complete: function(val, pagination) {
      cb({ out: val, pagination: pagination });
      done();
    },
    error: function(err) {
      cb({ error: err });
    }
  });
};
