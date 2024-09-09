import DirectoryScreen from "./DirectoryScreen";
import { Platform, View } from "react-native-animatable";
import Constants from "expo-constants";
import CampsiteInfoScreen from "./CampsiteInfoScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./HomeScreen";
import AboutScreen from "./AboutScreen";
import ContactScreen from "./ContactScreen";

const Drawer = createDrawerNavigator();

const screenOptions = {
  headerStyle: {
    backgroundColor: "#5637DD",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    color: "#fff",
  },
};

const AboutNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName='About' screenOptions={screenOptions}>
      <Stack.Screen
        name='About'
        component={AboutScreen}
        options={{ title: "About Us" }}
      />
    </Stack.Navigator>
  );
};

const ContactNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName='Contact' screenOptions={screenOptions}>
      <Stack.Screen
        name='Contact'
        component={ContactScreen}
        options={{ title: "Contact Us" }}
      />
    </Stack.Navigator>
  );
};

const HomeNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName='Home' screenOptions={screenOptions}>
      <Stack.Screen
        name='Home'
        component={HomeScreen}
        options={{ title: "Home" }}
      />
    </Stack.Navigator>
  );
};

const DirectoryNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName='Directory' screenOptions={screenOptions}>
      <Stack.Screen
        name='Directory'
        component={DirectoryScreen}
        options={{ title: "Campsite Directory" }}
      />
      <Stack.Screen
        name='CampsiteInfo'
        component={CampsiteInfoScreen}
        options={({ route }) => ({ title: route.params.campsite.name })}
      />
    </Stack.Navigator>
  );
};

const Main = () => {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 0,
      }}
    >
      <Drawer.Navigator
        initialRouteName='Home'
        drawerStyle={{
          backgroundColor: "#CEC8FF",
        }}
      >
        <Drawer.Screen
          name='Home'
          component={HomeNavigator}
          options={{ title: "Home" }}
        />
        <Drawer.Screen
          name='Directory'
          component={DirectoryNavigator}
          options={{ title: "Directory" }}
        />
        <Drawer.Screen
          name='About'
          component={AboutNavigator}
          options={{ title: "About Us" }}
        />
        <Drawer.Screen
          name='Contact'
          component={ContactNavigator}
          options={{ title: "Contact Us" }}
        />
      </Drawer.Navigator>
    </View>
  );
};

export default Main;
