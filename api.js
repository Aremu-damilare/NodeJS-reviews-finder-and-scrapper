

function sendToEndPoint(endPoint, productList){

    fetch(endPoint, {
        method: "POST",
        body: JSON.stringify({"data": productList}),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      })
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.log(err))  
      
}