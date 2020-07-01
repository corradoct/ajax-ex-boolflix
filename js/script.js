$(document).ready(
  function() {
    // Creo l'evento al click del bottone
    $('#search').on('click',
      function() {
        // Creo le variabili per la chiamata ajax
        var apiRequest = 'https://api.themoviedb.org/3/search/movie';
        var apiKey = '0e5a6d3ef990d9d6758cc872b21ab676';
        var userInput = $('#searchBar').val();
        var language = 'it-IT';

        // Resetto la lista se eventualmente ci sono già risultati
        $('.moviesList').html('');

        // Se la barra di ricerca ha un valore avvio la chiamata ajax
        if (userInput !== '') {
          // Invoco la funzione per la chiamata ajax e gli passo le variabili per la richiesta
          ajaxCall(apiRequest, apiKey, userInput, language);
        } else {  // Altrimenti do un messaggio di errore
          alert('Non hai inserito il titolo');
        }
      }
    );

    // Creo l'evento alla pressione del tasto invio
    $('#searchBar').keypress(
      function(event) {
        if (event.which === 13) {
          // Creo le variabili per la chiamata ajax
          var apiRequest = 'https://api.themoviedb.org/3/search/movie';
          var apiKey = '0e5a6d3ef990d9d6758cc872b21ab676';
          var userInput = $('#searchBar').val();
          var language = 'it-IT';

          // Resetto la lista se eventualmente ci sono già risultati
          $('.moviesList').html('');

          // Se la barra di ricerca ha un valore avvio la chiamata ajax
          if (userInput !== '') {
            // Invoco la funzione per la chiamata ajax e gli passo le variabili per la richiesta
            ajaxCall(apiRequest, apiKey, userInput, language);
          } else {  // Altrimenti do un messaggio di errore
            alert('Non hai inserito il titolo');
          }
        }
      }
    );
  }
);
