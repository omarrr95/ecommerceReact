$(document).ready(function () {
		// textarea editor
    tinymce.init({
        selector: '.textarea.lang-en',
        plugins: 'image code advlist autolink lists link image charmap preview anchor pagebreak directionality textcolor',
        toolbar: 'forecolor | undo redo | blocks | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | link image | code',
        /* enable title field in the Image dialog*/
        image_title: true,
        /* enable automatic uploads of images represented by blob or data URIs*/
        automatic_uploads: true,
        /*
          URL of our upload handler (for more details check: https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_url)
          images_upload_url: 'postAcceptor.php',
          here we add custom filepicker only to Image dialog
        */
        file_picker_types: 'image',
        /* and here's our custom image picker*/
        file_picker_callback: (cb, value, meta) => {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');

            input.addEventListener('change', (e) => {
                const file = e.target.files[0];

                const reader = new FileReader();
                reader.addEventListener('load', () => {
                    /*
                      Note: Now we need to register the blob in TinyMCEs image blob
                      registry. In the next release this part hopefully won't be
                      necessary, as we are looking to handle it internally.
                    */
                    const id = 'blobid' + (new Date()).getTime();
                    const blobCache = tinymce.activeEditor.editorUpload.blobCache;
                    const base64 = reader.result.split(',')[1];
                    const blobInfo = blobCache.create(id, file, base64);
                    blobCache.add(blobInfo);

                    /* call the callback and populate the Title field with the file name */
                    cb(blobInfo.blobUri(), { title: file.name });
                });
                reader.readAsDataURL(file);
            });

            input.click();
        }
    });
    tinymce.init({
        selector: '.textarea.lang-ar',
        plugins: 'image code advlist autolink lists link image charmap preview anchor pagebreak directionality textcolor',
        toolbar: 'forecolor | undo redo | blocks | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | link image | code',
        language: 'ar',
        /* enable title field in the Image dialog*/
        image_title: true,
        /* enable automatic uploads of images represented by blob or data URIs*/
        automatic_uploads: true,
        /*
          URL of our upload handler (for more details check: https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_url)
          images_upload_url: 'postAcceptor.php',
          here we add custom filepicker only to Image dialog
        */
        file_picker_types: 'image',
        /* and here's our custom image picker*/
        file_picker_callback: (cb, value, meta) => {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');

            input.addEventListener('change', (e) => {
                const file = e.target.files[0];

                const reader = new FileReader();
                reader.addEventListener('load', () => {
                    /*
                      Note: Now we need to register the blob in TinyMCEs image blob
                      registry. In the next release this part hopefully won't be
                      necessary, as we are looking to handle it internally.
                    */
                    const id = 'blobid' + (new Date()).getTime();
                    const blobCache = tinymce.activeEditor.editorUpload.blobCache;
                    const base64 = reader.result.split(',')[1];
                    const blobInfo = blobCache.create(id, file, base64);
                    blobCache.add(blobInfo);

                    /* call the callback and populate the Title field with the file name */
                    cb(blobInfo.blobUri(), { title: file.name });
                });
                reader.readAsDataURL(file);
            });

            input.click();
        }
    });

		//tinymce.init({
		//	selector: '.textarea',
  //          plugins: 'advlist autolink lists link image charmap preview anchor pagebreak directionality image Code textcolor',
		//	toolbar_mode: 'floating',
  //          toolbar: "forecolor | undo redo | blocks | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | link image",
  //          textcolor_cols: "5",
  //          automatic_uploads: true,
  //          file_picker_types: 'image',
		//	language: 'en'
		//});
    $(".select2").select2();
    setTimeout(function () {
        $(".spinner-loader").removeClass("active");
    }, 500);
  });
  $(document).ajaxStart(function () {
    $(".spinner-loader").addClass("active");
});

$(document).ajaxComplete(function () {
    $(".spinner-loader").removeClass("active");
});
function  showAdvancedSearch(e) {
    $(e).closest(".advanced-filters-section").find(".filter-normal").slideUp();
    $(e).closest(".advanced-filters-section").find(".advanced-filters-toggle").slideDown();
}
function  showNormalSearch(e) {
    $(e).closest(".advanced-filters-section").find(".filter-normal").slideDown();
    $(e).closest(".advanced-filters-section").find(".advanced-filters-toggle").slideUp();
}
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})
function changeActive(e) {
     var dataCheck = $(e).attr("data-check");
     var dataUnCheck = $(e).attr("data-uncheck");
    if($(e).is(':checked')) {
        $(e).siblings(".form-check-label").html(dataCheck)
    }
    else {
        $(e).siblings(".form-check-label").html(dataUnCheck)
    }
}

function slideToggle(e) {
    $(e).toggleClass("active");
    $(e).closest(".card").find(".card-body").slideToggle();
}
function removeToaster(e) {
    $(e).closest(".toast").fadeOut();
}
function ShowPassword(e) {
    $(e).find("i").toggleClass("fa-eye");
    $(e).find("i").toggleClass("fa-eye-slash");
    if ($(e).hasClass("showedInput")) {
        $(e).parent().find("input").attr("type", "password");
        $(e).removeClass("showedInput");
    }
    else {
        $(e).parent().find("input").attr("type", "text");
        $(e).addClass("showedInput");
    }
}
function CollapseSidebar() {
    if ($(window).width() > 991) {
        $("body").toggleClass('CollapseSidebar');
    }
    else {
        $("body").toggleClass('showSidebar');
    }
}
function LiveSearch(e) {
    debugger
    var table = $(e).closest('.box-section').find('.table-style tbody tr');
      $.each($(table), function() {
         if($(this).text().toLowerCase().indexOf($(e).val().toLowerCase()) === -1){
             $(this).hide();
           }else{
             $(this).show();
          }
      });
}
function LiveSearchJobs(e) {
    var singleJob = $('.single-job');
    $.each($(singleJob), function () {
        if ($(this).text().toLowerCase().indexOf($(e).val().toLowerCase()) === -1) {
            $(this).hide();
        } else {
            $(this).show();
        }
    });
    filterJobs()
}
$(document).on('change', '.imageUpload', function (e) {
    readURL(this);
    });
    var testId = 1;
var readURL = function (input) {
    testId++;
    if (input.files && input.files[0]) {
        let file = input.files[0];
        let fileSizeInKB = file.size / 1024;// Convert bytes to megabytes

        if (fileSizeInKB > 500) {
            $.toast({
                icon: 'error',
                position: 'top-left',
                text: "لا يمكن تحميل صورة اكبر من 500 كيلو بايت"
            });
            input.value = ""; // Clear the input
            return; // Exit the function
        }

        let reader = new FileReader();
        reader.onload = function (e) {
            let id_img = input.id;
            let value_img = e.target.result;
            $('#' + id_img).closest(".avatar-upload").find('.imagePreview').attr('src', value_img);
            $('#' + id_img).closest(".avatar-upload").find('.input-form-image').val(value_img);
            $('#' + id_img).closest(".avatar-upload").addClass('active');
            if ($('#' + id_img).closest(".attachments").hasClass("photos-img")) {
                $(".photos-img").append(`
                    <div class="col-md-3 new-box new-image ">
                        <div class="avatar-upload large-uploadImg">
                            <span class="deleteImg" onclick="deleteImg(this)"><i class="fa-regular fa-trash-can"></i></span>
                            <img class="imagePreview" src="" />
                            <input type="file" id="file-upload-image` + testId + `" name="images[]" class="imageUpload" accept=".png,.jpg,.jpeg">
                            <div class="avatar-edit">
                                <img class="icon" src="~/assets/img/camera.svg" />
                                <p>انقر للتحميل <span>الصوره</span></p>
                            </div>
                        </div>
                    </div>
                `);
            }
        };

        reader.readAsDataURL(file);
    }
}
    
    function deleteImg(e) {
    $(e).closest(".new-box").find(".imagePreview").attr("src", "");
    $(e).closest(".new-box").find(".imageUpload").attr("value", "");
    $(e).closest(".new-box").find('.input-form-image').val("");
    $(e).closest(".new-box").find(".large-uploadImg").removeClass("active");
}
function removeTag(e) {
    var tagElement = $(e).closest("span.tag");
    var tagText = tagElement.find("text").text().trim();
    tagElement.remove();
    var currentTags = $("#Tags").val().split(',');
    var updatedTags = currentTags.filter(tag => tag.trim() !== tagText);
    $("#Tags").val(updatedTags.join(','));

}
$("#user-name").text(localStorage.getItem("token"));
    $('.selectpicker').selectpicker();
