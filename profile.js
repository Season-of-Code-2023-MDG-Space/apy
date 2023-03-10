// import utils from "./utils.js"

// let params =utils.getParamsFromURL(location.href);
// let ACCESS_TOKEN = "ya29.a0AVvZVsq-CBzDV1dOEV8rD-VYQWOwhjeYHH5v8TS2zWFzw5wbizO4T8O429xLtMlDLGSsNvHQnhIZ-AC_fVWbOm3zH-eVl8GoeA_xcaDUKL3_yYYP8PH0U6hrvB6YNCCPjHSZ5ov7NKEof6ufV9E06wRlUopeaCgYKAWsSARISFQGbdwaIjAFKZzcpiPEaEces5e7qbQ0163";
// let redirect_url = "http://127.0.0.1:5500/profile.html";

 

// Parse query string to see if page request is coming from OAuth 2.0 server.
var params = {};
var regex = /([^&=]+)=([^&]*)/g, m;
while (m = regex.exec(location.href)) {
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
}
if (Object.keys(params).length > 0) {
    localStorage.setItem('authInfo', JSON.stringify(params));
}
window.history.pushState({}, document.title, "/" + "profile.html");
let info = JSON.parse(localStorage.getItem('authInfo'))
console.log(info['access_token'])
console.log(info['expires_in'])
fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: {
        "Authorization": `Bearer ${info['access_token']}`
    }
})
    .then(data => data.json())
    .then((info) => {
        console.log(info)
        document.getElementById('name').innerHTML += info.name
        // document.getElementById('image').setAttribute('src',info.picture)
    })
// function authenticate() {
//         return gapi.auth2.getAuthInstance()
//             .signIn({scope: "https://mail.google.com/ https://www.googleapis.com/auth/gmail.labels https://www.googleapis.com/auth/gmail.modify"})
//             .then(function() { console.log("Sign-in successful"); },
//                   function(err) { console.error("Error signing in", err); });
//       }
// function loadClient() {
//         gapi.client.setApiKey("AIzaSyAHPuqC8jQ_C_P-CiILaVN-cKscFV1op9A");
//         return gapi.client.load("https://gmail.googleapis.com/$discovery/rest?version=v1")
//             .then(function() { 
//                 gapi.auth2.init();
//                 console.log("GAPI client loaded for API"); },
//                   function(err) {console.error("Error loading GAPI client for API", err); });
//       }
// function execute() {
//     var labelName= document.getElementById("labelName").value;
//     console.log(labelName);
//         return gapi.client.gmail.users.labels.create({
//           "userId": "me",
//           "resource": {
//             "labelListVisibility": "labelShow",
//             "messageListVisibility": "show",
//             "name": labelName
//           }
//         })
//             .then(function(response) {
//                     // Handle the results here (response.result has the parsed body).
//                     console.log("Response", response);
//                   },
//                   function(err) { console.error("Execute error", err); });
//       }
//       gapi.load("client:auth2", function() {
//         gapi.auth2.init({client_id: "515563093963-1omo7q3tsigg54mqvoqeoqpcsa8v6p7p.apps.googleusercontent.com"});
//       });
// function logout() {
//     fetch("https://oauth2.googleapis.com/revoke?token=" + info['access_token'],
//         {
//             method: 'POST',
//             headers: {
//                 "Content-type": "application/x-www-form-urlencoded"
//             }
//         })
//         .then((data) => {
//             location.href = "http://127.0.0.1:5500/index.html"
//         })
// }