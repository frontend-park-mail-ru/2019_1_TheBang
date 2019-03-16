import title from "../../blocks/title/title";
import author from "../../blocks/author/author";

class AuthorsContent {
    constructor () {
        this.title = title;
        this.author = [];
        for (let i = 0; i < 4; i++) {
            this.author.push(author);
        }
    }
    render() {
        console.log('draw author content');
        return `
            ${this.title('Авторы')}
            ${this.author[0]('Цитульский Антон', 'https://github.com/AntonOcean')}
            ${this.author[1]('Щербакова Лиза', 'https://github.com/Liza-Shch')}
            ${this.author[2]('Андрей Баронский', 'https://github.com/Surfingbird')}
            ${this.author[3]('Руслан Шахаев', 'https://github.com/Ruslan2702')}
        `
    }
}

export default AuthorsContent;