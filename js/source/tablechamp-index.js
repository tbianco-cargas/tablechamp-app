(function($){
  $(window).load(function(){
    initConnectionSettings();
  });
  function initConnectionSettings() {
    // Show login form
    $('.login').html(tmpl('loginForm', {
      "email" : i18n.index.loginForm.email,
      "password" : i18n.index.loginForm.password,
      "button" : i18n.index.loginForm.button,
      "signup": i18n.index.loginForm.signup
    })).show();
    // Load settings
    loadFirebaseSettings(cs);
  }
  // Init login
  function init() {
    try {
      initLoginForm();
    }
    catch(err) {
      console.log(err);
    }
  }
  function initLoginForm() {
    var auth = firebase.auth(),
        database = firebase.database();
    // Login
    $('button[name="login"]').on('click', function(event,data) {
      // Grab values
      var email = $('input[name="email"]').val(),
        password = $('input[name="password"]').val();
      // Submit
      auth.signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        $('.errors').text(errorMessage).addClass('show');
      });
      
      return false;
    });

    $('button[name="signup"]').on('click', function(event,data) {
      // Grab values
      var email = $('input[name="email"]').val(),
        password = $('input[name="password"]').val();
      // Submit
      auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        $('.errors').text(errorMessage).addClass('show');
      });
      
      return false;
    });

    $('button[name="anonymous"]').on('click', function(event,data) {
      // Grab values
      var email = $('input[name="email"]').val(),
        password = $('input[name="password"]').val();
      // Submit
      auth.signInAnonymously().catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        $('.errors').text(errorMessage).addClass('show');
      });
      
      return false;
    });

    // Auth Observer
    auth.onAuthStateChanged(function(user) {
      if (user) {
        window.location = "./app.html";
      }
    });
  }
  function loadFirebaseSettings(cs) {
    if (typeof firebase !== 'undefined') {
      var config = {
        apiKey: cs.apiKey,
        authDomain: cs.authDomain,
        databaseURL: cs.databaseURL
      };
      firebase.initializeApp(config);
      init();
    }
  }
})(jQuery);