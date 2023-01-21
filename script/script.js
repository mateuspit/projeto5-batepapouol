let lindoNome= {}; //let pois pode variar se o usuario errar
let lindoNomePromise; //let pois pode variar se o usuario errar
let chatLogGlobal; //let pois varia a cada periodo de tempo definido pelo exercicio
let startRefreshChat = 0;

function lindoNomeErrorResponse(){
    lindoNome.name = prompt("Digite novamente seu nome?"); //Ocorreu um erro ao entrar com nome, provavelmente existe um nome igual a entrada
    lindoNomePromise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', lindoNome); //Tentativa de entrar com outro nome    
    lindoNomePromise.then(lindoNomeSucessResponse); //Analisar sucesso
    lindoNomePromise.catch(lindoNomeErrorResponse); //Analisar erro
}

function keepingOnline(){
    console.log("Mantendo online"); 
    // console.log(lindoNome.name);
    lindoNomePromise = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', lindoNome); //Mandando aviso que o nick escolhido ainda esta online
}

function lindoNomeSucessResponse(){
    setInterval(keepingOnline, 5000); //Repetir função que avisa o servidor que ainda estamos online
}

function nickAnalyze(){
    lindoNome.name = prompt("Qual seu nome?"); //Primeira pergunta de nome
    lindoNomePromise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', lindoNome); //Envia nome escolhido
    lindoNomePromise.then(lindoNomeSucessResponse); //Analisar sucesso
    lindoNomePromise.catch(lindoNomeErrorResponse); //Analisar erro
}

function plotChat(plotChatLog){
    let mainHTML = "";
    // chatLogGlobal = chatLogFunction;
    mainHTML = document.querySelector("main");
    mainHTML.innerHTML = "";
    console.log("plot");
    chatLogGlobal = plotChatLog;
    for(let i = 0; i < chatLogGlobal.data.length; i++){
        switch (chatLogGlobal.data[i].type) {
            case "status":
                mainHTML.innerHTML += `
                    <div class="outputSpace joinAndLeftLayout">
                        <div class="time">
                            ${chatLogGlobal.data[i].time}                        
                        </div>
                        <div class="output">
                        <span>${chatLogGlobal.data[i].from}</span> ${chatLogGlobal.data[i].text} 
                        </div>
                    </div>                
                `;
                break;
            case "message":
                mainHTML.innerHTML += `
                    <div class="outputSpace">
                        <div class="time">
                            ${chatLogGlobal.data[i].time}                         
                        </div>
                        <div class="output">
                            <span>${chatLogGlobal.data[i].from}</span> para <span>${chatLogGlobal.data[i].to}</span>: ${chatLogGlobal.data[i].text}
                        </div>
                    </div>
                `;
                break;
            case "private_message":
                mainHTML.innerHTML += `
                    <div class="outputSpace privateMessageLayout">
                        <div class="time">
                            ${chatLogGlobal.data[i].time} 
                        </div>
                        <div class="output">
                        <span>${chatLogGlobal.data[i].from}</span> reservadamente para <span>${chatLogGlobal.data[i].to}</span>: ${chatLogGlobal.data[i].text}  
                        </div>
                    </div>
                `;
                break;
        } //switch end
    }
}

function refreshChat(chatLogFunction){
    console.log("3s");
    chatPromise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    chatPromise.then(plotChat);
    chatPromise.catch(chatErrorResponse);
}

function chatSucessResponse(chatLogFunction){
    let mainHTML = "";
    // chatLogGlobal = chatLogFunction;
    mainHTML = document.querySelector("main");
    mainHTML.innerHTML = "";
    for(let i = 0; i < chatLogFunction.data.length; i++){
        // mainHTML.innerHTML += `<div>${chatLogGlobal.data[i].time}</div>`
        // console.log(chatLogGlobal.data[i].type);
        switch (chatLogFunction.data[i].type) {
            case "status":
                mainHTML.innerHTML += `
                    <div class="outputSpace joinAndLeftLayout">
                        <div class="time">
                            ${chatLogFunction.data[i].time}                        
                        </div>
                        <div class="output">
                        <span>${chatLogFunction.data[i].from}</span> ${chatLogFunction.data[i].text} 
                        </div>
                    </div>                
                `;
                break;
            case "message":
                mainHTML.innerHTML += `
                    <div class="outputSpace">
                        <div class="time">
                            ${chatLogFunction.data[i].time}                         
                        </div>
                        <div class="output">
                            <span>${chatLogFunction.data[i].from}</span> para <span>${chatLogFunction.data[i].to}</span>: ${chatLogFunction.data[i].text}
                        </div>
                    </div>
                `;
                break;
            case "private_message":
                mainHTML.innerHTML += `
                    <div class="outputSpace privateMessageLayout">
                        <div class="time">
                            ${chatLogFunction.data[i].time} 
                        </div>
                        <div class="output">
                        <span>${chatLogFunction.data[i].from}</span> reservadamente para <span>${chatLogFunction.data[i].to}</span>: ${chatLogFunction.data[i].text}  
                        </div>
                    </div>
                `;
                break;
        } //switch end
    } //for end   
    // if(startRefreshChat === 0){
        // startRefreshChat = 1;

    console.log("primeiro plot");
    setInterval(refreshChat,3000);
        
    // }
}

function chatErrorResponse(chatLog){ //analisar erro
    console.log("deu ruim");
}

function attChat(){
        
}

function renderChat(){
    // console.log("renderChat")
    chatPromise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    chatPromise.then(chatSucessResponse);
    chatPromise.catch(chatErrorResponse);
}


//RODANDO O PROGRAMA
nickAnalyze();
//keepingOnline
renderChat();






