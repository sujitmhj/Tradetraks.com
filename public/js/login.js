    //adding users
    var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
    

    app.configure(function() {
        app.use(express.static('public'));
        app.use(express.cookieParser());
        app.use(express.bodyParser());
        app.use(express.session({ secret: 'keyboard cat' }));
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(app.router);
      });

      var session = require("express-session"),
      bodyParser = require("body-parser");
         app.use(express.static("public"));
         app.use(session({ secret: "cats" }));
         app.use(bodyParser.urlencoded({ extended: false }));
         app.use(passport.initialize());
         app.use(passport.session());


    passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
    ));
    
    app.post('/login',
    passport.authenticate('local', { successRedirect: '/',
                                     failureRedirect: '/home.tml',
                                     failureFlash: true })
    );
    
    passport.authenticate('local', { failureFlash: 'Invalid username or password.' });
    passport.authenticate('local', { successFlash: 'Welcome!' });
