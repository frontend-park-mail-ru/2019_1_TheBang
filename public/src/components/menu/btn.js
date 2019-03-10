function btn(title, path) {
    return `
                <a class="menu__nav__item" href="#${path}">
                <span class="menu__nav__item__title">
                ${title}
                </span>
            </a>
    `
}

export default btn;