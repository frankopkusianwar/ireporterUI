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

    fetch("http://127.0.0.1:5000/api/v1/login",{
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
                alert('username does not exist please register');
               return false
            }else{
                alert('invalid password');
               return false
            }
    });
}
