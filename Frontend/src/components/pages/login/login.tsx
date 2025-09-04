import * as Style from "./login.Styled";
import { useState } from "react";
import { Log } from "./login.Function";

type Props = {
  onLogin: () => void;
};

export default function Login({ onLogin }: Props) {
  const [login, setLogin] = useState("");   // 👈 igual ao backend
  const [senha, setSenha] = useState("");   // 👈 igual ao backend

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await Log(login, senha);
    if (success) {
      onLogin();
    } else {
      alert("Usuário ou senha inválidos");
    }
  };


  return (
    <Style.Container>
      <form onSubmit={handleSubmit}>
        <div className="logo">
          <img src="src/assets/Logo.png" alt="Logo" />
        </div>

        <section>
        <p>Login</p>
        <input
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        </section>

        <section>
        <p>Senha</p>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        </section>

        <button type="submit">Entrar</button>
        
      </form>
    </Style.Container>
  );
 }