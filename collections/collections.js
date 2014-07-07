Cards = new Meteor.Collection('cards');
Games = new Meteor.Collection('games');


Meteor.methods({
    createGame: function(gameObject) {
        game = _.extend(
            _.pick(gameObject, 'description'), {
                'createdBy': Meteor.userId(),
                'number_of_players': 0,
                'name': 'CaH Meteor',
                'players': []
            });
        Games.insert(game);
    },
    joinGame: function(gameId) {
        Games.update({
            _id: gameId
        }, {
            $inc: {
                'number_of_players': 1
            },
            $push: {
                'players': {
                    'id': Meteor.userId(),
                    'score': 0,
                    'czar': false,
                    'username': Meteor.user().username,
                    'lastCardPlayed': null,
                    'playedThisRound': false,
                    'cards': []
                },
            },
        });
    },
    leaveGame: function(gameId) {
        var game = Games.findOne({
            _id: gameId
        });

        for (var i = 0; i < game.players.length; i++) {
            if (game.players[i].id === Meteor.userId()) {
                var selector = 'players.' + i + '.id';
                Games.update({
                    _id: gameId,
                    'players.id': Meteor.userId()
                }, {
                    $pull: {
                        'players': {
                            'id': Meteor.userId()
                        }
                    },
                    $inc: {
                        'number_of_players': -1
                    }
                });
            }
        };

    },
    startRound: function() {},
    endRound: function() {},
    getCards: function(gameId) {
        var game = Games.findOne({
            _id: gameId
        });

        for (var i = 0; i < game.players.length; i++) {
            if (game.players[i].id === Meteor.userId()) {
                if (game.players[i].cards.length > 9) {
                    throw new Meteor.Error(500, 'Too many cards');
                }
            }
        };


        Games.update({
            _id: gameId,
            'players.id': Meteor.userId()
        }, {
            $push: {
                'players.$.cards': {
                    'description': 'a'
                }
            }
        });
    }
})