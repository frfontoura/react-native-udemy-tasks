import { createStackNavigator, createAppContainer } from "react-navigation";
import Agenda from "./screens/Agenda";
import Auth from "./screens/Auth";

const MainRoutes = createStackNavigator({
  Auth: {
    name: "Auth",
    screen: Auth,
    navigationOptions: {headerTransparent: true}
  },
  Home: {
    name: "Home",
    screen: Agenda
  }
});

const MainNavigator = createAppContainer(MainRoutes, {
  initialRouteName: "Auth"
});

export default MainNavigator;
