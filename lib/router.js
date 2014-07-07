Router.configure({
    layoutTemplate: 'layout'
});


Router.map(function() {
    this.route('home', {
        path: '/',
        yieldTemplates: {
            'mainMenu': {
                to: 'menu'
            }
        }
    });
    this.route('createGame', {
        path: '/new',
        yieldTemplates: {
            'mainMenu': {
                to: 'menu'
            }
        }
    });
    this.route('game', {
        yieldTemplates: {
            'mainMenu': {
                to: 'menu'
            }
        },
        path: '/game/:_id',
        onBeforeAction: function(pause) {
            if (!this.ready()) {
                this.render('loading');
                pause(); // otherwise the action will just render the main template.

            }
        },
        data: function() {
            return Games.findOne({
                _id: this.params._id
            });
        },
        waitOn: function() {
            return Meteor.subscribe('games')
        }
    });
});