let posts = [{
    'author': 'Marie',
    'profilPic': 'img/marie.png',
    'image': 'img/wolf.jpg',
    'description': ' Wölfe auf lauer',
    'location': 'Alaska',
    'isLiked': false,
    'likes': 33,
    'postDate': '2h',
    'comments': [],
},
{
    'author': 'Lisa',
    'profilPic': 'img/lisa.jpg',
    'image': 'img/urlaub.jpg',
    'description': ' holliday',
    'location': 'Norwegen',
    'isLiked': false,
    'likes': 105,
    'postDate': '15h',
    'comments': [],
},
{
    'author': 'Susi',
    'profilPic': 'img/susi.jpg',
    'image': 'img/disneyschloss.jpg',
    'description': ' my weekend in Paris',
    'location': 'Paris',
    'isLiked': false,
    'likes': 324,
    'postDate': '2d',
    'comments': [],
},
{
    'author': 'Lutz',
    'profilPic': 'img/lutz.jpg',
    'image': 'img/auto.jpg',
    'description': ' my new car',
    'location': 'München',
    'isLiked': false,
    'likes': 558,
    'postDate': '8d',
    'comments': [],
},
{
    'author': 'Lucy',
    'profilPic': 'img/Lucy.jpg',
    'image': 'img/restaurant.jpg',
    'description': ' visit to a restaurant in Croatia',
    'location': 'Südtirol',
    'isLiked': false,
    'likes': 25,
    'postDate': '15d',
    'comments': [],
}]

load();
function init() {
    showPosts();
    feedFollower();
    addingFollower();
}

function showPosts() {
    document.getElementById('article').innerHTML = '';
    for (let i = 0; i < posts.length; i++) {
        const getPost = posts[i];
        document.getElementById('article').innerHTML += postContainer(getPost, i);
        let addedComment = document.getElementById(`output${i}`);
        for (let j = 0; j < getPost['comments'].length; j++) {
            const comment = getPost['comments'][j];
            addedComment.innerHTML += `<div><p><b>Maik:</b> ${comment}</p></div>`;
        }
        setHeart(i);
    }
}


function postContainer(getPosts, i) {
    return  /*HTML*/`
    <article class="posts">
        <div class="author"><img src=${getPosts['profilPic']} alt="Profillogo">
            <div>
                <div class="author-info">
                    <span>${getPosts['author']}</span>
                    <p class="postdate">•</p>
                    <p class="postdate">${getPosts['postDate']}</p>
                </div>
                <p class="location">${getPosts['location']}</p>
            </div>                        
                <img src="icons/menu_dot.png">
        </div>
        <div class="post-img"><img src="${getPosts['image']}"></div>
        <div class="post-icons">
            <img id="heart${i}" src="icons/heart.png" onclick="addlikes(${i})">
            <img src="icons/comment.png">
            <img src="icons/paperairplane.png">
            <img src="icons/bookmark.png">
        </div>
        <div id="likes${i}" class="show-likes" ><span>${getPosts['likes']} likes</span></div>
        <div id="description" class="post-description"><b><span>${getPosts['author']}</span></b><span>${getPosts['description']}</span></div>
        <div id="output${i}"></div>        
        <div class="comments-input"><input id="inputField${i}" type="text" placeholder="add a comment"><button type="button" onclick="addPost(${i})">Posten</button><i>☺</i></div>
        <hr class="line">
    </article>`;
}

function addPost(index) {
    let input = document.getElementById(`inputField${index}`);
    let commentText = input.value.trim();
    if (commentText === '') {
        alert('Na! da muss doch erschtmal was jäschrieben werden ;)');
        return;
    }
    posts[index]['comments'].push(input.value);
    save(index);
    showPosts();
    input.value = '';
}

function addlikes(index) {
    posts[index].isLiked = !posts[index].isLiked;
    if (posts[index].isLiked) {
        posts[index].likes = (posts[index].likes) + 1;
    } else {
        posts[index].likes = (posts[index].likes) - 1;
    }
    save(index);
    setHeart(index);
    showPosts();
}

function save(index) {
    localStorage.setItem('comments' + index, JSON.stringify(posts[index].comments));
    localStorage.setItem('isLiked' + index, JSON.stringify(posts[index].isLiked));
    localStorage.setItem('likes' + index, JSON.stringify(posts[index].likes));
    init();
}

function setHeart(index) {
    let heartImg = document.getElementById('heart' + index);
    if (posts[index].isLiked) {
        heartImg.src = 'icons/heartred.png';
    } else {
        heartImg.src = 'icons/heart.png';
    }
}

function load() {
    for (let i = 0; i < posts.length; i++) {
        let savedComments = localStorage.getItem('comments' + i);
        let savedIsLiked = localStorage.getItem('isLiked' + i);
        let savedLikes = localStorage.getItem('likes' + i);
        if (savedComments && savedIsLiked && savedLikes) {
            posts[i]['comments'] = JSON.parse(savedComments);
            posts[i]['isLiked'] = JSON.parse(savedIsLiked);
            posts[i]['likes'] = JSON.parse(savedLikes);
        }
    }
    init();
}

function addingFollower() {
    let addedFollower = document.getElementById('addFollower');
    addedFollower.innerHTML = '';
    for (let i = 0; i < posts.length; i++) {
        const Name = posts[i];
        const ProfilPic = posts[i];
        addedFollower.innerHTML += /*html*/`
        <div class="follower"><img src=${ProfilPic['profilPic']} alt="Profillogo">
        <span>${Name['author']}</span>
        </div>`;
    }
}

function feedFollower() {
    let feed = document.getElementById('feedFollower');
    feed.innerHTML = '';
    for (let i = 0; i < posts.length; i++) {
        const Name = posts[i];
        const ProfilPic = posts[i];
        feed.innerHTML += /*html*/`
        <div class="user"><img src=${ProfilPic['profilPic']} alt="Profillogo">
        <span>${Name['author']}</span><button onclick="saveFollower(${i})">Follow</button>
        </div>`;
    }
}