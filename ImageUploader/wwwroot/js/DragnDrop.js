$(document).ready(function () {

    $("#drag-n-drop").on("dragenter", function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
    });

    $("#drag-n-drop").on("dragover", function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
    });

    $("#drag-n-drop").on("drop", function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        var files = evt.originalEvent.dataTransfer.files;

        $('#file-upload-card').hide();
        $('#loader-card').removeAttr('hidden');

        var data = new FormData();
        data.append('file', files[0]);

        $.ajax({
            type: "POST",
            url: "/FileUpload/UploadFile",
            data: data,
            processData: false,  // tell jQuery not to process the data
            contentType: false,  // tell jQuery not to set contentType
            success: function (data) {

                if (data == null) {
                    document.getElementById('invalidFile').innerHTML = "Invalid File!";
                    $('#loader-card').hide();
                    $('#file-upload-card').show();
                }
                else {
                    $('#loader-card').hide();
                    $('#upload-complete-card').removeAttr('hidden');
                    $('#uploadedFilePath').val(data[0]);
                    $('#uploadedImage').attr("src", data[1]);
                }
            }
        });
    });

});