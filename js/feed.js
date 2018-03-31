let myFbToken;
$(document).ready(()=>{
  
  /*Uer input*/
$('#get').trigger('click');

$('#go').click(()=> {
  myFbToken=$('#token').val();
  
  if (myFbToken == null || myFbToken == "") {
         swal({
                  title:`Oops!` ,
                  text: `No User Token Found`,
                  type: `error`,                             //Used template literal
                   confirmButtonText: `Ok`
                  });
        

    } 
  else {

       getfeed();
       
    } // end if condition

  });

 });/*end of document ready function*/


 let getfeed=()=>{
 	      
           $.ajax({
           type:"GET",
           url:"https://graph.facebook.com/me?fields=name,picture.type(large),posts{created_time,type,full_picture,story,message,source}&access_token="+myFbToken,

           success:(data) => {
           	//Posts
           	  if(_.has(data, 'posts')){

           	  	  $.each( data.posts.data, ( key, value ) => {
                      $('.posts').append('<div class="col-lg-11 col-lg-offset-1 col-md-10 col-sm-10 col-xs-10 thumbnail post-info">'+
                      	'<span class="feed-head"><img src="#" class="my-profile  img-circle">&nbsp&nbsp'+
                      	value.story+'</span><br/>'+
                      	'<br/><img src='+value.full_picture+' class="img-responsive pull-left" style="width:300px;height:300px">'+
                      	'</div>');
                      

           	  	  });
                 



           	  }
           	  //Profile picture
           	   if(propExist(data, 'picture')){
                    $('.feed-profile').attr('src', data.picture.data.url);
                    $('.my-profile').attr('src', data.picture.data.url);

                }
                 //Profile Name
                 if(propExist(data, 'name')){
                    $('.name strong').text(data.name.charAt(0).toUpperCase()+data.name.slice(1));
                }
               
              },
               error : (request,errorMessage) =>{
            	 var responseText = jQuery.parseJSON(request.responseText);
          				            	    swal({
          				  title:"status " +request.status ,
          				  text: responseText.error.message,
          				   type: 'error',
                          confirmButtonText: 'Ok'
          				});
          				                    
              },

               timeout:3000, // in ms
               beforeSend : () =>{
                   $('.fa-pulse').show();
                  

                  },

              complete : () =>{
                    $('.fa-pulse').hide();
                 

                  }



       });



 }


/*function to check whther that property exist and it is not null*/
let propExist=(data,propName)=> {
    if(_.has(data,propName) && !(_.isNil(propName))){
          return true;


    }
    else{
      return false;
    }
}
