//  ********************  FUNZIONI  ***************************  //

// Funzione che effettua una chiamata ajax ad un API e stampa i risultati tramite l'invocazione di un'altra Funzione
// Argomenti
//          ==>
//              apiRequest: indica l'URL dell'API sottoforma di stringa
//              apiKey: indica la chiave di autorizzazione per usare l'API sottoforma di stringa
//              userInput: indica la query da ricercare ( valore inserito dall'utente )
//              language: indica la lingua preferita per la ricerca
// Non ha nessun return
function ajaxCall(apiRequest, apiKey, userInput, language) {
  $.ajax(
    {
      url: apiRequest,
      method: 'GET',
      data: {
        api_key: apiKey,
        language: language,
        query: userInput
      },
      success: function(dataResponse) {
        var results = dataResponse.results;
        printList(results);
      },
      error: function(request, state, errors) {
        alert('Si è verificato un problema. Errore ' + errors);
      }
    }
  );
}

// Funzione che stampa n volte i singoli risultati contenuti in un array passato come argomento
// Argomenti
//          ==>
//             results: indica l'array contenente tutti i risultati
// Non ha nessun return
function printList(results) {
  var source = $("#movies-template").html();
  var template = Handlebars.compile(source);
  for (var i = 0; i < results.length; i++) {
    var singleMovie = {
      title: results[i].title,
      originalTitle: results[i].original_title,
      language: results[i].original_language,
      vote: results[i].vote_average
    }
    var html = template(singleMovie);
    $('.moviesList').append(html);
  }
}
