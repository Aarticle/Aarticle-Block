/****************************
* Aarticle Block Main SERVER
*****************************/

// Boom provides a set of utilities for returning HTTP errors.
// Each utility returns a Boom error
// response object (instance of Error) which includes the following properties:
const Boom = require('boom')
// Object schema description language and validator for JavaScript objects.
const Joi = require('joi')
// Object schema description language and validator for JavaScript objects.
const Path = require('path')

// Initalizing Server
const Hapi = require('hapi');
const server = new Hapi.Server();
server.connection({
		port: 8002,
		routes: { cors: { credentials: true } }
});


/********************************
*         Middleware
********************************/

const Handlerbars = require('handlebars');
const HandlebarsLayouts = require('handlebars-layouts');
HandlebarsLayouts.register(Handlerbars);

/*********************************
*         MD5 Hashes
*********************************/

const md5 = require('md5')

/*******************************
*        HAT Module
********************************/
const hat = require('hat');

/*******************************
*        View Config
*******************************/
server.register([require('vision'), require("inert")], function (err) {

	server.views({
		engines: {
			html: {
				module: Handlerbars
			}
		},
		relativeTo: Path.join(__dirname, 'public'),
		path: './views',
		partialsPath: './views/partials'
	});

  /***************************
  * Handle HTTP 404
  ***************************/

  server.ext('onPreResponse', function (request, reply)
  {
    if (request.response.isBoom)
    {
        return reply.redirect('/');
    }

    return reply.continue();
  });

/*****************************
*      Server Events
*****************************/
server.on('internalError', function (request, err)
{
});

// WEB Route: All the routes pertaining to web pages

server.route({
  method: 'GET',
  path: '/',
  handler: function(request, reply)
  {
    reply.redirect("/dashboard");
  }
});

server.route({
  method: 'GET',
  path: '/dashboard',
  handler: function(request, reply)
  {
    reply.view('page-dashboard', {id: "dashboard"});
  }
});

server.route({
  method: 'GET',
  path: '/guidelines',
  handler: function(request, reply)
  {
    reply.view('page-guidelines', {id: "guidelines"});
  }
});

server.route({
  method: 'GET',
  path: '/alpha/access/instructions',
  handler: function(request, reply)
  {
    reply.view('page-alpha-access-instructions', {id: "alpha-access-instructions"});
  }
});

server.route({
  method: 'GET',
  path: '/onboard',
  handler: function(request, reply)
  {
    reply.view('page-onboard', {id: "onboard"});
  }
});

server.route({
  method: 'GET',
  path: '/type',
  handler: function(request, reply)
  {
    reply.view('page-type', {id: "type"});
  }
});

server.route({
  method: 'GET',
  path: '/test',
  handler: function(request, reply)
  {
    reply.view('page-test', {id: "test"});
  }
});

server.route({
  method: 'GET',
  path: '/test/editor',
  handler: function(request, reply)
  {
    reply.view('page-test-editor', {id: "test-editor"});
  }
});

server.route({
  method: 'GET',
  path: '/test/dnn',
  handler: function(request, reply)
  {
    reply.view('page-test-dnn', {id: "test-dnn"});
  }
});


server.route({
  method: 'GET',
  path: '/stream',
  handler: function(request, reply)
  {
    reply.view('page-stream', {id: "stream"});
  }
});

server.route({
  method: 'GET',
  path: '/article/preview/{hash}',
  handler: function(request, reply)
  {
    reply.view('page-article-preview', {id: "article"});
  }
});

server.route({
  method: 'GET',
  path: '/article/review/{hash}',
  handler: function(request, reply)
  {
    reply.view('page-article-review', {id: "review"});
  }
});

server.route({
  method: 'GET',
  path: '/account',
  handler: function(request, reply)
  {
    reply.view('page-account', {id: "account"});
  }
});

server.route({
  method: 'GET',
  path: '/article/{hash}',
  handler: function(request, reply)
  {
    reply.redirect("/");
  }
});

server.route({
  method: 'GET',
  path: '/article/drafts',
  handler: function(request, reply)
  {
    reply.view('page-article-drafts', {id: "article-drafts"});
  }
});

server.route({
  method: 'GET',
  path: '/article/read',
  handler: function(request, reply)
  {
    reply.view('page-article-read', {id: "article-read"});
  }
});

server.route({
  method: 'GET',
  path: '/article/assigned',
  handler: function(request, reply)
  {
    reply.view('page-article-assigned', {id: "article-assigned"});
  }
});

server.route({
  method: 'GET',
  path: '/article/reviewed',
  handler: function(request, reply)
  {
    reply.view('page-article-reviewed', {id: "article-reviewed"});
  }
});

server.route({
  method: 'GET',
  path: '/article/submitted',
  handler: function(request, reply)
  {
    reply.view('page-article-submitted', {id: "article-submitted"});
  }
});

server.route({
  method: 'GET',
  path: '/wallet',
  handler: function(request, reply)
  {
    reply.view('page-wallet', {id: "wallet"});
  }
});

server.route({
  method: 'GET',
  path: '/article/editor',
  handler: function(request, reply)
  {
    reply.view('page-article-editor', {id: "editor"});
  }
});

server.route({
  method: 'GET',
  path: '/article/editor/{id}',
  handler: function(request, reply)
  {
    reply.view('page-article-editor', {id: "editor"});
  }
});



/******************************
* API Route: Static Files
*******************************/
server.route({
  method: 'GET',
  path: '/{path*}',
  handler:
  {
    directory:
    {
      path: Path.join(__dirname, 'public'),
      listing: false,
      index: true
    }
  }
});


/********************************
* API Route: Starts Server
*********************************
*  Starts server */

server.start(function()
{

  console.log("### SERVER STARTED ###");
});
});
