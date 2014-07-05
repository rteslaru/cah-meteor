Router.configure({
    layoutTemplate: 'layout'
});

Router.map(function() {
    this.route('home', {
        path: '/',
        yieldTemplates: {
            'mainMenu': {to: 'menu'}
        }
    });
    this.route('createGame', {
        path: '/new',
        yieldTemplates: {
            'mainMenu': {to: 'menu'}
        }
    });
});