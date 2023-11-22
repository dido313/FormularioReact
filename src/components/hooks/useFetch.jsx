import {useState, useEffect} from 'react';  //importando useState e useEffect para requisição assíncrona
import React from 'react';
// 4- custom hook
export const useFetch = (url) =>{        //construindo a função useFetch que recebe uma (url) como parâmetro
const [data, setData] = useState(null)  //definindo um valor inicial nulo ao data, pois nao se tem o valor do fetch

useEffect(()=>{
const fetchData = async () => {            //fetch(url) recebe uma url como parametro, e faz uma requisição assincrona
    const res = await fetch(url)          //await aguarda o retorno da requisição, continuando o codigo depois da resposta
    const JsonResposta = await res.json()    //Resposta da Requisição (res.json() transforma a resposta json do fetch em um objeto JS)
    setData(JsonResposta) // atribui o objeto Json a variavel data

}
fetchData()    // Chamando a Função fetchData()

}, [url])

return { data };

}

/* Para utilizar ele em app.js
import {useFetch} from "./hooks/useFetch";

function App() {

    const {data} = useFetch(url);  ||   const {data:items}(renomeando data para items) = useFetch(url);
    console.log(data) <exibe o objeto que antes era Json recebido pelo Fetch





*/