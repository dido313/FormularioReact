import React, { useState } from 'react';
import {useFetchRefatorado} from "./hooks/useFetchRefatorado";

const FormularioWithFetch = () => {
  const [nome, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState({});
  const url = "http://localhost:5000/api/cadastros";
const {httpConfig} = useFetchRefatorado(url);   //data, loading, error

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangePasswordConfirmation = (e) => {
    setPasswordConfirmation(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkInputs();
  };

  const checkInputs = () => {
    const validationErrors = {};

    if (nome.trim() === "") {
      validationErrors.username = "O nome de Usuário é obrigatório.";
    } else {
      validationErrors.username = "";
    }

    if (email.trim() === "") {
      validationErrors.email = "O email é obrigatório.";
    } else if (!checkEmail(email)) {
      validationErrors.email = "Por favor, insira um email válido.";
    } else {
      validationErrors.email = "";
    }

    if (password.trim() === "") {
      validationErrors.password = "A Senha é obrigatória.";
    } else if (password.length < 7) {
      validationErrors.password = "A senha deve ter no mínimo 7 caracteres.";
    } else {
      validationErrors.password = "";
    }

    if (passwordConfirmation.trim() === "") {
      validationErrors.passwordConfirmation = "A confirmação de senha é obrigatória.";
    } else if (passwordConfirmation !== password) {
      validationErrors.passwordConfirmation = "As Senhas não coincidem.";
    } else {
      validationErrors.passwordConfirmation = "";
    }

    setErrors(validationErrors);

    const formIsValid = Object.values(validationErrors).every((error) => error === "");

    if (formIsValid) {
        const product={      
        nome,
        email,
        senha:password
         };
          console.log(product)
      httpConfig(product, "POST") 
      setUsername("");
      setPassword("");
      setEmail("");
      setPasswordConfirmation("");
      alert("Formulário concluído");
   }
  };

  const checkEmail = (email) => {
    return /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  };

  return (
    <div className='container'>
      
      <div className='header'>
        <h2>Criar sua conta</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={`form-control ${errors.nome ? 'error' : (nome !== '' ? 'success' : '')}`}>
          <label htmlFor="username">Nome de Usuário</label>
          <input
            type='text'
            id='username'
            placeholder='Digite seu Nome de Usuário'
            value={nome}
            onChange={handleChangeUsername}
          />
          <i className="fas fa-exclamation-circle"></i>
          <i className="fas fa-check-circle"></i>
          <small>{errors.username}</small>
        </div>
        <div className={`form-control ${errors.email ? 'error' : (email !== '' ? 'success' : '')}`}>
          <label htmlFor="email">Email</label>
          <input
            type='text'
            id='email'
            placeholder='Digite seu Email'
            value={email}
            onChange={handleChangeEmail}
          />
          <i className="fas fa-exclamation-circle"></i>
          <i className="fas fa-check-circle"></i>
          <small>{errors.email}</small>
        </div>
        <div className={`form-control ${errors.password ? 'error' : (password !== '' ? 'success' : '')}`}>
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            placeholder="Digite sua Senha"
            value={password}
            onChange={handleChangePassword}
          />
          <i className="fas fa-exclamation-circle"></i>
          <i className="fas fa-check-circle"></i>
          <small>{errors.password}</small>
        </div>
        <div className={`form-control ${errors.passwordConfirmation ? 'error' : (passwordConfirmation !== '' ? 'success' : '')}`}>
          <label htmlFor="password-confirmation">Confirmar Senha</label>
          <input
            type="password"
            id="password-confirmation"
            placeholder="Digite sua senha Novamente"
            value={passwordConfirmation}
            onChange={handleChangePasswordConfirmation}
          />
          <i className="fas fa-exclamation-circle"></i>
          <i className="fas fa-check-circle"></i>
          <small>{errors.passwordConfirmation}</small>
        </div>
        <button className="submitar" type='submit'>Enviar</button>
      </form>
    </div>
  );
};

export default FormularioWithFetch;