import DirectoryScreen from "./DirectoryScreen";
import { Image, Text, Platform, View } from "react-native-animatable";
import Constants from "expo-constants";
import CampsiteInfoScreen from "./CampsiteInfoScreen";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import HomeScreen from "./HomeScreen";
import AboutScreen from "./AboutScreen";
import ContactScreen from "./ContactScreen";
import { Icon } from "react-native-elements";
import { StyleSheet } from "react-native";
import logo from "../assets/images/logo.png";

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
        options={({ navigation }) => ({
          headerLeft: () => (
            <Icon
              name='info-circle'
              type='font-awesome'
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
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
        options={({ navigation }) => ({
          title: "Contact Us",
          headerLeft: () => (
            <Icon
              name='address-card'
              type='font-awesome'
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
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
        options={({ navigation }) => ({
          title: "Home",
          headerLeft: () => (
            <Icon
              name='home'
              type='font-awesome'
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
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
        options={({ navigation }) => ({
          title: "Campsite Directory",
          headerLeft: () => (
            <Icon
              name='list'
              type='font-awesome'
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
      <Stack.Screen
        name='CampsiteInfo'
        component={CampsiteInfoScreen}
        options={({ route }) => ({ title: route.params.campsite.name })}
      />
    </Stack.Navigator>
  );
};

const CustomDrawerContentComponent = (props) => (
  <DrawerContentScrollView {...props}>
    <View style={styles.drawerHeader}>
      <View style={{ flex: 1 }}>
        <Image source={logo} style={styles.drawerImage} />
      </View>
      <View style={{ flex: 2 }}>
        <Text style={styles.drawerHeaderText}>NuCamp</Text>
      </View>
    </View>
    <DrawerItemList {...props} />
  </DrawerContentScrollView>
);

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
        drawerContent={CustomDrawerContentComponent}
        drawerStyle={{
          backgroundColor: "#CEC8FF",
        }}
      >
        <Drawer.Screen
          name='Home'
          component={HomeNavigator}
          options={{
            title: "Home",
            drawerIcon: ({ tintColor }) => (
              <Icon
                name='home'
                type='font-awesome'
                size={24}
                color={tintColor}
              />
            ),
          }}
        />
        <Drawer.Screen
          name='Directory'
          component={DirectoryNavigator}
          options={{
            title: "Directory",
            drawerIcon: ({ tintColor }) => (
              <Icon
                name='list'
                type='font-awesome'
                size={24}
                color={tintColor}
              />
            ),
          }}
        />
        <Drawer.Screen
          name='About'
          component={AboutNavigator}
          options={{
            title: "About Us",
            drawerIcon: ({ tintColor }) => (
              <Icon
                name='info-circle'
                type='font-awesome'
                size={24}
                color={tintColor}
              />
            ),
          }}
        />
        <Drawer.Screen
          name='Contact'
          component={ContactNavigator}
          options={{
            title: "Contact Us",
            drawerIcon: ({ tintColor }) => (
              <Icon
                name='address-card'
                type='font-awesome'
                size={24}
                color={tintColor}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  stackIcon: {
    marginLeft: 10,
    color: "#fff",
    fontSize: 24,
  },
  drawerHeader: {
    backgroundColor: "#5637DD",
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  drawerHeaderText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  drawerImage: {
    margin: 10,
    height: 60,
    width: 60,
  },
});

export default Main;
