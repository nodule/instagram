output = function(cb) {
  $.instagram.tags.info({
    name: $.tag,
    complete: function(val, pagination) {
      cb({ out: $.create(val), pagination: $.create(pagination) });
      done();
    },
    error: function(err) {
      cb({ error: $.create(err) });
    }
  });
};
