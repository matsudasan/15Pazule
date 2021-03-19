const table = document.querySelector('table')
const ans = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ""]
const currentPazule = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ""]

const Init = () => {
    Shuffle()
    CreateElement()
}

const CreateElement = () => {
    const fragment = document.createDocumentFragment()
    let num = 0
    for (let i = 0; i < 4; i++) {
        const tr = document.createElement("tr")
        for (let j = 0; j < 4; j++) {
            const td = document.createElement("td")
            if (currentPazule[num] === ans[num]) td.classList.add('ans')
            if (!(currentPazule[num] === "")) td.classList.add('back-color')
            td.innerText = currentPazule[num]
            tr.appendChild(td)
            td.addEventListener('click', Move)
            num++
        }
        fragment.appendChild(tr)
    }
    table.appendChild(fragment)
}

const Shuffle = () => {
    for (let i = 0; i < 20; i++) {
        const origin = Math.floor(Math.random() * currentPazule.length)
        let move = Math.floor(Math.random() * currentPazule.length)
        while (origin === move) {
            move = Math.floor(Math.random() * currentPazule.length)
        }
        [currentPazule[origin], currentPazule[move]] = [currentPazule[move], currentPazule[origin]];

    }
}

const ChangeEle = (src, des) => {
    const items = [...document.querySelectorAll('td')];
    const origin = items.find(ele => ele.innerText === currentPazule[src].toString());
    const blank = items.find(ele => ele.innerText === '');

    origin.classList.add('anime')
    blank.classList.add('anime')
    if (origin.getBoundingClientRect().y > blank.getBoundingClientRect().y) { //上に移動
        origin.style.transform = `translate(0px, -${origin.getBoundingClientRect().height + 2}px)` //+2はボーダーの太さ
        blank.style.transform = `translate(0px, ${blank.getBoundingClientRect().height + 2}px)`
    } else if (origin.getBoundingClientRect().y < blank.getBoundingClientRect().y) {　//下に移動
        origin.style.transform = `translate(0px, ${origin.getBoundingClientRect().height + 2}px)`
        blank.style.transform = `translate(0px, -${blank.getBoundingClientRect().height + 2}px)`
    } else if (origin.getBoundingClientRect().x < blank.getBoundingClientRect().x) { //右に移動
        origin.style.transform = `translate(${origin.getBoundingClientRect().width + 2}px, 0px)`
        blank.style.transform = `translate(-${blank.getBoundingClientRect().width + 2}px, 0px)`
    } else if (origin.getBoundingClientRect().x > blank.getBoundingClientRect().x) { //左に移動
        origin.style.transform = `translate(-${origin.getBoundingClientRect().width + 2}px, 0px)`
        blank.style.transform = `translate(${blank.getBoundingClientRect().width + 2}px, 0px)`
    }

    [currentPazule[src], currentPazule[des]] = [currentPazule[des], currentPazule[src]]; //分割代入の末尾にセミコロンは必須
    origin.addEventListener('transitionend', () => {
        for (let i = 0; i < currentPazule.length; i++) {
            items[i].classList.remove('anime')
            items[i].removeAttribute('style')
            items[i].innerText = currentPazule[i]
            if (items[i].innerText === "") {
                items[i].classList.remove('back-color')
            } else {
                items[i].classList.add('back-color')
            }
            if (items[i].innerText === ans[i].toString()) {
                items[i].classList.add('ans')
            } else {
                items[i].classList.remove('ans')
            }
        }
    })
    Jage()
}

const Jage = () => {
    for (let i = 0; i < currentPazule.length; i++) {
        if (!(currentPazule[i] === ans[i])) {
            return
        }
    }
    const h1 = document.createElement('h1')
    h1.innerText = "クリアです。"
    document.body.appendChild(h1)

    const items = [...document.querySelectorAll('td')];

    items.forEach(ele => ele.removeEventListener('click', Move))

}

const Move = (e) => {
    const index = currentPazule.findIndex(ele => ele.toString() === e.target.innerText)
    const top = currentPazule[index - 4]
    const bottom = currentPazule[index + 4]
    const right = (index + 1) % 4 !== 0 ? currentPazule[index + 1] : null
    const left = index % 4 !== 0 ? currentPazule[index - 1] : null

    if (top === "") {
        ChangeEle(index, index - 4)
    } else if (bottom === "") {
        ChangeEle(index, index + 4)
    } else if (right === "") {
        ChangeEle(index, index + 1)
    } else if (left === "") {
        ChangeEle(index, index - 1)
    }
}

Init()
