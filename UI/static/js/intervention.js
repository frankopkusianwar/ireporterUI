var valid_token = localStorage.getItem('access-token');

//fetch all interventions
window.onload = function loadinterventions(){
    fetch("https://ireporter-challenge4.herokuapp.com/api/v1/interventions",{
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
                    records+=`<div class="redflag-content"><item1><img src="static/images/intervention2.jpg"></item1>
                    <item2><h1>${message['data'][item].title}</h1><blockquote>${message['data'][item].description} <a href="recorddet.html">more</a></blockquote><p><span class="label">Latitude: ${message['data'][item].latitude}</span> &nbsp&nbsp&nbsp&nbsp&nbsp<span class="label">Longitude: ${message['data'][item].longitude}</span></p>
                    </item2><p><span class="label">Status: ${message['data'][item].status}</span> </p><span class="view-buttons">
                        <form>
                            <span class="delete"><input type="submit" value="Delete"></span>
                            <span class="primary-button"><input type="submit" value="change lat-long"></span>
                        </form>
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