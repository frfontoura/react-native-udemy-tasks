import { createStackNavigator, createAppContainer } from "react-navigation";
import Agenda from "./screens/Agenda";
import Auth from "./screens/Auth";

const MainRoutes = createStackNavigator({
  Auth: {
    name: "Auth",
    screen: Auth,
    navigationOptions: { header: null }
  },
  Home: {
    name: "Home",
    screen: Agenda,
    navigationOptions: { header: null }
  }
});

const MainNavigator = createAppContainer(MainRoutes, {
  initialRouteName: "Auth"
});

export default MainNavigator;
