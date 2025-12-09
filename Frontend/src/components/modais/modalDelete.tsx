import * as Style from "./modal.Styled";

type ModalProps = {
  onConfirm: () => void;
  isOpen: boolean;
  setOpenModal: (open: boolean) => void;
};

export default function Modal({ isOpen, setOpenModal, onConfirm }: ModalProps) {
  if (!isOpen) return null;

  return (
    <Style.Container>
      <div className="ModalStyle">
        <p>Tem certeza que deseja Excluir o cliente?</p>

        <div className="Buttons">
          <button className="sim" onClick={onConfirm}>
            Sim
          </button>

          <button className="nao" onClick={() => setOpenModal(false)}>
            Não
          </button>
        </div>
      </div>
    </Style.Container>
  );
}
