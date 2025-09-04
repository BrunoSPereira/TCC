import * as Style from "./login.Styled";
import { useState } from "react";
import { Log } from "./login.Function";

type Props = {
  onLogin: () => void;
};

export default function Login({ onLogin }: Props) {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await Log(login, senha);
    if (success) {
      onLogin();
    } else {
      setErro("Usuário ou senha inválidos :(")
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

        {erro && <div className="mensagemErro">{erro}</div>} 

        <section>
        <button type="submit">Entrar</button>

        <p className="p">TCC foda da Gio e do Bruno 0.0.1</p>
        </section>
        
      </form>
    </Style.Container>
  );
 }