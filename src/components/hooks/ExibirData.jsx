import React from 'react'

const ExibirData = ({dados, loading, error}) => {
  return (
    <div>
    {loading && <p>Carregando Dados...</p>}  
    {error && <p>{error}</p>}
    {!error && (<ul>
    {dados && dados.map((product1)=> (
      <li key={product1.id}>{product1.name} - R$:{product1.price}</li>
    ))}
  </ul>)}</div>

  )
}

export default ExibirData