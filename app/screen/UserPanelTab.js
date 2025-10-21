import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardScreen from './DashboardScreen';
import SideBar from './SideBar';
import ChangePasswordScreen from './auth/ChangePasswordScreen';

const Drawer = createDrawerNavigator();

const UserPanelTab = () => {
  return (
    <Drawer.Navigator
      // 🚫 Removed useLegacyImplementation — not supported in Reanimated 3+
      drawerContent={props => <SideBar {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: 'purple' },
        headerTintColor: 'white',
      }}
    >
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{ headerTitle: 'Change Password' }}
      />
    </Drawer.Navigator>
  );
};

export default UserPanelTab;
