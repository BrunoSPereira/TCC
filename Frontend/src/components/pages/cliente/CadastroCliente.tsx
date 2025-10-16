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
const fg_ativo = watch("fg_ativo"); 


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
            <input className="idInput"
             readOnly {...register("id_cliente")} />
            <ErrorMessage error={errors.id_cliente?.message} />
          </div>

          <div >
            <label>Razão social</label>
            <input className="input"
              {...register("razao_social", {
                required: "O campo é obrigatório",
              })}
            />
            <ErrorMessage error={errors.razao_social?.message} />
          </div>

          <div>
            <label>Fantasia</label>
            <input className="input"
            {...register("nome_fantasia")} />
            <ErrorMessage error={errors.nome_fantasia?.message} />
          </div>

          <div>
            <label>{tipo === "F" ? "CPF" : "CNPJ"}</label>
            <input className="input"
              type="text"
              {...register("cpf_cnpj", {
                required: "O campo é obrigatório",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Digite apenas números",
                },
              })}
            />  
            <ErrorMessage error={errors.cpf_cnpj?.message} />
          </div>

          <div>
            <label>{tipo === "F" ? "RG" : "IE"}</label>
            <input className="input"
              type="text" 
              {...register("rg_ie", {
                required: "O campo é obrigatório",
              })}
             />
             <ErrorMessage error={errors.rg_ie?.message} />
          </div>

            <div>
            <label>Limite de crédito</label>
            <input className="input" 
              type="text"
              {...register("limite_credito")}
             />
          </div>

           <div>
            <label>Observação</label>
            <input className="input"
              type="text"
              {...register("observacao")}
             />
          </div>

          <div className="radio-wrapper">
            <label>
              <input className="radio-custom" type="radio" value="F" {...register("fg_tipo")} />
              PF
            </label>
            <label>
              <input className="radio-custom" type="radio" value="J" {...register("fg_tipo")} />
              PJ
            </label>
          </div>
      

<div className="checkbox-wrapper">
  <input
    type="checkbox"
    id="fg_ativo"
    className="checkbox-custom"
    checked={fg_ativo === "S"}
    onChange={(e) => setValue("fg_ativo", e.target.checked ? "S" : "N")}
  />
  <label htmlFor="fg_ativo">Ativo?</label>
</div>
</div>


      {/* Contato */}

        <div className="sessao">
          <div>
            <label>Email</label>
            <input className="input"
              type="email"
              {...register("email", { required: "O campo é obrigatório" })}
            />
            <ErrorMessage error={errors.email?.message} />
          </div>

          <div>
            <label>Telefone</label>
            <input className="input"
              type="text"
              {...register("telefone", {
                required: "O campo é obrigatório",
                // pattern: {
                //   value: /^[0-9]+$/,
                //   message: "Digite apenas números",
                // }
              })}
            />
            <ErrorMessage error={errors.telefone?.message} />
          </div>
        </div>

{/* Endereço */}

        <div className="sessao">

          <div>
            <label>CEP</label>
            <input className="input"
              type="text"
              {...register("cep", {
                required: "O campo é obrigatório",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Digite apenas números",
                },
              })}
            />
            <ErrorMessage error={errors.cep?.message} />
          </div>


          <div>
            <label>Rua</label>
            <input className="input"
              {...register("logradouro", { required: "O campo é obrigatório" })}
            />
            <ErrorMessage error={errors.logradouro?.message} />
          </div>

          <div>
            <label>Bairro</label>
            <input className="input"
              {...register("bairro", { required: "O campo é obrigatório" })}
            />
            <ErrorMessage error={errors.bairro?.message} />
          </div>

          <div>
            <label>Número</label>
            <input className="input"
              {...register("numero", {
                  required: "O campo é obrigatório"})}
            />
            <ErrorMessage error={errors.numero?.message} />
          </div>

          <div>
            <label>Cidade</label>
            <input className="input"
              {...register("cidade", { required: "O campo é obrigatório" })}
            />
            <ErrorMessage error={errors.cidade?.message} />
          </div>

          <div>
            <label>UF</label>
            <input className="input"
              {...register("uf", {
                required: "O campo é obrigatório",
                maxLength: { value: 2, message: "O UF deve ter duas letras" },
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

          
          <button
            type="button"
            className="Excluir"
            // onClick={}
          >
            Excluir
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
