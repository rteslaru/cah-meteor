Template.game.events({
    'click #join': function(e, tpl) {
        Meteor.call('joinGame', tpl.data._id)
    },
    'click #leave': function(e, tpl) {
        Meteor.call('leaveGame', tpl.data._id);
    },
    'click #cards': function(e, tpl) {
        Meteor.call('getCards', tpl.data._id, function(err, result) {
            if (err)
                alert(err)
        });
    }
})


Template.card.events({
    'click .item': function(e, tpl) {

        var gameId = $(tpl.firstNode).data('gameId');
        var cardId = tpl.data._id;
        var game = Games.findOne({_id: gameId});
        var isCzar = false;

        $('.item .label').removeClass('green');
        $(tpl.firstNode.getElementsByClassName('label')).addClass('green');

        for (var i = 0; i < game.players.length; i++) {
            if (game.players[i].id === Meteor.userId())
                isCzar = game.players[i].czar;
        };

        if (isCzar) {
            console.log(cardId);
            Meteor.call('score', gameId, cardId);
        } else {
            Meteor.call('playCard', gameId, cardId);
        }
    }
})

Template.game.joined = function() {
    var userCount = Games.find({
        _id: this._id,
        'players.id': Meteor.userId()
    }).count();

    return userCount > 0
};

Template.game.myCards = function() {
    var game = Games.findOne({
        _id: this._id
    });

    for (var i = 0; i < game.players.length; i++) {
        if (game.players[i].id === Meteor.userId())
            return game.players[i].cards
    };
};

Template.game.isCzar = function() {
    var game = Games.findOne({_id: this._id});

    for (var i = 0; i < game.players.length; i++) {
        if (game.players[i].id === Meteor.userId())
            return game.players[i].czar;
    };
};

Template.game.cardsInPlay = function() {
    var result = [];
    var game = Games.findOne({
        _id: this._id
    });

    for (var i = 0; i < game.players.length; i++) {
        if (game.players[i].lastCardPlayed !== null)
            result.push(game.players[i].lastCardPlayed)
    };

    return Cards.find({_id: {$in: result}});

};