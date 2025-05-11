import { Pressable, Text, View } from 'react-native';
import { globlaStyles } from '../../../config/theme/styles';
import { usePermissionStore } from '../../store/permissions/usePermissionStore';

export const PermissionsScreen = () => {

  const { locationStatus, requestLocationPermission } = usePermissionStore();


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Habilitar ubicación</Text>

      <Pressable
        style={ globlaStyles.btnPrimary }
        onPress={ requestLocationPermission }
      >
        <Text style={{ color: 'white' }}>Habilitar Localización</Text>
      </Pressable>


      <Text>Estado actual: { locationStatus }</Text>
      
    </View>
  )
}