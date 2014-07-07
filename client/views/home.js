Template.home.games = function() {
    return Games.find();
};

Template.listGames.events({
    'click .fade.button': function(e, tpl) {
        Router.go('game', {_id: tpl.data._id});
    }
});