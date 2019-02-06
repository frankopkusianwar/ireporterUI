function login(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if(username ==''){
        alert("please enter username");
        return false
    }
    if(password ==''){
        alert("please enter password");
        return false
    }

    var login_data={
        username:username,
        password:password
    };

    fetch("https://ireporter-challenge4.herokuapp.com/api/v1/login",{
        method:'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify(login_data)
    }).then((response)=>response.json())
        .then((message)=>{

            if(message['access-token']){
                window.location.replace('profile.html');
                //storing data locally in the browser
                var token = message['access-token'];
                localStorage.setItem('access-token', token);
                localStorage.setItem('user', username);
                alert(str);

            }else if(message['message']==='username does not exist please register'){
                alert('invalid username!');
               return false
            }else{
                alert('invalid password');
               return false
            }
    });
}

