let tokenClient;
let gapiInited;
let gisInited;

// document.getElementById("submit").style.visibility="hidden";


function checkBeforeStart() {
   if (gapiInited && gisInited){
      // Start only when both gapi and gis are initialized.
      document.getElementById("submit").style.visibility="visible";
      //document.getElementById("revokeBtn").style.visibility="visible";
   }
}

function gapiInit() {
  gapi.client.init({
    // NOTE: OAuth2 'scope' and 'client_id' parameters have moved to initTokenClient().
  })
  .then(function() {  // Load the Calendar API discovery document.
    gapi.client.load('https://gmail.googleapis.com/$discovery/rest?version=v1');
    gapiInited = true;
    checkBeforeStart();
  });
}

function gapiLoad() {
    gapi.load('client', gapiInit)
}

function gisInit() {
 tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: '515563093963-lfvh4o9hlta70pu4bbhctosej3f1f1td.apps.googleusercontent.com',
            scope: 'https://www.googleapis.com/auth/gmail.settings.basic https://mail.google.com/ https://www.googleapis.com/auth/gmail.labels https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.readonly',
            callback: '',  // defined at request time
        });
  gisInited = true;
  checkBeforeStart();
}

function submit() {

  tokenClient.callback = (resp) => {
    if (resp.error !== undefined) {
      throw(resp);
    }
    // GIS has automatically updated gapi.client with the newly issued access token.
    console.log('gapi.client access token: ' + JSON.stringify(gapi.client.getToken()));
        var labelName = document.getElementById("labelName").value ;
        var wordArray = document.getElementById("word").value.split(",");
       gapi.client.gmail.users.labels.create({
           "userId": "me",
           "resource": {
             "labelListVisibility": "labelShow",
             "messageListVisibility": "show",
             "name": labelName
           }
         })
            .then(function() {
                    // Handle the results here (response.result has the parsed body).
                     gapi.client.gmail.users.labels.list({
                       "userId": "me"
                     })
                         .then(function(response) {
                            for(let i=0;i<response.result.labels.length;i++){
                                if(response.result.labels[i].name==labelName){var labelId=(response.result.labels[i].id);}
                              }
                              for(let i=0;i<wordArray.length;i++){

                                console.log(wordArray[i],wordArray.length);
                                gapi.client.gmail.users.settings.filters.create({
                                    "userId": "me",
                                    "resource": {
                                      "action": {
                                        "addLabelIds": [
                                            labelId
                                        ]
                                      },
                                      "criteria": {
                                        "query": wordArray[i]
                                      }
                                    }
                                  }).then(function() {
                                    // Handle the results here (response.result has the parsed body).
                                    console.log("sumcess");
                                    
                                },
                                function(err) { console.error("Execute error", err); });
                            }
                            document.getElementById("labelName").value="";
                            document.getElementById("word").value="";
                              },
                              function(err) { console.error("Execute error", err); });
                     
                   },
                  function(err) { console.error("Execute error", err); });
                

    
  }

  

  // Conditionally ask users to select the Google Account they'd like to use,
  // and explicitly obtain their consent to fetch their Gmail.
  // NOTE: To request an access token a user gesture is necessary.
  if (gapi.client.getToken() === null) {
    // Prompt the user to select a Google Account and asked for consent to share their data
    // when establishing a new session.
    tokenClient.requestAccessToken({prompt: 'consent'});
  } else {
    // Skip display of account chooser and consent dialog for an existing session.
    tokenClient.requestAccessToken({prompt: ''});
  }
  
}
function update() {

    tokenClient.callback = (resp) => {
      if (resp.error !== undefined) {
        throw(resp);
      }
      // GIS has automatically updated gapi.client with the newly issued access token.
      console.log('gapi.client access token: ' + JSON.stringify(gapi.client.getToken()));
          var oldLabelName = document.getElementById("oldLabelName").value ;
          var wordArray = document.getElementById("newWord").value.split(",");
          gapi.client.gmail.users.labels.list({
            "userId": "me"
          })
              .then(function(response) {
                 for(let i=0;i<response.result.labels.length;i++){
                     if(response.result.labels[i].name.toLowerCase()==oldLabelName.toLowerCase()){
                        console.log(response.result.labels[i].name);
                        var labelId=(response.result.labels[i].id);}
                   }
                   for(let i=0;i<wordArray.length;i++){

                     console.log(wordArray[i],wordArray.length);
                     gapi.client.gmail.users.settings.filters.create({
                         "userId": "me",
                         "resource": {
                           "action": {
                             "addLabelIds": [
                                 labelId
                             ]
                           },
                           "criteria": {
                             "query": wordArray[i]
                           }
                         }
                       }).then(function() {
                         // Handle the results here (response.result has the parsed body).
                         console.log("sumcess");
                         
                     },
                     function(err) { console.error("Execute error", err); });
                 }
                 document.getElementById("oldLabelName").value="";
                 document.getElementById("newWord").value="";
                   },
                   function(err) { console.error("Execute error", err); });
                  
  
      
    }
  
    
  
    // Conditionally ask users to select the Google Account they'd like to use,
    // and explicitly obtain their consent to fetch their Gmail.
    // NOTE: To request an access token a user gesture is necessary.
    if (gapi.client.getToken() === null) {
      // Prompt the user to select a Google Account and asked for consent to share their data
      // when establishing a new session.
      tokenClient.requestAccessToken({prompt: 'consent'});
    } else {
      // Skip display of account chooser and consent dialog for an existing session.
      tokenClient.requestAccessToken({prompt: ''});
    }
    
  }
//following snippet will be useful while logging out.
function revokeToken() {
    
  let cred = gapi.client.getToken();
  if (cred !== null) {
    google.accounts.oauth2.revoke(cred.access_token, () => {console.log('Revoked: ' + cred.access_token)});
    gapi.client.setToken('');
    document.getElementById("submit").innerText = "Show Calendar";
  }
}