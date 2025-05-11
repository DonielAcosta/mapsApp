/* eslint-disable @typescript-eslint/no-unused-vars */
import { check, openSettings, PERMISSIONS, request, PermissionStatus as RNPermissionStatus} from 'react-native-permissions';
import type { PermissionsStatus } from '../../infrastructure/interfaces/permissions';
import { Platform } from 'react-native';


export const requestLocationPermission = async():Promise<PermissionsStatus> => {
    let status: RNPermissionStatus = 'unavailable';

    if(Platform.OS === 'ios'){
        status = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    }else if(Platform.OS === 'android'){
        status = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }else{
        throw new Error('Unsupported platform');
    }

    if(status === 'blocked'){
        await openSettings();
        //TODO
        return await checkLocationPermission();
    }

    const permissionMapper: Record<RNPermissionStatus,PermissionsStatus> = {
        granted:'granted',
        denied:'denied',
        blocked:'blocked',
        limited:'limited',
        unavailable:'unavailable',

    };

    return permissionMapper[status] ?? 'unavailable';
};

export const checkLocationPermission = async():Promise<PermissionsStatus> => {
    let status: RNPermissionStatus = 'unavailable';

    if(Platform.OS === 'ios'){
        status = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    }else if(Platform.OS === 'android'){
        status = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }else{
        throw new Error('Unsupported platform');
    }

    const permissionMapper: Record<RNPermissionStatus,PermissionsStatus> = {
        granted:'granted',
        denied:'denied',
        blocked:'blocked',
        limited:'limited',
        unavailable:'unavailable',

    };
}