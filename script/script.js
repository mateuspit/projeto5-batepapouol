let lindoNome= {}; //let pois pode variar se o usuario errar
let lindoNomePromise; //let pois pode variar se o usuario errar
let chatLogGlobal; //let pois varia a cada periodo de tempo definido pelo exercicio
let idIntervalParticipantsRefresh = 0;

function lindoNomeErrorResponse(){
    // lindoNome.name = prompt("Digite novamente seu nome?"); //Ocorreu um erro ao entrar com nome, provavelmente existe um nome igual a entrada
    lindoNomePromise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', lindoNome); //Tentativa de entrar com outro nome    
    lindoNomePromise.then(lindoNomeSucessResponse); //Analisar sucesso
    lindoNomePromise.catch(lindoNomeErrorResponse); //Analisar erro
}

function keepingOnline(){
    // console.log("Mantendo online"); 
    // console.log(lindoNome.name);
    lindoNomePromise = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', lindoNome); //Mandando aviso que o nick escolhido ainda esta online
}

function lindoNomeSucessResponse(){
    const elementFirstLayer = document.querySelector(".firstLayer");
    // const elementSecondLayer = document.querySelector(".secondLayer");
    const elementThirdLayer = document.querySelector(".thirdLayer");
    elementFirstLayer.classList.remove("hide");
    // elementSecondLayer.classList.remove("hide");
    elementThirdLayer.classList.add("hide");
    renderChat();
    setInterval(keepingOnline, 5000); //Repetir função que avisa o servidor que ainda estamos online
}

function nickAnalyze(){
    const inputNickTag = document.getElementById("nickInput");
    lindoNome = {name: inputNickTag.value};
    lindoNomePromise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', lindoNome); //Envia nome escolhido
    lindoNomePromise.then(lindoNomeSucessResponse); //Analisar sucesso
    lindoNomePromise.catch(lindoNomeErrorResponse); //Analisar erro
}

function plotChat(plotChatLog){
    let mainHTML = "";
    // chatLogGlobal = chatLogFunction;
    mainHTML = document.querySelector("main");
    mainHTML.innerHTML = "";
    // console.log("plot");
    chatLogGlobal = plotChatLog;
    for(let i = 0; i < chatLogGlobal.data.length; i++){
        switch (chatLogGlobal.data[i].type) {
            case "status":
                mainHTML.innerHTML += `
                    <div class="outputSpace joinAndLeftLayout" data-test="message">
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
                    <div class="outputSpace" data-test="message">
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
                // console.log("MSG PRIVADA");
                if(chatLogGlobal.data[i].from == lindoNome.name || chatLogGlobal.data[i].to == lindoNome.name){
                    mainHTML.innerHTML += `
                        <div class="outputSpace privateMessageLayout" data-test="message">
                            <div class="time">
                                ${chatLogGlobal.data[i].time} 
                            </div>
                            <div class="output">
                            <span>${chatLogGlobal.data[i].from}</span> reservadamente para <span>${chatLogGlobal.data[i].to}</span>: ${chatLogGlobal.data[i].text}  
                            </div>
                        </div>
                    `;
                }
                break;
        } //switch end
    } //for end
    mainHTML.innerHTML += `<div class="endScroll"></div>`;
    const elementoQueQueroQueApareca = document.querySelector('.endScroll');
    elementoQueQueroQueApareca.scrollIntoView();
}

function refreshChat(chatLogFunction){
    const chatPromise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
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
                    <div class="outputSpace joinAndLeftLayout" data-test="message">
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
                    <div class="outputSpace" data-test="message">
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
                if(chatLogFunction.data[i].from == lindoNome.name || chatLogFunction.data[i].to == lindoNome.name){
                    mainHTML.innerHTML += `
                        <div class="outputSpace privateMessageLayout" data-test="message">
                            <div class="time">
                                ${chatLogFunction.data[i].time} 
                            </div>
                            <div class="output">
                            <span>${chatLogFunction.data[i].from}</span> reservadamente para <span>${chatLogFunction.data[i].to}</span>: ${chatLogFunction.data[i].text}  
                            </div>
                        </div>
                    `;
                }
                break;
        } //switch end
    } // for end
    mainHTML.innerHTML += `<div class="endScroll"></div>`;
    const elementoQueQueroQueApareca = document.querySelector('.endScroll');
    elementoQueQueroQueApareca.scrollIntoView();
    setInterval(refreshChat,3000);
    setInterval(refreshUserList,10000);
}

function refreshUserList(){

}

function chatErrorResponse(chatLog){ //analisar erro
    console.log("deu ruim");
}

function renderChat(){
    chatPromise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    chatPromise.then(chatSucessResponse);
    chatPromise.catch(chatErrorResponse);
}

function sendMessage(){
    const inputTag = document.getElementById("textWrited");
    const inputValue = inputTag.value;
    inputTag.value = ""; //Limpando o que o usuario digitou
    const sendableObject = {
            from: lindoNome.name,
            to: "Todos",
            text: inputValue,
            type: "message"
        };

    const sendMessagePromise = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', sendableObject);
    sendMessagePromise.then(refreshChat); //mudar
    sendMessagePromise.catch(sendMessageErrorResponse);
}


function sendMessageErrorResponse(){
    window.location.reload();
}

function plotSideMenu(participantesResponse){
    const elementSideMenu = document.querySelector(".sideMenu");
    const participantesList = participantesResponse;

    console.log(participantesList);
    console.log(participantesList.data);
    console.log(participantesList.data[0]);
    console.log(participantesList.data[0].name);


    elementSideMenu.innerHTML = `
        <div class="headerSideMenu">
            Escolha um contato para enviar mensagem:
        </div>

        <div class="sideMenuOption">
            <div class="iconUserSideMenuOption">
                <div class="iconTodos">
                    <ion-icon name="people"></ion-icon>
                </div>
                <div class="textTodos">
                    Todos
                </div>
            </div>
            <div class="checkSideMenuOption">
                <ion-icon name="checkmark-sharp"></ion-icon>
            </div>                    
        </div>
    `;

    //colocar os participantes abaixo
    for(let i = 0; i < participantesList.data.length; i++){
        elementSideMenu.innerHTML += `
        <div class="sideMenuOption">
            <div class="iconUserSideMenuOption">
                <div class="iconUser">
                    <ion-icon name="person-circle"></ion-icon>
                </div>
                <div class="textUser">
                    ${participantesList.data[i].name}
                </div>         
            </div>  
            <div class="checkSideMenuOption hide">
                <ion-icon name="checkmark-sharp"></ion-icon>
            </div>          
        </div>        
        `;
    }
    

    //colocar os participantes acima

    elementSideMenu.innerHTML += `
    <div class="headerTwoSideMenu">
            Escolha a visibilidade:
        </div>

        <div class="sideMenuOption">
            <div class="iconUserSideMenuOption">
                <div class="iconPublic">
                    <ion-icon name="lock-open"></ion-icon>
                </div>
                <div class="textPublic">
                    Público
                </div>   
            </div>
            <div class="checkSideMenuOption">
                <ion-icon name="checkmark-sharp"></ion-icon>
            </div>                                        
        </div>

        <div class="sideMenuOption">
            <div class="iconUserSideMenuOption">
                <div class="iconPrivate">
                    <ion-icon name="lock-closed"></ion-icon>
                </div>
                <div class="textPrivate">
                    Reservadamente
                </div>   
            </div>
            <div class="checkSideMenuOption">
                <ion-icon name="checkmark-sharp hide"></ion-icon>
            </div>               
        </div>
    `;





        // <div class="sideMenuOption">
        //     <div class="iconUserSideMenuOption">
        //         <div class="iconUser">
        //             <ion-icon name="person-circle"></ion-icon>
        //         </div>
        //         <div class="textUser">
        //             João
        //         </div>         
        //     </div>  
        //     <div class="checkSideMenuOption hide">
        //         <ion-icon name="checkmark-sharp"></ion-icon>
        //     </div>          
        // </div>

    //     <div class="sideMenuOption">
    //         <div class="iconUserSideMenuOption">                    
    //             <div class="iconUser">
    //                 <ion-icon name="person-circle"></ion-icon>
    //             </div>
    //             <div class="textUser">
    //                 Maria
    //             </div>   
    //         </div>  
    //         <div class="checkSideMenuOption hide">
    //             <ion-icon name="checkmark-sharp"></ion-icon>
    //         </div>                 
    //     </div>

    //     
    // `;
}

function openSideMenu(){
    const elementSecondLayer = document.querySelector(".secondLayer");
    elementSecondLayer.classList.remove("hide");

    // console.log(elementSideMenu);

    const participantsPromise = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');

    // setInterval(participantsPromise.then(plotSideMenu),10000);
    participantsPromise.then(plotSideMenu);
}

function closeSideMenu(){
    const elementSecondLayer = document.querySelector(".secondLayer");
    elementSecondLayer.classList.add("hide");
}

document.getElementById("textWrited").addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        sendMessage();
    }
})

document.getElementById("nickInput").addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        nickAnalyze();
    }
})









