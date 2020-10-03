$(document).ready(function () {

    document.getElementById('fileUploadUI').addEventListener('click', delegateToFileUploadButton);

    document.getElementById('fileUpload').addEventListener('change', uploadFile);

    document.getElementById('copyToClipBoard').addEventListener('click', copyToClipBoard);  

    function delegateToFileUploadButton() {
        document.getElementById('fileUpload').click();
    }

    function uploadFile() {

        $('#file-upload-card').hide();
        $('#loader-card').removeAttr('hidden');

        var formData = new FormData();
        formData.append('file', $('#fileUpload')[0].files[0]);

        $.ajax({
            type: "POST",
            url: "/FileUpload/UploadFile",
            data: formData,
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
    }

    function copyToClipBoard() {
        var copyText = document.querySelector("#uploadedFilePath");
        copyText.select();
        document.execCommand("copy");
    }

});