import * as Style from "./CadastroCliente.Styled";
import { MdPerson } from "react-icons/md";
import { useForm } from "react-hook-form";

type FormValues = {
  razao_social: string;
  CPF_CNPJ: string;
  email: string;
  telefone: string;
  logradouro: string;
  bairro: string;
  numero: string;
  cidade: string;
  uf: string;
};

type ErrorMessageProps = {
  error?: string;
};

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
  if (!error) return null;
  return <p className="error-message">{error}</p>;
};

export const CadastroCliente = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <Style.Container>
      <p className="icon">
        <MdPerson /> Cadastro de Clientes
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="sessao">
          <div>
            <label>Nome</label>
            <input
              {...register("razao_social", {
                required: "O campo é obrigatório",
              })}
            />
            <ErrorMessage error={errors.razao_social?.message} />
          </div>

          <div>
            <label>CPF/CNPJ</label>
            <input
              type="text"
              {...register("CPF_CNPJ", {
                required: "O campo é obrigatório",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Digite apenas números",
                }
              })}
            />
          </div>
        </div>

        <div className="sessao">
          <div>
            <label>Email</label>
            <input
              type="email"
              {...register("email", { required: "O campo é obrigatório" })}
            />
            <ErrorMessage error={errors.email?.message} />
          </div>

          <div>
            <label>Telefone</label>
            <input
              type="text"
              {...register("telefone", {
                required: "O campo é obrigatório",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Digite apenas números",
                },
              })}
            />
            <ErrorMessage error={errors.telefone?.message} />
          </div>
        </div>

        <div className="sessao">
          <div>
            <label>Rua</label>
            <input
              {...register("logradouro", { required: "O campo é obrigatório" })}
            />
            <ErrorMessage error={errors.logradouro?.message} />
          </div>

          <div>
            <label>Bairro</label>
            <input
              {...register("bairro", { required: "O campo é obrigatório" })}
            />
            <ErrorMessage error={errors.bairro?.message} />
          </div>

          <div>
            <label>Número</label>
            <input
              type="text"
              {...register("numero", {
                required: "O campo é obrigatório",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Digite apenas números",
                },
              })}
            />
            <ErrorMessage error={errors.telefone?.message} />
          </div>

          <div>
            <label>Cidade</label>
            <input
              {...register("cidade", { required: "O campo é obrigatório" })}
            />
            <ErrorMessage error={errors.cidade?.message} />
          </div>

          <div>
            <label>UF</label>
            <input
              {...register("uf", {
                required: "O campo é obrigatório",
                minLength: { value: 2, message: "O UF deve ter duas letras" },
              })}
            />
            <ErrorMessage error={errors.uf?.message} />
          </div>
        </div>

        <div className="Buttons">
          <button type="submit" className="Salvar">
            Salvar
          </button>

          <button
            type="button"
            className="Cancelar"
            onClick={() => console.log("Cancelado")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </Style.Container>
  );
};

export default CadastroCliente;
