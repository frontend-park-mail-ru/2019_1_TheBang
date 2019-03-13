import './author.scss'

const author = (title, path) =>
    `
        <h1><a class="author" href="${path}">${title}</a></h1>
    `

export default author;