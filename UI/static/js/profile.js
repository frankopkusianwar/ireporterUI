var valid_token = localStorage.getItem('access-token');


// window.onload = function loadinterventions(){
//     fetch("http://127.0.0.1:5000/api/v1/interventions",{
//         method:'GET',
//         headers:{
//             'Content-type':'application/json',
//             'x-access-token':valid_token
//         },
//     }).then((response)=> response.json())
//         .then(function (message){
//             if(message['data']){
//                 var item
//                 records=``
//                 for (item = 0; item < message['data'].length; item++){
//                     records+=`<a href="viewIntervention.html"><h3>${message['data'][item].title}</h3>`

//                 }
//                 document.getElementById('list').innerHTML=records;
//             }else if(message['message']==='intervention records not found'){
//                 records=`<h1>intervention records not found!</h1>`
//                 document.getElementById('list').innerHTML=records;
//             }else{
//                 records=`<h1>token has expired please login again!</h1>`
//                 document.getElementById('list').innerHTML=records;
//             }

//         });
// }

window.onload = function loadFlags(){
    fetch("http://127.0.0.1:5000/api/v1/red-flags",{
        method:'GET',
        headers:{
            'Content-type':'application/json',
            'x-access-token':valid_token
        },
    }).then((response)=> response.json())
        .then(function (message){
            if(message['data']){
                var item
                records=``
                for (item = 0; item < message['data'].length; item++){
                    records+=`<a href="viewFlag.html"><h3>${message['data'][item].title}</h3>`

                }
                document.getElementById('list2').innerHTML=records;
            }

        });
}