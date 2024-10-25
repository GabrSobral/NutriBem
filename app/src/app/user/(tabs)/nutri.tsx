import { NutriProfile } from "@/modules/nutritionist/screens/NutriProfile";
import { useNutritionist } from "@/modules/nutritionist/contexts/nutri/hook";
import { NotConnectedScreen } from "@/modules/nutritionist/screens/NotConnected";

export default function NutriScreen() {
  const { nutritionistState } = useNutritionist();

  return nutritionistState.currentNutritionist ?  <NutriProfile/> : <NotConnectedScreen /> ;
}
