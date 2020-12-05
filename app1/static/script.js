$(document).ready(() => {

})


$('#search-form').submit(e => {
    e.preventDefault();
    let search = $("#search-url").val()
    getApi(search)
})


function getApi(search) {
    console.log(search)
    $.ajax({
        url: window.location.origin + "/api",
        contentType: "application/json",
        data: {
            "q": search,
        },
        dataType: 'json',
        success: changeInner
    });
}

function changeInner(result) {
    let parent = $("#books");
    let inner = "";
    let json = result.items;
    for (let i = 0; i < json.length; i++) {
        let data = json[i].volumeInfo
        inner += '<div class="card">'
        inner += '<a target="_blank" href="' + data.infoLink + '">'
        inner += "<h5>" + data.title + "</h5>"
        inner += "<p>" + data.authors + "</p>"
        inner += "</a></div>"
    }

    parent.html(inner)
}