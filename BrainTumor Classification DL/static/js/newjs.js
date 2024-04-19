$(document).ready(function () {
    // Init
    $('.image-section').hide();
    $('.loader').hide();
    $('#result').hide();
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#imagePreview').attr( 'src', e.target.result );
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#imageUpload").change(function () {
        $('.image-section').show();
        $('#btn-predict').show();
        $('#result').text('');
        $('#result').hide();
        readURL(this);
    });
    // Predict
    $('#btn-predict').click(function () {
        var form_data = new FormData($('#upload-file')[0]);

        // Show loading animation
        $(this).hide();
        $('.loader').show();

        // Make prediction by calling api /predict
        $.ajax({
            type: 'POST',
            url: '/predict',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                $('.loader').hide();
                $('#result').fadeIn(600);
                // $('#result').text(' Result:  ' + data);
                if (data == 'No Brain Tumor') {
                    // $('#result').text(' Result: Yes Brain Tumor');
                    $('#result').text("Malheureusement, il y a une forte probabilite d'une tumeur cérébrale. Il faut maintenant faire face à cette réalité avec courage et détermination.");

                } else {
                    $('#result').text("Heureusement, il y a une faible probabilité d'une tumeur cérébrale. Mais il est toujours important de rester vigilant pour préserver votre santé mentale et physique.");
                }
            
                console.log('Success!');
            },
        });
    });

});
