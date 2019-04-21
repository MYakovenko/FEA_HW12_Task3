/*Task 3

Напилить код, который:
- вставляет кнопку на страницу
- добавляет обработчика события click кнопки

Обработчик события click:
- вычисляет случайное целое число от 1 до 20000 и помещает его в переменную winner
- добавляет :point_right: картинку
- ждет 4 секунды
- плавно изменяет непрозрачность картинки до 0, в процессе изменяя src картинки на новое значение
- плавно изменяет непрозрачность картинки до 1
- ждет еще 2 секунды, и делает fetch-запрос на гитхабовский API, чтобы получить данные юзера 
под номером winner
- при получении ответа изменяет src картинки на аватарку юзера, а так же вставляет логин юзера 
под фотографией
- ждет еще 10 секунд и удаляет картинку и подпись
- На время показа картинок кнопку лучше прятать*/

const addElem = (tagName) => document.body.appendChild(
    document.createElement(tagName)
)

const btn = addElem('button')
btn.innerText = "Let's go!"

const timeOut = time => new Promise(
    resolve => setTimeout( () => resolve(), time)
)

btn.onclick = function (event) {
    event.target.style.display = 'none'
    let winner = Math.round(Math.random()*20000)
    
    const picture = addElem('img')
    picture.src = "https://thumbs.gfycat.com/LivelyObviousAnhinga-size_restricted.gif"
    picture.style.height = "300"
    picture.style.transition = "all 1s"

    const login = addElem('h3') 
    
    timeOut(4000)
        .then( () => picture.style.opacity =0)
    timeOut(5000)
        .then( () => picture.src = "https://thumbs.gfycat.com/OddWideHookersealion-small.gif")
    timeOut(6000)
        .then( () => picture.style.opacity =1)
    timeOut(8000)
        .then( () => fetch (`https://api.github.com/users?since=${winner}`)
              .then( response => response.json()
                    .then (users => {
                        picture.src = users[0].avatar_url
                        login.innerText = users[0].login
                    })
              )
        )
    timeOut(15000)
        .then(
            () => {
                picture.remove()
                login.remove()
                event.target.style.display = 'block'
            }
        )
}