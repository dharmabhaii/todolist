


exports.getdate= function(){
    const today=new Date();
    const options ={
        weekday:'long',day:'numeric',month:'numeric',year:'numeric'
    }
     return today.toLocaleDateString("en-US",options);
}