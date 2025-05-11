import { createStackNavigator } from '@react-navigation/stack';
import { LoadingScreen } from '../screens/loading/LoadingScreen';
import { PermissionsScreen } from '../screens/permissions/PermissionsScreen';
import { MapScreen } from '../screens/maps/MapsScreen';

export type RootStackParams = {
    LoadingScreen: undefined;
    PermissionsScreen: undefined;
    MapsScreen:undefined;
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
    initialRouteName="LoadingScreen"
    // initialRouteName="PermissionsScreen"
    screenOptions={{
        headerShown:false,
        cardStyle:{
            backgroundColor:'white',
        },
     }}>
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
      <Stack.Screen name="PermissionsScreen" component={PermissionsScreen} />
      <Stack.Screen name="MapsScreen" component={MapScreen} />


    </Stack.Navigator>
  );
};
