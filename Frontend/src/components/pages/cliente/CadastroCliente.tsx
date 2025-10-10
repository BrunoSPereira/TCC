import * as Style from "./Cliente.Styled";
import { MdPerson } from "react-icons/md";
import { useForm } from "react-hook-form";
import Modal from "../../modais/modalCancel";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cadastrarCliente, consultarClientePorId } from "./Cliente.Function";
import { Cliente, clienteVazio } from "../../../Models/cliente";
import { useParams } from "react-router-dom";


type ErrorMessageProps = {
  error?: string;
};

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
  if (!error) return null;
  return <p className="error-message">{error}</p>;
};


export function CadastroCliente() {
  
  const { id_cliente } = useParams<{ id_cliente?: string }>();
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

 const {
  register,
  handleSubmit,
  reset,
  watch,
  setValue,
  formState: { errors },
} = useForm<Cliente>({
  defaultValues: clienteVazio,
});

const tipo = watch("fg_tipo");
const fgAtivo = watch("fg_ativo"); 


 useEffect(() => {
  const carregarCliente = async () => {
    
    if (id_cliente) {
      
      const data = await consultarClientePorId(id_cliente);
      
      console.log(data);

      if (data && typeof data !== "boolean") {
        reset(data);         
      }
    } else {
      reset(clienteVazio); 
    }
  };

  carregarCliente();
}, 
[id_cliente, reset]);

  const onSubmit = async (dados: Cliente) => {
    const sucesso = await cadastrarCliente(dados);
    if (sucesso) {
      alert("Cliente salvo com sucesso!");
      navigate("/consultaCliente");

    } else {
      alert("Erro ao salvar cliente!");
    }
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
            <input readOnly {...register("id_cliente")} />
            <ErrorMessage error={errors.id_cliente?.message} />
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
            <ErrorMessage error={errors.nome_fantasia?.message} />
          </div>

          <div>
            <label>{tipo === "F" ? "CPF" : "CNPJ"}</label>
            <input
              type="text"
              {...register("cpf_cnpj", {
                required: "O campo é obrigatório",
                // pattern: {
                //   value: /^[0-9]+$/,
                //   message: "Digite apenas números",
                // },
              })}
            />  
            <ErrorMessage error={errors.cpf_cnpj?.message} />
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
                }
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
    <input
      type="checkbox"
      {...register("fg_ativo")}
      onChange={(e) => setValue("fg_ativo", e.target.checked ? "S" : "N")}
      checked={fgAtivo === "S"}
    />
    Ativo?
  </label>
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
                // pattern: {
                //   value: /^[0-9]+$/,
                //   message: "Digite apenas números",
                // },
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
              reset(clienteVazio);
              setOpenModal(false);
              navigate("/consultaCliente");
            }}
          />

      </form>
    </Style.Container>
  );
};

export default CadastroCliente;
