function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('url_name').value
    if(Client.checkForName(formText)) {

    console.log("::: Form Submitted :::")
    const sendData = async (url = "", newdata = {}) => {
        console.log('Analyzing:', newdata);
        const res = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            mode: 'cors',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(newdata)
        });
        try {
            const data = await res.json();
            console.log('data received:', data)
            return data;
        } catch (error) {
            console.log('error', error);
        }
    };
    
    sendData('http://localhost:8080/test', {url: formText})
    /*fetch('http://localhost:8080/test',{url_name: formText}) ,{
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({text: input_url[0].value})
    }
    
    .then(res => res.json())*/
    .then(function(res) {
      
        console.log(res); 

        
            document.getElementById("polarity_text").innerHTML = res.polarity;
            document.getElementById("subjectivity_text").innerHTML = res.subjectivity_text;
            document.getElementById("agreement-text").innerHTML = res.agreement-text;
            document.getElementById("confidence-text").innerHTML = res.confidence-text;
            document.getElementById("irony-text").innerHTML = res.irony-text;
        
    })
}
}

export { handleSubmit }
/*function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    checkForName(formText)

    console.log("::: Form Submitted :::")
    fetch('http://localhost:8080/test')
    .then(res => res.json())
    .then(function(res) {
        document.getElementById('results').innerHTML = res.message
    })
}

export { handleSubmit }*/
