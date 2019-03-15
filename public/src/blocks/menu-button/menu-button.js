import './menu-button.scss';

const btn = (title, path) =>
    `
        <a class="menu-button" href="#${path}"> 
            <b>${title}</b>
        </a>
    `

export default btn;