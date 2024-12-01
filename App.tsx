import 'react-native-gesture-handler';
import React from 'react';
import { View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ZegoUIKitPrebuiltLiveStreaming, {
  HOST_DEFAULT_CONFIG,
  AUDIENCE_DEFAULT_CONFIG
} from '@zegocloud/zego-uikit-prebuilt-live-streaming-rn';

const Stack = createStackNavigator();

function HomePage({ navigation, route }) {
  const { isHost } = route.params || {}; 
  const randomUserID = String(Math.floor(Math.random() * 100000)); 

  console.log('isHost:', isHost); 
  console.log('randomUserID:', randomUserID);

  if (isHost !== undefined) {
    console.log('Rendering live streaming as Host or Audience');

    return (
      <View style={{ flex: 1 }}>
        <ZegoUIKitPrebuiltLiveStreaming
          appID={404748616} 
          appSign="dd6543a1074851b06352581ac349b440a8e9f43b9a6ff4579abae8abc627066c" 
          userID={randomUserID}
          userName={`user_${randomUserID}`}
          liveID="testLiveID"
          config={{
            ...(isHost ? HOST_DEFAULT_CONFIG : AUDIENCE_DEFAULT_CONFIG),
            onLeaveLiveStreaming: () => {
              console.log('Left live streaming, navigating back to HomePage');
              navigation.navigate('HomePage', { isHost: undefined });
            },
            onJoinLiveStreaming: () => {
              console.log('Successfully joined live streaming');
            },
            onError: (error) => {
              console.error('Error joining stream:', error);
            }
          }}
        />
      </View>
    );
  }

  console.log('Rendering HomePage with buttons');
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
      <Button
        title="Start a Live"
        onPress={() => {
          console.log('Navigating to HomePage with isHost true');
          navigation.navigate('HomePage', { isHost: true }); 
        }}
      />
      <Button
        title="Watch a Live"
        onPress={() => {
          console.log('Navigating to HomePage with isHost false');
          navigation.navigate('HomePage', { isHost: false }); 
        }}
      />
    </View>
  );
}

export default function App() {
  console.log('App starting, rendering NavigationContainer');
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomePage" component={HomePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
