import React from 'react';
import {
  SafeAreaView,
  View,
  Pressable,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  Text,
} from 'react-native';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/native';


const NavBar = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`bg-black`}>
      <View
        style={[
          tw`bg-black pb-2`,
        ]}>
        <TouchableOpacity>
          <View style={tw`flex-row`}>
            <Image
              source={require('../assets/avatar.jpg')}
              style={[
                tw`rounded-[50px] h-12 w-12`,
                {
                  marginTop: useWindowDimensions().height * 0.01,
                  marginLeft: useWindowDimensions().width * 0.03,
                },
              ]}
            />
            <Text style={tw`text-base text-white p-3 mt-3`}>Welcome Back!</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NavBar;