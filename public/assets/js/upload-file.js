// script.js
var fInput;
var pBar;
var pText;
var fName;
var cInput;
var modal;
var cModal;
var uImage;
var pContainerModal;
var pContainer;
var file;
var nameFile;
var errorMsg;
var isValid

$(document).on('change', '.fileInput', function (event) {
    fInput = $(this)
    pBar = fInput.closest(".file-lable-container").find('.progress-bar');
    pText = fInput.closest(".file-lable-container").find('.progress-text');
    pBarContainer = fInput.closest(".file-lable-container").find('.progress-container');
    fName = fInput.closest(".file-lable-container").find('.file-name');
    cInput = fInput.closest(".file-lable-container").find('.control-image-upload');
    modal = fInput.closest(".file-lable-container").find('.modal-img');
    cModal = fInput.closest(".file-lable-container").find('.close-modal');
    uImage = fInput.closest(".file-lable-container").find('#uploadedImageModal');
    pContainerModal = fInput.closest(".file-lable-container").find('.preview-container-modal');
    pContainer = fInput.closest(".file-lable-container").find('.preview-container-img');
    nameFile = fInput.closest(".file-lable-container").find('.title-image');
    errorMsg = fInput.closest(".file-lable-container").find('.text-danger');

    file = event.target.files[0];
    newValidatefiles()
    let fileSizeInKB = file.size / 1024;// Convert bytes to megabytes
    let sizeValidate = true;
    if (fileSizeInKB > 500) {
        sizeValidate = false;
        $.toast({
            icon: 'error',
            position: 'top-left',
            text: "لا يمكن تحميل صورة اكبر من 500 كيلو بايت"
        });
    }
    else {
        sizeValidate = true;
    }
    if (file && isValid && sizeValidate) {

        let reader = new FileReader();
        reader.onloadstart = () => {
            pBar.css("width", "0%");
            pBar.show();
            //pBar.text('0%');
            pContainer.hide();
        };
        reader.onprogress = (event) => {
            debugger
            if (event.lengthComputable) {
                const progress =
                    (event.loaded / event.total) * 100;
                pBar.css("width", `${progress}%`);
                pText.text(`${Math.round(progress)}%`);
            }
        };
        reader.onload = () => {
            let uploadTime = 2000;
            let interval = 50;
            let steps = uploadTime / interval;
            let currentStep = 0;
            let updateProgress = () => {
                let progress = (currentStep / steps) * 100;
                pBar.css("width", `${progress}%`);
                pText.text(`${Math.round(progress)}%`);
                currentStep++;
                if (currentStep <= steps) {
                    pBarContainer.show();
                    setTimeout(updateProgress, interval);
                } else {
                    pBarContainer.hide();
                    pBar.css("width", `100%`);
                    pText.text(`100%`);
                    fName.text(`${file.name}`);
                    console.log("reader.result", reader.result)
                    pContainer.html(`<img src="${reader.result}" class="preview-image">`);
                    if (fInput.closest(".file-lable-container").hasClass("upload-img")) {
                        fInput.siblings(".input-form-image").val(reader.result);
                    }
                    pContainer.show();
                    cInput.show();
                    nameFile.show();
                    errorMsg.remove();
                    fInput.hide();
                }
            };
            setTimeout(updateProgress, interval);
        };
        reader.readAsDataURL(file);
     
    } else {
        fInput.val('');
    }

});
function customInput(event) {
    debugger
    fInput = $(event)
    pBar = fInput.closest(".file-lable-container").find('.progress-bar');
    pBarContainer = fInput.closest(".file-lable-container").find('.progress-container');
    pText = fInput.closest(".file-lable-container").find('.progress-text');
    fName = fInput.closest(".file-lable-container").find('.file-name');
    cInput = fInput.closest(".file-lable-container").find('.control-image-upload');
    modal = fInput.closest(".file-lable-container").find('.modal-img');
    cModal = fInput.closest(".file-lable-container").find('.close-modal');
    uImage = fInput.closest(".file-lable-container").find('#uploadedImageModal');
    pContainerModal = fInput.closest(".file-lable-container").find('.preview-container-modal');
    pContainer = fInput.closest(".file-lable-container").find('.preview-container-img');
    nameFile = fInput.closest(".file-lable-container").find('.title-image');
    errorMsg = fInput.closest(".file-lable-container").find('.text-danger');

    file = event.target.files[0];
    newValidatefiles()
    if (isValid) {

        let reader = new FileReader();
        reader.onloadstart = () => {
            pBar.css("width", "0%");
            pBar.show();
            //pBar.text('0%');
            pContainer.hide();
        };
        reader.onprogress = (event) => {
            if (event.lengthComputable) {
                const progress =
                    (event.loaded / event.total) * 100;
                pBar.css("width", `${progress}%`);
                pText.text(`${Math.round(progress)}%`);
            }
        };
        reader.onload = () => {
            let uploadTime = 4000;
            let interval = 50;
            let steps = uploadTime / interval;
            let currentStep = 0;
            let updateProgress = () => {
                let progress = (currentStep / steps) * 100;
                pBar.css("width", `${progress}%`);
                pText.text(`${Math.round(progress)}%`);
                currentStep++;

                if (currentStep <= steps) {
                    pBarContainer.show();
                    setTimeout(updateProgress, interval);
                } else {
                    pBarContainer.hide();
                    pBar.css("width", `100%`);
                    pText.text(`100%`);
                    fName.text(`${file.name}`);
                    console.log("reader.result", reader.result)
                    pContainer.html(`<img src="${reader.result}" class="preview-image">`);

                    pContainer.show();
                    cInput.show();
                    fInput.none();
                    nameFile.show();
                    errorMsg.remove();
                }
            };
            setTimeout(updateProgress, interval);
        };
        reader.readAsDataURL(file);
    } else {
        fInput.val('');
    }
}
function viewButton(e) {
    $(e).closest(".file-lable-container").find(".preview-container-modal").addClass("active");

    //pdfjsLib.getDocument(cvPath).promise.then(function (pdf) {
    //    let numPages = pdf.numPages;
    //    // Display all pages
    //    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
    //        pdf.getPage(pageNum).then(function (page) {
    //            let canvas = document.createElement('canvas');
    //            canvas.classList.add('pdf-page');
    //            let context = canvas.getContext('2d');

    //            // Set the canvas dimensions
    //            let viewport = page.getViewport({ scale: 1.3 });
    //            canvas.height = viewport.height;
    //            canvas.width = viewport.width;

    //            // Append canvas to modal body
    //            modal.find('.preview-container-modal .cv-body').append(canvas);

    //            // Render PDF page into canvas
    //            let renderContext = {
    //                canvasContext: context,
    //                viewport: viewport
    //            };
    //            page.render(renderContext);
    //        });
    //    }
    //});
}
function closeReview(e) {
    $(e).closest(".file-lable-container").find(".preview-container-modal").removeClass("active");

}
function clearButton(e) {
    $(e).closest(".file-lable-container").find(".control-image-upload").hide();
    $(e).closest(".file-lable-container").find(".preview-container-img").html("");
    $(e).closest(".file-lable-container").find(".fileInput").val("");
    $(e).closest(".file-lable-container").find(".fileInput").show();
    $(e).closest(".file-lable-container").find(".title-image").hide();
}
function newValidatefiles() {
    isValid = true;

    $("file_upload").each(function () {
        let attachment = $(this);
        let $fileInput = attachment.find("input[type='file']");
        let $file = $fileInput[0];
        let isRequired = (attachment.attr("data-isrequired") || "").toLowerCase() == "true";
        let maxFileSize = parseFloat(attachment.attr("data-maxfilesize") || "1");
        let allowedExtensions = ($fileInput.attr("accept") || "").split(',');

        attachment.find("span.text-danger").remove();

        if ($file.files.length > 0) {
            let file = $file.files[0];

            if (file) {
                let extension = file.name.substr((file.name.lastIndexOf('.') + 1)).toLowerCase();
                let sizeMB = file.size / (1024 * 1024);

                if (allowedExtensions.length > 0 && allowedExtensions.filter(ent => ent == `.${extension}`).length == 0) {
                    isValid = false;
                    attachment.append(`<span class="text-danger">${AllwoedExtensionsVMsg} (${allowedExtensions})</span>`);
                }

                if (sizeMB > maxFileSize) {
                    isValid = false;
                    attachment.append(`<span class="text-danger">${MaxFileSizeVMsg} (${maxFileSize} MB)</span>`);
                }
            }
        }
        else if (isRequired && attachment.find("img.imagePreview").attr("src") == "") {
            isValid = false;
            attachment.append(`<span class="text-danger">${RequiredVMsg}</span>`);
        }
    });

    return isValid;
}