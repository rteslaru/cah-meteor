Cards = new Meteor.Collection('cards');
Games = new Meteor.Collection('games');

Meteor.methods({
    createGame: function(gameObject) {
        game = _.extend(
            _.pick(gameObject, 'description'), {
                'createdBy': Meteor.userId(),
                'number_of_players': 0,
                'name': 'CaH Meteor',
                'players': [],
                'blackCardId': null,
                'cardText': null,
            });
        Games.insert(game);
    },
    setBlackCard: function(gameId) {
        var game = Games.find({
            _id: gameId
        });
        var lastBlackCard = [game.blackCardId];

        var blackCards = Cards.find({
            type: 'black',
            _id: {
                $nin: lastBlackCard
            }
        });

        var rand = Math.floor(Math.random() * blackCards.count() + 1);
        var blackCard = blackCards.fetch()[rand];

        Games.update({
            _id: gameId
        }, {
            $set: {
                'blackCardId': blackCard._id,
                'blackCard': blackCard.cardText
            }
        });
    },
    joinGame: function(gameId) {

        var isCzar = true;
        var game = Games.findOne({
            _id: gameId
        });

        for (var i = 0; i < game.players.length; i++) {
            if (game.players[i].czar)
                isCzar = false;
        };

        if (isCzar)
            Meteor.call('setBlackCard', gameId);

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
                    'czar': isCzar,
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

                if (game.players[i].czar && game.players.length > 1) {
                    Games.update({
                        _id: gameId
                    }, {
                        $set: {
                            'players.0.czar': true
                        }
                    });
                }

                if (game.number_of_players === 1)
                    Games.remove({
                        _id: gameId
                    });
            }
        };

    },
    score: function(gameId, cardId) {
        Meteor.call('setBlackCard', gameId);
        var game = Games.findOne({
            _id: gameId
        });
        var winner = '';

        // very ugly and expensive

        for (var i = 0; i < game.players.length; i++) {
            Games.update({
                _id: gameId,
                'players.id': game.players[i].id
            }, {
                $set: {
                    'players.$.cards': [],
                    'players.$.czar': false,
                    'players.$.lastCardPlayed': null
                }
            });
            for (var j = 0; j < game.players[i].cards.length; j++) {
                if (game.players[i].cards[j]._id === cardId) {
                    winner = game.players[i].id;
                }
            };

        };

        Games.update({
            _id: gameId,
            'players.id': winner
        }, {
            $inc: {
                'players.$.score': 1
            },
            $set: {
                'players.$.czar': true
            }
        });

    },
    getCards: function(gameId) {
        var game = Games.findOne({
            _id: gameId
        });
        var allocatedCards = [];


        for (var i = 0; i < game.players.length; i++) {
            if (game.players[i].id === Meteor.userId()) {
                if (game.players[i].cards.length > 9) {
                    throw new Meteor.Error(500, 'Too many cards');
                }
            }

            if (!_.isUndefined(game.players[i].cards._id))
                allocatedCards.push(game.players[i].cards._id)

        };

        var whiteCards = Cards.find({
            type: 'white',
            id: {
                $nin: allocatedCards
            }
        });

        console.log(whiteCards.count());
        console.log(allocatedCards);

        var rand = Math.floor(Math.random() * whiteCards.count() + 1);

        var randomCard = whiteCards.fetch()[rand];

        Games.update({
            _id: gameId,
            'players.id': Meteor.userId()
        }, {
            $push: {
                'players.$.cards': {
                    '_id': randomCard._id,
                    'cardText': randomCard.cardText
                }
            }
        });
    },
    playCard: function(gameId, cardId) {
        var game = Games.findOne({
            _id: gameId
        });

        for (var i = 0; i < game.players.length; i++) {
            if (game.players[i].lastCardPlayed === cardId) {
                Games.update({
                    _id: gameId,
                    'players.id': Meteor.userId()
                }, {
                    $set: {
                        'players.$.lastCardPlayed': null
                    }
                });
            } else if (game.players[i].id === Meteor.userId()) {
                Games.update({
                    _id: gameId,
                    'players.id': Meteor.userId()
                }, {
                    $set: {
                        'players.$.lastCardPlayed': cardId
                    }
                })
            }
        };
    }
})