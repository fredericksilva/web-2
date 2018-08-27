$(function() {
  $('.username-search').select2({
    ajax: {
      url: '/api/v0.1/users_search/',
      dataType: 'json',
      delay: 250,
      data: function (params) {
        var query = {
          term: params.term,
        }
        return query;
      },
      processResults: function (data) {
        return {
          results: data,  
        };
      },
      cache: true
    },
    placeholder: 'Search by username',
    minimumInputLength: 3,
    escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
    templateResult: formatUser,
    templateSelection: formatUserSelection,
    // theme: "bootstrap4"
  });

  function formatUser (user) {
    if (user.loading) {
      return user.text;
    }
    var markup = `<div class="d-flex align-items-baseline">
                    <div class="mr-2">
                      <img class="rounded-circle" src="${user.avatar_url || static_url + 'v2/images/user-placeholder.png'}" width="40" height="40"/>
                    </div>
                    <div class="">${user.text}</div>
                  </div>`;
    
    return markup;
  }

  function formatUserSelection (user) {
    if (user.id) {
      var selected = `<img class="rounded-circle" src="${user.avatar_url || static_url + 'v2/images/user-placeholder.png'}" width="20" height="20"/> ${user.text}`;
    }
    return selected || user.text;
  }
});