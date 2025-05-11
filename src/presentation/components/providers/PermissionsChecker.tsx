import {PropsWithChildren, useEffect} from 'react';
import {AppState} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNavigator';
import { usePermissionStore } from '../../store/permissions/usePermissionStore';

export const PermissionsChecker = ({children}: PropsWithChildren) => {
  const {locationStatus, checkLocationPermission} = usePermissionStore();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  useEffect(() => {
    if (locationStatus === 'granted') {

      navigation.reset({
        routes: [{name: 'MapsScreen'}],
      });
    } else if (locationStatus !== 'undetermined') {
      navigation.reset({
        routes: [{name: 'PermissionsScreen'}],
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationStatus]);

  useEffect(() => {
    checkLocationPermission();
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        checkLocationPermission();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return <>{children}</>;
};
