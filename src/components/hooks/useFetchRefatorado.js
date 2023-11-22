import {useState, useEffect} from 'react';  //importando useState e useEffect para requisição assíncrona

// 4- custom hook
export const useFetchRefatorado = (url) =>{        //construindo a função useFetch que recebe uma (url) como parâmetro
const [data, setData] = useState(null)  //definindo um valor inicial nulo ao data, pois nao se tem o valor do fetch
// 5 - refatorando o post

const [config, setConfig] = useState(null);
const [method, setMethod] = useState(null);
const [callFetch, setCallFetch] = useState(false);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [itemId, setItemId] = useState(null);
const httpConfig = (data, method) => {
    if (method === "POST"){
        setConfig({
            method,
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        });
        setMethod(method);
    } else if (method === "DELETE") {
        setConfig({
        method,
        headers:{
            "Content-type": "application/json"
        },
    });
    setMethod(method);
    setItemId(data);
}
}



useEffect(()=>{
const fetchData = async () => {            //fetch(url) recebe uma url como parametro, e faz uma requisição assincrona
    setLoading(true);
    try {
    const res = await fetch(url);          //await aguarda o retorno da requisição, continuando o codigo depois da resposta
    const JsonResposta = await res.json();    //Resposta da Requisição (res.json() transforma a resposta json do fetch em um objeto JS)
    setData(JsonResposta); // atribui o objeto Json a variavel data
    } catch(error){
        console.log(error.message);
        setError("Houve algum erro ao carregar os dados!");
    }
    setLoading(false);
}
fetchData()    // Chamando a Função fetchData()

}, [url, callFetch]);

//5 refatorando post

useEffect(() => {
 const httpRequest = async () =>{
    let json
    if(method === "POST"){
        let fetchOptions = [url, config];
        const res = await fetch(...fetchOptions);
        json = await res.json();
        setCallFetch(json);
 }  else if (method === "DELETE"){
    const deleteUrl = `${url}/${itemId}`
    const res = await fetch(deleteUrl, config)
    json = await res.json()
    
 }
 setCallFetch(json)

 };
 httpRequest();
}, [config,method, url, itemId])

return { data, httpConfig, loading, error };

}

/* Para utilizar ele em app.js
import {useFetch} from "./hooks/useFetch";

function App() {

    const {data} = useFetch(url);  ||   const {data:items}(renomeando data para items) = useFetch(url);
    console.log(data) <exibe o objeto que antes era Json recebido pelo Fetch





*/