var valid_token = localStorage.getItem('access-token');

function addIncident(){
    //capturing user data
    var title=document.getElementById('title').value;
    var incidentType=document.getElementById('incidentType').value;
    var description=document.getElementById('description').value;
    var latitude=document.getElementById('latitude').value;
    var longitude = document.getElementById("longitude").value;

    //form validation
    if(title ==''){
        alert("please enter title");
        return false
    }
    if(description ==''){
        alert("please enter description");
        return false
    }
    if(latitude ==''){
        alert("please enter latitude");
        return false
    }
    if(longitude ==''){
        alert("please enter longitude");
        return false
    }

    //posting to the database

    var inc_data = {
        title:title,
        incidentType:incidentType,
        description:description,
        latitude:latitude,
        longitude:longitude
    }

    fetch('http://127.0.0.1:5000/api/v1/incidents',{
        method:'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type':'application/json',
            'x-access-token':valid_token
        },
        body:JSON.stringify(inc_data)
    })
        .then((response) => response.json())
        .then(function(message){

            if(message['message']=== 'please enter incidentType as red-flag or intervention'){
                alert('please select incident type');
                return false
            }
            else if(message['data'][0]['message']==='created incident record'){
                alert('created incident record');
            }

        });
}
