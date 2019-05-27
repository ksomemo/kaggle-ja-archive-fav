/**
 * https://developer.mozilla.org/ja/docs/Web/API/Element/querySelector
 * https://qiita.com/butakoma/items/89fa687ab90ff28d57ef
 * https://developer.mozilla.org/ja/docs/Web/API/Window/localStorage
 */
const addFavButton = () => {
    const messages = document.querySelectorAll('#message-area > div.container.message');
    const channelTitle = document.querySelector('#channel-title').textContent.trim();

    messages.forEach((m) => {
        const star = document.createElement('span');
        m.querySelector('a').insertAdjacentElement('afterend', star);

        const messageLink = m.querySelector('a').href;
        const favMessage = window.localStorage.getItem(messageLink);
        star.addEventListener('click', (e) => {
            const s = e.target;
            if (s.className === 'fav') {
                s.className = '';
                s.textContent = '☆';
                s.style.color = 'black';
                window.localStorage.removeItem(messageLink);
            } else {
                s.className = 'fav';
                s.textContent = '★';
                s.style.color = 'yellow';
                const newFav = {
                    'message-link': messageLink,
                    'channel-title': channelTitle,
                    'person-img': m.querySelector('div.row > div.col-1.person-img-container > img').src,
                    'person-name': m.querySelector('div.row > div.col-11.person > h4').textContent.trim().split(' ')[0],
                    'time': m.querySelector('div.row > div.col-11.person > h4 > span.time').textContent,
                    'person-text': m.querySelector('div.row > div.col-11.person > h5').innerHTML
                }
                window.localStorage.setItem(messageLink, JSON.stringify(newFav));
            }
        });

        // fixme: 初期設定のためにclick実行、無駄がある
        if (favMessage === null) {
            // toggle なので逆を設定
            star.className = 'fav';
        }
        star.click();
    });
    }

/**
 * https://qiita.com/cocottejs/items/66eef8fef22c0082a15f
 */
const displayFavList = () => {
    const favList = document.createElement('ul');
    Object.keys(window.localStorage).forEach((key) => {
        console.log(key);
        const fav = JSON.parse(window.localStorage.getItem(key));
        const content = `<ul>
    <li><img src="${fav['person-img']}"></li>
    <li>
        ${fav['person-name']}
        ${fav['time']}
        <a href="${fav['message-link']}">link to this message</a>
    </li>
    <li>${fav['channel-title']}</li>
    <li>${fav['person-text']}</li>
    </ul>`

        const e = document.createElement('li');
        e.innerHTML = content;
        favList.appendChild(e);
    });

    document.getElementById('message-area').insertAdjacentElement('beforebegin', favList)
};

const clearStorage = () => {
    Object.keys(window.localStorage).forEach((k) => window.localStorage.removeItem(k));
}
