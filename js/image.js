function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $(".image-upload-wrap").hide();

      $(".file-upload-image").attr("src", e.target.result);
      $(".file-upload-content").show();

      $(".image-title").html(input.files[0].name);
    };

    reader.readAsDataURL(input.files[0]);
  } else {
    removeUpload();
  }
}

function removeUpload() {
  $(".file-upload-input").replaceWith($(".file-upload-input").clone());
  $(".file-upload-content").hide();
  $(".image-upload-wrap").show();
}
$(".image-upload-wrap").bind("dragover", function () {
  $(".image-upload-wrap").addClass("image-dropping");
});
$(".image-upload-wrap").bind("dragleave", function () {
  $(".image-upload-wrap").removeClass("image-dropping");
});

$("#btnUpload").on("click", function () {
  var formData = new FormData();
  // console.log($("#img"));
  formData.append('file', $('#img')[0].files[0]);

  // formData.append("file", $("#img").files[0]);
  $.ajax({
    url: "http://localhost:8880",
    type: "POST",
    dataType: false,
    contentType: false,
    data: formData,
    processData: false,
  })
    .done(function (res) {
      alert(res.cancer);
      // console.log(res);
      // Swal.fire({
      //   title: "Error!",
      //   text: "Do you want to continue. " + JSON.stringify(res),
      //   icon: "error",
      //   confirmButtonText: "Cool",
      // });
    })
    .fail(function (jqXHR, textStatus, err) {
      console.error(jqXHR);
      console.error(textStatus);
      console.error(err);
    });
});
