import { Redirect} from "expo-router";
import { StyleSheet} from "react-native";

export default function Index() {
  return (
    <Redirect href={"/(auth)/login"}/>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 22,
  },
  

})
