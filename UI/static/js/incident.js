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

    fetch('https://ireporter-challenge4.herokuapp.com/api/v1/incidents',{
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

            if(message['message']=== 'token missing'){
                alert('token missing');
                return false
            }
            if(message['message']=== 'invalid token'){
                alert('invalid token');
                return false
            }
            if(message['message']=== 'please enter incidentType as red-flag or intervention'){
                alert('please select incident type');
                return false
            }
            else if(message['data'][0]['message']==='created incident record'){
                if (incidentType == 'red-flag'){
                    window.location.replace('viewFlag.html');
                }
                else{
                    window.location.replace('viewIntervention.html');
                }
            }

        });
}

// fetch all red-flags
window.onload = function loadRedFlags(){
    fetch("https://ireporter-challenge4.herokuapp.com/api/v1/red-flags",{
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
                for (item = message['data'].length-1; item >= 0; item--){
                    redflagId = message['data'][item].id
                    red_status = message['data'][item].status
                    if(red_status ==='draft'){
                        records+=`<div class="redflag-content"><item1><img src="static/images/coruption1.jpg"><span class="location" id="edit_txt">
                                </br></br><textarea rows="8" id="new_com">${message['data'][item].description}</textarea></br></br><input type="button" value="update" id="submit" onclick="updatecomment(${redflagId})"></span></item1>
                        <item2><h1>${message['data'][item].title}</h1><blockquote>${message['data'][item].description} <a href="recorddet.html">Read more...</a>&nbsp&nbsp&nbsp&nbsp&nbsp<a href="#" onclick=popText()>edit text</a></blockquote><p><span class="label">Latitude: ${message['data'][item].latitude}</span> &nbsp&nbsp&nbsp&nbsp&nbsp<span class="label">Longitude: ${message['data'][item].longitude}</span></p>
                        </item2><p><span class="label">Status: ${message['data'][item].status}</span> </p><span class="view-buttons">
                            <form>
                                <span class="delete"><input type="button" value="Delete" onclick="delet()"></span>
                                <span class="primary-button"><input onclick="poplocation()" type="button" value="change lat-long"></span>
                            </form>
                            <form><span class="location" id="loc"><input type="text" placeholder="New longitude" id="new_long"></input>
                                <input type="text" placeholder="New latitude" id="new_lat"></input><input type="button" value="update" id="submit" onclick="updatelocation(${redflagId})"></span></form>

                            <form><span class="location" id="del_loc"><input type="button" value="are you sure you want to delete!" style="color:red"></input><input type="button" value="cancel" id="submit" onclick="canc()"><input type="button" value="ok" id="submit" onclick="del(${redflagId})"></span></form>
                        </span></div>`
                    }else{
                        records+=`<div class="redflag-content"><item1><img src="static/images/coruption1.jpg"></item1>
                        <item2><h1>${message['data'][item].title}</h1><blockquote>${message['data'][item].description} <a href="recorddet.html">more</a></blockquote><p><span class="label">Latitude: ${message['data'][item].latitude}</span> &nbsp&nbsp&nbsp&nbsp&nbsp<span class="label">Longitude: ${message['data'][item].longitude}</span></p>
                        </item2><p><span class="label">Status: ${message['data'][item].status}</span> </p></div>`
                    }

                }
                document.getElementById('redflags').innerHTML=records;
            }else if(message['message']==='red-flag records not found'){
                records=`<h1>red-flag records not found!</h1>`
                document.getElementById('redflags').innerHTML=records;
            }else{
                records=`<h1>token has expired please login again!</h1>`
                document.getElementById('redflags').innerHTML=records;
            }

        });
}

function poplocation(){
    var popup = document.getElementById("loc");
    popup.classList.toggle("show");
}

function delet(){
    var popup = document.getElementById("del_loc");
    popup.classList.toggle("show");
}

function popText(){
    var popup = document.getElementById("edit_txt");
    popup.classList.toggle("show");
}

function updatelocation(redId){
    var new_lat=document.getElementById('new_lat').value;
    var new_long=document.getElementById('new_long').value;

    if(new_lat ==''){
        alert("please enter new latitude");
        return false
    }
    if(new_long ==''){
        alert("please enter new longitude");
        return false
    }

    var inc_data = {
        latitude:new_lat,
        longitude:new_long
    }

    fetch(`https://ireporter-challenge4.herokuapp.com/api/v1/red-flags/${redId}/location`,{
        method:'PATCH',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type':'application/json',
            'x-access-token':valid_token
        },
        body:JSON.stringify(inc_data)
    })
        .then((response) => response.json())
        .then(function(message){

            if(message['data'][0]['message'] ==="updated red-flag record's location"){
                alert("updated red-flag record's location");
                window.location.replace('viewFlag.html');
            }

        });

}

function del(redId){
    fetch(`https://ireporter-challenge4.herokuapp.com/api/v1/red-flags/${redId}`,{
        method:'DELETE',
        headers:{
            'Content-type':'application/json',
            'x-access-token':valid_token
        },
    }).then((response)=> response.json())
        .then(function (message){

            if(message['data'][0]['message'] ==='red-flag record has been deleted'){

                alert('red-flag record has been deleted')
                window.location.replace('viewFlag.html');
            }

        });
}

function canc(){
    window.location.replace('viewFlag.html');
}

function updatecomment(redId){
    var new_comment=document.getElementById('new_com').value;

    var inc_data = {
        comment:new_comment

    }

    fetch(`https://ireporter-challenge4.herokuapp.com/api/v1/red-flags/${redId}/comment`,{
        method:'PATCH',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type':'application/json',
            'x-access-token':valid_token
        },
        body:JSON.stringify(inc_data)
    })
        .then((response) => response.json())
        .then(function(message){

            if(message['data'][0]['message'] ==="updated red-flag record's comment"){
                alert("updated red-flag record's comment");
                window.location.replace('viewFlag.html');
            }

        });
}
