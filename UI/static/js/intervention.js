var valid_token = localStorage.getItem('access-token');

//fetch all interventions
window.onload = function loadinterventions(){
    fetch("http://127.0.0.1:5000/api/v1/interventions",{
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
                	interventionId = message['data'][item].id
                    records+=`<div class="redflag-content"><item1><img src="static/images/intervention2.jpg"></item1>
                    <item2><h1>${message['data'][item].title}</h1><blockquote>${message['data'][item].description} <a href="recorddet.html">more</a></blockquote><p><span class="label">Latitude: ${message['data'][item].latitude}</span> &nbsp&nbsp&nbsp&nbsp&nbsp<span class="label">Longitude: ${message['data'][item].longitude}</span></p>
                    </item2><p><span class="label">Status: ${message['data'][item].status}</span> </p><span class="view-buttons">
                        <form>
                            <span class="delete"><input type="button" value="Delete" onclick="delet()"></span>
                            <span class="primary-button"><input onclick="poplocation()" type="button" value="change lat-long"></span>
                        </form>
                        <form><span class="location" id="loc"><input type="text" placeholder="New longitude" id="new_long"></input>
                            <input type="text" placeholder="New latitude" id="new_lat"></input><input type="button" value="update" id="submit" onclick="updatelocation(${interventionId})"></span></form>

                        <form><span class="location" id="del_loc"><input type="button" value="are you sure you want to delete!" style="color:red"></input><input type="button" value="cancel" id="submit" onclick="canc()"><input type="button" value="ok" id="submit" onclick="del(${interventionId})"><input type="hidden"></input></span></form>
                    </span></div>`

                }
                document.getElementById('interventions').innerHTML=records;
            }else if(message['message']==='intervention records not found'){
                records=`<h1>intervention records not found!</h1>`
                document.getElementById('interventions').innerHTML=records;
            }else{
                records=`<h1>token has expired please login again!</h1>`
                document.getElementById('interventions').innerHTML=records;
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

function updatelocation(interventionId){
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

    fetch(`http://127.0.0.1:5000/api/v1/interventions/${interventionId}/location`,{
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

            if(message['data'][0]['message'] ==="updated intervention record's location"){
                alert("updated intervention record's location");
                window.location.replace('viewIntervention.html');
            }

        });

}

function del(interventionId){
    fetch(`http://127.0.0.1:5000/api/v1/interventions/${interventionId}`,{
        method:'DELETE',
        headers:{
            'Content-type':'application/json',
            'x-access-token':valid_token
        },
    }).then((response)=> response.json())
        .then(function (message){

            if(message['data'][0]['message'] ==='intervention record has been deleted'){

                alert('intervention record has been deleted')
                window.location.replace('viewIntervention.html');
            }

        });
}

function canc(){
    window.location.replace('viewIntervention.html');
}