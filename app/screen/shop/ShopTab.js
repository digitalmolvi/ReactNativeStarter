import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import { getToken } from '../../../services/AsyncStorageService';

const Drawer = createDrawerNavigator();

const ShopTab = () => {
  const navigation = useNavigation();
  const [userToken, setUserToken] = useState({});

  useEffect(() => {
    (async () => {
      const token = await getToken();
      if (token) {
        const { access, refresh } = JSON.parse(token);
        setUserToken({ access, refresh });
      } else {
        setUserToken({});
      }
    })();
  }, []);

  const handleUserAuth = () => {
    if (userToken.access) {
      navigation.navigate('UserPanelTab', { screen: 'Dashboard' });
    } else {
      navigation.navigate('UserLogin');
    }
  };

  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: 'purple' },
        headerTintColor: 'white',
        drawerStyle: { backgroundColor: '#F0EDED' },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: 'Geek-Shop',
          drawerActiveTintColor: 'black',
          headerRight: () => (
            <TouchableWithoutFeedback onPress={handleUserAuth}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  paddingRight: 20,
                  fontWeight: 'bold',
                }}
              >
                {userToken.access ? 'Dashboard' : 'Login'}
              </Text>
            </TouchableWithoutFeedback>
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default ShopTab;
