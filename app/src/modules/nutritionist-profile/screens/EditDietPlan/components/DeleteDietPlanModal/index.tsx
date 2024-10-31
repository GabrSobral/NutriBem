import { Modal } from "@/components/design-system/Modal";
import { useState } from "react";

interface Props {
  show: boolean;
  closeModal: () => void;
  submit: () => Promise<void>;
}

export function DeleteDietPlanModal({ show, closeModal, submit }: Props) {
  const [ isLoading, setIsLoading ] = useState(false);

  async function handleSubmit() {
    await submit();
    closeModal();
  }

  return (
    <Modal visible={show} closeModal={closeModal}>
      <Modal.Title>Remover plano alimentar</Modal.Title>

      <Modal.Description>
        Você tem certeza de que quer remover o plano alimentar?
      </Modal.Description>

      <Modal.ButtonWrapper>
        <Modal.Button style={{ flex: 1 }} onPress={closeModal}>Não, fechar</Modal.Button>
        <Modal.Button highlight onPress={submit}>Sim, tenho</Modal.Button>
      </Modal.ButtonWrapper>
    </Modal>
  );
}
