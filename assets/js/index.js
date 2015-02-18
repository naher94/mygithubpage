/* @file index.js
 * @brief Implements routing for the single-page-app
 * @author Oscar Bezi, oscar@bezi.io
 * @since 18 February 2015
 */

var app = {};

app.routes = {};

app.config = {};
app.config.divID = "#portfolio-page";
app.config.home = 'splash'
app.config.notFoundURL = app.config.home

/* @function routeGen
 * @brief Generates all of the routes
 */
app.routeGen = function () {
    var templates = $('script[type="text/X-tiny-template"]');

    templates = $.makeArray(templates).filter( function (template) {
        return /-template$/.test(template.id);
    }).forEach(function (template) {
        key = template.id.slice(0, -9);
        val = template.innerHTML;
        app.routes[key] = val;
    });
    app.router();
}

/* @function router
 * @brief Uses the location hash to route the proper page.
 */
app.router = function () {
    var route = location.hash.slice(1);
    route = route.replace(/^\//, '');
    route = route.replace(/\/$/, '');

    $(app.config.divID).slideUp(function () {
        $(app.config.divID).hide();
        if (route === "") {
            route = app.config.home;
        }

        if (app.routes[route] !== null) {
            $(app.config.divID).html(app.routes[route]);
        } else {
            $(app.config.divID).html(app.routes[app.config.notFoundURL]);
            location.hash = app.config.notFoundURL
        }
        $(app.config.divID).slideDown();
    });
}

$(window).on('hashchange', app.router);

$(app.routeGen);
