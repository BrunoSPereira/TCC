import * as Style from "./login.Styled";
import { useState } from "react";

type Props = {
  onLogin: () => void;
};

export default function Login({ onLogin }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // API
    if (username === "1" && password === "1") {
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

        <p>Login</p>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <p>Senha</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
    </Style.Container>
  );
}
