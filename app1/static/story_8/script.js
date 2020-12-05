var count = 0;
var book = "";
var noimage = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/200px-No_image_3x4.svg.png";


$(document).ready(() => {

    let search = getSearchParams("q")
    if (search != undefined) {
        console.log("param", count, book)
        // getApi(search)
        book = search
    }
})


$('#search-form').submit(e => {
    e.preventDefault();
    let search = $("#search-url").val()
    changeurl(search)
})

function getSearchParams(k) {
    var p = {};
    location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (s, k, v) {
        p[k] = v
    })
    return k ? p[k] : p;
}

const footer = document.querySelectorAll('.footer');

const lazyLoad = target => {
    const io = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {

            if (book !== "" && entry.isIntersecting) {
                console.log("observer", count, book)
                getApi(book)
            }
        })
    });
    footer.forEach(foot => io.observe(foot))
};
footer.forEach(lazyLoad)


function changeurl(search) {
    console.log("chageurl", count, book)
    let new_url = "/story_8/?q=" + search;
    window.history.pushState("data", "Title", new_url);
    getApi(search)
}

function getApi(search) {
    if (book !== search || book === "") {
        count = 0;
        book = search;
    }
    console.log("getapi", count, book)
    $.ajax({
        url: window.location.origin + "/story_8/api",
        contentType: "application/json",
        data: {
            "q": search,
            "maxResults": 15,
            "startIndex": count * 15
        },
        dataType: 'json',
        success: changeInner
    });
    count++;
}

function changeInner(result) {
    $("#result").html("Total books: " + result.totalItems)
    let parent = $("#books");
    let inner = "";
    let json = result.items;
    for (let i = 0; i < json.length; i++) {
        let data = json[i].volumeInfo
        inner += '<div class="card">'
        inner += '<a target="_blank" href="' + data.infoLink + '">'
        inner += '<div class="img-div"><img class="img-card" src="' + (data.imageLinks === undefined ? noimage : data.imageLinks.thumbnail) + '"/></div>'
        inner += "<h5>" + truncateString(data.title, 70) + "</h5>"
        inner += "<p>" + truncateString(data.authors, 20) + "</p>"
        inner += "</a></div>"
    }
    if (count > 1) {
        parent.append(inner)
    } else {
        parent.html(inner)
    }
}

function truncateString(str, length) {
    return str === undefined ? "-" : str.length > length ? str.substring(0, length - 3) + '...' : str
}