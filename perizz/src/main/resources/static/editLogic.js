$(document).ready(function () {
    // edit halaman fasilitas
    $('.buton-edit').on('click', function(event) {
        event.preventDefault();

        var href = $(this).attr('href');

        $.get(href, function(menuData) {
            // Use the fasilitasData object instead of 'fasilitas'
            $('#idEdit').val(menuData.id);
            $('#namefasilitas').val(menuData.namaMenu);
            $('#Harga').val(menuData.hargaMenu);
            $('#gambarBeforeEdit').val(menuData.ImageFileName);
            $('#gambarEdit').attr('src', '/images/' + menuData.imageFileName);
            console.log(menuData.id);
            console.log(menuData.hargaMenu);
            console.log(menuData.namaMenu);
            console.log(menuData.imageFileName);

        });

        $('#editModal').modal();
    });

    $('.buton-edit-home').on('click', function(event) {
        event.preventDefault();

        var href = $(this).attr('href');

        $.get(href, function(homeData) {
            // Use the fasilitasData object instead of 'fasilitas'
            $('#idEdit').val(homeData.id);
            $('#gambarBeforeEdit').val(homeData.ImageFileName);
            $('#gambarEdit').attr('src', '/images/' + homeData.imageFileName);
            console.log(homeData.id);
            console.log(homeData.imageFileName);

        });
        $('#editModal').modal();
    });

    $('#editForm-home').on('submit', function(event) {
        event.preventDefault();

        var formData = new FormData(this);

        $.ajax({
            url: $(this).attr('action'),
            type: 'POST',
            data: formData,
            processData: false,  // jQuery tidak memproses data
            contentType: false,  // jQuery tidak mengatur konten type
            success: function(response) {
                // Lakukan sesuatu setelah berhasil diupdate, seperti menutup modal dan refresh data
                $('#editModal').modal('hide');
                location.reload(); // Refresh halaman untuk melihat perubahan
            },
            error: function(jqXHR, textStatus, errorThrown) {
                for (const value of formData.values()) {
                    console.log(value);
                }
                console.log("Error: " + textStatus + " " + errorThrown);
                // Tampilkan pesan error atau lakukan sesuatu
            }
        });
    });

    $('.buton-edit-komentar').on('click', function(event) {
        event.preventDefault();

        var href = $(this).attr('href');

        $.get(href, function(komentarData) {
            // Use the fasilitasData object instead of 'fasilitas'
            $('#idEdit').val(komentarData.id);
            $('#statusTampil option').each(function() {
                if ($(this).val() == komentarData.status) {
                    $(this).prop('selected', true);
                }
            });
            console.log(komentarData.id);
            console.log(komentarData.status)
            console.log('Status dari database:', komentarData.status);

        });
        $('#editModal').modal();
    });
});