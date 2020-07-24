
const BASE_URL = 'https://thinkful-list-api.herokuapp.com';
let name = 'sasha';



function listApiFetch(...args) {

  console.log('fetch arguments', ...args);
  let error = '';
  return fetch(...args)
    .then(res => {
      if (!res.ok) {
        // Valid HTTP response but non-2xx status - let's create an error!
        error = { code: res.status };
      }

      // In either case, parse the JSON stream:
      return res.json();
    }).then(data => {
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }

      // Otherwise give back the data as resolved Promise
      return data;
    });
}




$('#form').submit(function (evt) {
  evt.preventDefault();
  let item = $('#item').val();
  console.log(item);
  let requestUrl = `${BASE_URL}/${name}/items`;
  console.log('Request URL', requestUrl);
  let params = JSON.stringify({ 'name': item })
  //Using the listAPIFetch function to do a POST request
  listApiFetch(requestUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: params })
    .then(resp => console.log('final response', resp))
})

$('#view').click(function (evt) {

  //let item = $("#item").val();
  let requestUrl = `${BASE_URL}/sasha/items`;

  //Using the listAPIFetch function to do a GET request
  listApiFetch(requestUrl)
    .then(resp => $('.data').html(JSON.stringify(resp)))
})
