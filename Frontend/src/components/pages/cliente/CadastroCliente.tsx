import * as Style from "./CadastroCliente.Styled";
import { MdPerson } from "react-icons/md";
import { useForm } from "react-hook-form";
import Modal from "../../modais/modalCancel";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


type FormValues = {
  id_cliente: string;
  razao_social: string;
  nome_fantasia: string;
  cpf_cnpj: string;
  rg_ie: string;
  
  cep: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
  
  telefone: string;
  email: string;
  
  limite_credito: string;
  observacao: string;
  fg_ativo: boolean;
  fg_tipo: "F" | "J";
};

type ErrorMessageProps = {
  error?: string;
};

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
  if (!error) return null;
  return <p className="error-message">{error}</p>;
};

export const CadastroCliente = () => {

  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { fg_tipo: "F",  id_cliente: "", fg_ativo: true},
  });

  const tipo = watch("fg_tipo");

  const onSubmit = (data: FormValues) => {
    console.log("dados enviados: ", data);
  };

  return (
    <Style.Container>
      <p className="icon">
        <MdPerson /> Cadastro de Clientes
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>

              {/* personal info */}

        <div className="sessao">
          <div>
            <label>ID</label>
            <input {...register("id_cliente", { disabled: true })} />
            <ErrorMessage error={errors.razao_social?.message} />
          </div>

          <div>
            <label>Razão social</label>
            <input
              {...register("razao_social", {
                required: "O campo é obrigatório",
              })}
            />
            <ErrorMessage error={errors.razao_social?.message} />
          </div>

          <div>
            <label>Fantasia</label>
            <input {...register("nome_fantasia")} />
            <ErrorMessage error={errors.razao_social?.message} />
          </div>

          <div>
            <label>{tipo === "F" ? "CPF" : "CNPJ"}</label>
            <input
              type="text"
              {...register("cpf_cnpj", {
                required: "O campo é obrigatório",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Digite apenas números",
                },
              })}
            />
          </div>

          <div>
            <label>{tipo === "F" ? "RG" : "IE"}</label>
            <input
              type="text"
              {...register("rg_ie", {
                required: "O campo é obrigatório",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Digite apenas números",
                },
              })}
            />
          </div>

          <div className="radio">
            <label>
              <input type="radio" value="F" {...register("fg_tipo")} />
              PF
            </label>
            <label>
              <input type="radio" value="J" {...register("fg_tipo")} />
              PJ
            </label>
          </div>
      

        <div>
          <label className="checkbox">
          <input type="checkbox" {...register("fg_ativo")} />
          Ativo? </label>
        </div>
        </div>


      {/* Contato */}

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

{/* Endereço */}

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
              {...register("numero", {
                  required: "O campo é obrigatório"})}
            />
            <ErrorMessage error={errors.numero?.message} />
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
            onClick={() => setOpenModal(true)}
          >
            Cancelar
          </button>
          
        </div>

         <Modal
            isOpen={openModal}
            setOpenModal={setOpenModal}
            onConfirm={() => {
              reset();
              setOpenModal(false);
              navigate("/consultaCliente");
            }}
          />

      </form>
    </Style.Container>
  );
};

export default CadastroCliente;
