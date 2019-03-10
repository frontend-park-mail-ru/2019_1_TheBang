function btn(title, path, icon) {
    return `
                <a class="menu__nav__item" href="#${path}">
                <img class="menu__nav__item__icon" src=dist/${icon} alt=""/>
                <span class="menu__nav__item__title">
                ${title}
                </span>
            </a>
    `
}

export default btn;