// import utils from './utils.js'

// let CLIENT_ID = "515563093963-1omo7q3tsigg54mqvoqeoqpcsa8v6p7p.apps.googleusercontent.com"
// let REDIRECT_URI = "http://127.0.0.1:5500/profile.html"
// let SCOPES = "https://www.mail.google.com"

// let button = document.getElementById('button')

// button.addEventListener('click',signIn)

// function signIn(){

//     utils.signIn(CLIENT_ID,REDIRECT_URI,SCOPES)
// }

function signin(){
    // Google's OAuth 2.0 endpoint for requesting an access token
  var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

  // Create <form> element to submit parameters to OAuth 2.0 endpoint.
  var form = document.createElement('form');
  form.setAttribute('method', 'GET'); // Send as a GET request.
  form.setAttribute('action', oauth2Endpoint);

  // Parameters to pass to OAuth 2.0 endpoint.
  var params = {'client_id': '515563093963-lfvh4o9hlta70pu4bbhctosej3f1f1td.apps.googleusercontent.com',
                'redirect_uri': 'http://127.0.0.1:5500/profile.html',
                'response_type': 'token',
                'scope':'https://www.googleapis.com/auth/userinfo.profile https://mail.google.com/ https://www.googleapis.com/auth/gmail.labels https://www.googleapis.com/auth/gmail.modify',
                'include_granted_scopes': 'true',
                'state': 'pass-through value'};

  // Add form parameters as hidden input values.
  for (var p in params) {
    var input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', p);
    input.setAttribute('value', params[p]);
    form.appendChild(input);
  }

  // Add form to page and submit it to open the OAuth 2.0 endpoint.
  document.body.appendChild(form);
  form.submit();
}
