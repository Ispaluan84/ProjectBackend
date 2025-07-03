const baseHtml = require('./baseHtml');
const getNavBar = require('./getNavBar');

function renderPage(title, bodyContent, activeNav = '') {
    const nav = getNavBar(activeNav);
    return baseHtml(title, nav + bodyContent);
}

module.exports = renderPage;