$(document).ready(function(){
	$('.loader').hide();
	$("#content").hide();
	$('#otherProfileButton').hide();
	
	
    function getResponse(){
    	var myToken = $('#graphApiToken').val();
    	

        $.ajax("https://graph.facebook.com/v2.11/me?fields=id%2Cname%2Cabout%2Caddress%2Cbirthday%2Ceducation%2Cemail%2Cgender%2Chometown%2Cinterested_in%2Clanguages%2Cwork%2Crelationship_status%2Cbooks%2Csports%2Cfriends%2Clikes%2Cpicture%2Cposts%7Bdescription%2Cfull_picture%2Cwith_tags%2Cstory%2Ccreated_time%7D&access_token=" + myToken,{
        		

                success : function(response){
                	$('.token').removeClass('token-pos');
                    console.log(response);
                    //$(".profile").html('<h1>'+ response.name + '</h1>' + '<p>'+ response.about + '</p>');
                    $("#name").text(response.name);
                    $("#profilePic").html("<img class ='profilePic' src = '"+ response.picture.data.url +"'>");
                    $("#About").text(check(response.about)?response.about:"Not specified");
                    $("#Gender").text(check(response.gender)?response.gender:"Not specified");
                    $("#Birthday").text(check(response.birthday)?response.birthday:"Not specified");
                    $("#Work").text(check(response.work)?response.work:"Not specified");
                    //$("#Education").html("<ul> <li> " + "<span>"+ response.education[0].type +" : </span>"+	check(response.education[0].type)?response.education[0].school.name:'Not specified' + "</li>" + "<li> " + "<span>"+ response.education[1].type+" : </span>"+ check(response.education[1])?response.education[1].school.name:'Not specified' + "</li> </ul>");
                    $("#Email").text(check(response.email)?response.email:"Not specified");
                    $("#Hometown").text(check(response.hometown.name)?response.hometown.name:"Not specified");
                    $("#Interested").text(check(response.interested_in)?response.interested_in:"Not specified");
                    //$("#Languages").text(response.languages[0].name + " And " + response.languages[1].name );
                    $("#RelationshipStatus").text(check(response.relationship_status)?response.relationship_status:"Not specified");
                   
                    if(!check(response.languages)){
                    	$('#Languages').append("Not specified");
                    }else{
                    	$.each(response.languages,function(index,item){
                    	
                    		$('#Languages').append(item.name + " ");
                                                            
                    	
                    });
                    }

                    
                    $.each(response.education,function(index,item){
                    	if(check(item.school.name)){
                    		$("#schoolList").append("<li class='list-group-item'>" + item.type + " : " + item.school.name + "</li>");	
                    	}else{
                    		$("#schoolList").append("<li class='list-group-item'>" + item.type + " : " + "Not Specified" + "</li>");
                    	}
                    	
                    });



                    $.each(response.likes.data,function(index,item){

                   	if(check(item.name)){
                    		$("#likesList").append("<li class='list-group-item'>"+ item.name +"</li>");	
                    	}else{
                    		$("#likesList").append("<li class='list-group-item'>"+ "No Likes" +"</li>");
                    	}

                   	

                   });
					
                    $.each(response.friends.data,function(index,item){

                   	    if(check(item.name)){
                    		$("#friendsList").append("<li class='list-group-item'>"+ item.name +"</li>");	
                    	}else{
                    		$("#friendsList").append("<li class='list-group-item'>"+ "No Friends" +"</li>");
                    	}

					}); 

					$.each(response.posts.data,function(index,item){
						var post_time = new Date(item.created_time);
						if(item.full_picture != undefined){
							//console.log(post_time.toUTCString());
							$("#feed").append("<li class = 'list-group-item'>"+ item.story + " "+"</br>"+ "<span>"+ "Posted on "+post_time.toUTCString().substring(4,16)+ "</span>" +"</br>" +"<img src='"+ item.full_picture+"'/>" +"</li>");		
						}else{
							$("#feed").append("<li class = 'list-group-item'>"+ item.story + " "+"</br>" + "<span>"+ "Posted on "+post_time.toUTCString().substring(4,16)+ "</span>" +"</br>" +"</li>");
						}
                   	

                   });
					

					function check(data){
						return (data != undefined)?true:false;
					} //to check if data is present or not	
                    
                    

                },
                error : function(request,errorType,errorMessage){

                    console.log(request);
                    console.log(request.responseJSON.error.message);
                    $('#otherProfileButton').text("Home");
                    $('#content').html("<h3 class='text-center'>"+request.responseJSON.error.message + "</h3>" + "<br/>" + "<h4 class='text-center'>Click 'Home' button above to enter correct token or to check other profile</h4>");
                },

                

                timeout:5000, // in ms

                beforeSend : function(){

                    $('#form').hide();
					$('.loader').show();

                },

                complete : function(){

                   $('.loader').hide();
                   $('#content').show();
                   $('#otherProfileButton').show();
                   
                }

            }//end argument list 



        );// end ajax call 


    }// end get facebook info

	

	$("#submitButton").on('click',getResponse);
	$('#otherProfileButton').on('click',function(){
		
		location.reload(true);

		
	});
	

});