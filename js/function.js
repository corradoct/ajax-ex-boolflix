//  ********************  FUNZIONI  ***************************  //

// Funzione che effettua una chiamata ajax ad un API e stampa i risultati tramite l'invocazione di un'altra Funzione
// Argomenti
//          ==>
//              userInput: indica la query da ricercare ( valore inserito dall'utente )
// Non ha nessun return
function ajaxCall(userInput) {
  // Creo le variabili per la chiamata ajax
  var apiRequest = 'https://api.themoviedb.org/3/search/movie';
  var apiKey = '0e5a6d3ef990d9d6758cc872b21ab676';
  var language = 'it-IT';

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
        console.log(results);
        if (results.length > 0) {
          printList(results);
        } else {
          var message = 'La tua ricerca non ha prodotto risultati';
          printMessage(message);
        }

      },
      error: function(request, state, errors) {
        var message = 'Si è verificato un problema con la connessione al database';
        printMessage(message);
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

// Funzione che stampa gli eventuali messaggi di errore
// Non ritorna nulla
function printMessage(message) {
  var source = $("#message-template").html();
  var template = Handlebars.compile(source);
  var message = {message};
  var html = template(message);
  $('.messageWrapper').append(html);
}

// Funzione che serve a resettare la lista dei film e i messaggi di errore
// Non ritorna nulla
function reset() {
  $('.messageWrapper').html('');
  $('.moviesList').html('');
}
