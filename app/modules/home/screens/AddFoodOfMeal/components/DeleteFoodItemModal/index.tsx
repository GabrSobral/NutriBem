import { Modal } from "react-native";

interface Props {
  visible: boolean;
}

export function DeleteFoodItemModal({ visible }: Props) {
  return (
    <Modal
      statusBarTranslucent
      animationType="fade"
      transparent={true}
      visible={visible}
    ></Modal>
  );
}
