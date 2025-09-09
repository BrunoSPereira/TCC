import * as Style from "./CadastroCliente.Styled"
import {MdPerson} from "react-icons/md";
import { useForm, SubmitHandler } from "react-hook-form"

export const CadastroCliente = () => {
  return (

    <Style.Container>
     
     <p className="icon"><MdPerson/> Cadastro de Clientes</p>

     <form>

      <div className="sessao">
        <div>
          <p>Nome</p>
          <input type="text" />
        </div>  

        <div>
          <p>CPF/CNPJ</p>
          <input type="text" />
          </div>
        </div>

      <div className="sessao">
        <div>
          <p>Email</p>
          <input type="text" />
        </div>  

        <div>
          <p>Telefone</p>
          <input type="text" />
        </div>
      </div>

      <div className="sessao">
        <div>
          <p>Rua</p>
          <input type="text" />
        </div>  

        <div>
          <p>Bairro</p>
          <input type="text" />
        </div>

          <div>
          <p>Número</p>
          <input type="text" />
        </div>

          <div>
          <p>Cidade</p>
          <input type="text" />
        </div>

          <div>
          <p>UF</p>
          <input type="text" />
        </div>

          <div>
          <p>Complemento</p>
          <input type="text" />
        </div>
      </div>

      <div className="Buttons">
          <button className="Salvar">
            Salvar
          </button>

          <button className="Cancelar">
            Cancelar
          </button>
      </div>

     </form>

    </Style.Container>
    
  );
};

export default CadastroCliente;
