import React from 'react'
import {useState} from 'react'
import {useFetchRefatorado} from "../hooks/useFetchRefatorado";
import ExibirData from './ExibirData';
const PostInput = () => {

const [name, setName] = useState("");              
const [price, setPrice] = useState("");
const url = "http://localhost:3000/products";
const {data, httpConfig, loading, error } = useFetchRefatorado(url);

//handle name 
const handleName = (e) => {  
    setName(e.target.value);                         
 }       
//handle price
const handlePrice = (e) => { 
                                            
    setPrice(e.target.value);    
                                  
}
//handle submit
const handleSubmit = async (e) => {                          
    e.preventDefault();		                                 
    const product={      
    name,
    price,
     };  
                       
    httpConfig(product, "POST")                   
    setName(""); 
    setPrice("");}	

  return (<>
    <ExibirData dados={data} loading={loading} error={error}></ExibirData>
            
    <form onSubmit={handleSubmit}>  
	        <label>
        	     <span>Digite o produto:</span>  
        	     <input type='text' value={name} placeholder='digite seu nome:' onChange={handleName}/>  
				 </label>
        <label>
        	    <span>Digite o preço:</span>
        	    <input type='number' value={price} placeholder='digite o Preço:' onChange={handlePrice}/>       
				</label>
        {loading && <input type='submit'disabled value='Aguarde'/>}
        {!loading && <input type='submit' value='enviar'/> }          
      </form> </>
      //FORM
  )
}

export default PostInput
