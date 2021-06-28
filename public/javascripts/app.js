$(function(){

    $("#fetchdata").on('click', function(){
        $.get( "/fetchdata", function( data ) {
            var user = data['data'];
            $("#trdata").html('');
            $("#message").hide();
            var string = '';
            $.each(user, function(index, user ) {

                string += '<tr><td>'+(index+1)+'</td><td>'+user['first_name']+'</td><td>'+user['last_name']+'</td><td>'+user['email']+'</td><td>'+user['mobile_number']+'</td><td>'+user['date_of_birth']+'</td><td>'+user['gender']+'</td><td>'+user['permanent_address']+'</td><td>'+user['optional_address']+'</td></tr>';
            });

            $("#trdata").html(string);
        });
    });
 
    $("#importdata").on('click', function(){
        $.get( "/import", function( data ) {
            $("#message").show().html(data['success']);
        });
    });

}); 