function getNavBar(active = '') {
    const categories = ['Camisetas', 'Pantalones', 'Zapatos', 'Accesorios'];
    let nav = '<nav><ul>';
    nav += `<li><a href="/products"${active==='home'? 'class="active"':''}>Inicio</a></li>`;
    categories.forEach(cat => {
        const slug = encodeURIComponent(cat.toLowerCase());
        nav += `<li><a href="/products?category=${slug}"${active===cat? ' class="active"':''}>${cat}</a></li>`;
    });
        nav += '<li><a href="/products/new">Nuevo</a></li>';
        nav += '</ul></nav>';
        return nav;
}   

module.exports = getNavBar;