// Save an Article => set saved to true
function scrapeArticles(){
  $.ajax({
    method: "GET",
    url: "/scrape"
  }).then(function() {
    location.reload();
    
  });
}

function saveArticle(){
    var articleId = $(this).data("id");
    console.log(articleId);
    $.ajax({
        method: "POST",
        url: "/api/saved/" + articleId,
    }).then(function () {
        location.reload();
    });
}

// Save Note
function saveNote(){
    var articleId = $(this).attr("data-id-article");
    var newNote = $("#" + articleId).val().trim();

    console.log(articleId, newNote);

    $.ajax({
      method: "POST",
      url: "/api/saved/notes/" + articleId,
      data: {
        body: newNote
      }
    }).then(function() {
      location.reload();
    });
}

function deleteNote(){
  var noteId = $(this).attr("data-id-note");
  console.log('clicked', noteId);

  $.ajax({
    method: "DELETE",
    url: "/api/notes/" + noteId
  }).then(function() {
    location.reload();
  });
}

function deleteArticle(){
  var articleId = $(this).attr("data-id-article");
  $.ajax({
    method: "DELETE",
    url: "/api/articles/" + articleId
  }).then(function() {
    location.reload();
  });
}

function clearAll(){
  $.ajax({
    method: "DELETE",
    url:"/api/articles"
  }).then(function () {
    location.reload();
  });
}

$("#scrape-btn").on("click", scrapeArticles);
$("#clear-btn").on("click", clearAll);
$(".save-btn").on("click", saveArticle);

$(".save-note-btn").on("click", saveNote);
$(".delete-note-btn").on("click", deleteNote);

$(".delete-article-btn").on("click", deleteArticle);

