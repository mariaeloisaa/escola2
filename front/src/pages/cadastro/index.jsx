import { useState } from "react";
import { useForm } from "react-hook-form";
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import './styles.css';

export default function SignUp() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [message, setMessage] = useState("");
  const navigate = useNavigate()
  
  const onSubmit = async (data) => {
    try {
      await axios.post("http://127.0.0.1:8000/api/signup/", data);
      setMessage("Usuário cadastrado com sucesso!");
      navigate('/home')
      
    } catch (error) {
      setMessage("Erro ao cadastrar usuário. Verifique os dados e tente novamente.");
    }
  };

  const password = watch("password");

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Cadastro</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nome de usuário"
          {...register("username", { required: "Usuário obrigatório" })}
          className="border p-2 rounded"
        />
        {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}

        <input
          type="password"
          placeholder="Insira a sua senha"
          {...register("password", { required: "Senha obrigatória" })}
          className="border p-2 rounded"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

        <input
          type="password"
          placeholder="Confirme sua senha"
          {...register("confirm_password", { 
            required: "Confirmação de senha obrigatória", 
            validate: value => value === password || "As senhas não coincidem" 
          })}
          className="border p-2 rounded"
        />
        {errors.confirm_password && <p className="text-red-500 text-sm">{errors.confirm_password.message}</p>}

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Cadastrar</button>
      </form>
      {message && <p className="mt-4 text-center text-sm">{message}</p>}
    </div>
  );
}
