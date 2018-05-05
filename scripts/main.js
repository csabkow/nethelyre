$(document).ready(function() {
    var url = $(location).attr('protocol') + '//' + $(location).attr('hostname') + '/';
    
    $('.login').click(function () {
        var username = $('#username').val();
        var password = $('#password').val();
        
        if(username !== '' && password !== '') {
            $.ajax({
                type: 'post',
                url: url + 'ajax.php?action=login',
                data: { username: username, password: password },
                dataType: 'json'
            })
            .done(function(result) {
                if(result.code === 1) {
                    alert('Sikeres bejelentkezés');
                    location.href = "http://csabioldala.nhely.hu/";
                } else {
                    alert(result.message);
                }
            })
            .fail(function() {
                alert('Probléma akadt az oldallal, próbálkozz később!');
            });
        } else {
            alert('Hiányos adatok');
        }
    });
    
    $('.registration').click(function () {
        var username = $('#username').val();
        var password = $('#password').val();
        var repassword = $('#repassword').val();
        var email = $('#email').val();
        
        if(username !== '' && password !== '' && email !== '' && password === repassword) {
            $.ajax({
                type: 'post',
                url: url + 'ajax.php?action=register',
                data: { username: username, password: password, repassword: repassword, email: email },
                dataType: 'json'
            })
            .done(function(result) {
                if(result.code === 1) {
                    alert("Sikeres regisztráció");
                    location.href = "http://csabioldala.nhely.hu/";
                } else {
                    alert(result.message);
                }
            })
            .fail(function() {
                alert('Probléma akadt az oldallal, próbálkozz később!');
            });
        }
    });
    
    $('#logout').click(function () {
        $.ajax({
            type: 'get',
            url: url + 'ajax.php?action=logout',
            dataType: 'json'
        })
        .done(function(result) {
            if(result.code === 1) {
                location.href = "http://csabioldala.nhely.hu/";
            } else {
                alert('Probléma akadt az oldallal, próbálkozz később!');
            }
        })
        .fail(function() {
            alert('Probléma akadt az oldallal, próbálkozz később!');
        });
    });
    
    $('#add').click(function () {
        var review = $('.review-text').val();
        $.ajax({
            type: 'post',
            url: url + 'ajax.php?action=review',
            data: { review: review },
            dataType: 'json'
        })
        .done(function(result) {
            if(result.code === 1) {
                var list = result.review + $('.review-list').html();
                $('.review-list').html(list);
            } else {
                alert('Probléma akadt az oldallal, próbálkozz később!');
            }
        })
        .fail(function() {
            alert('Probléma akadt az oldallal, próbálkozz később!');
        });
    });
});

