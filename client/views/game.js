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
        $(tpl.firstNode.getElementsByClassName('label')).toggleClass('green');
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