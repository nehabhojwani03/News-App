import React from 'react';
import { View, Text, Image, ScrollView, SafeAreaView, useWindowDimensions, Pressable } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

const NewsScreen = ({ route }) => {
    const { article } = route.params;
    const { width, height } = useWindowDimensions();
    const navigation = useNavigation();

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
        return date.toLocaleDateString(undefined, options);
    };

    return (
        <SafeAreaView style={tw`bg-black flex-1`}>
        <View style={tw`flex-row items-center p-4`}>
                <Pressable onPress={() => navigation.goBack()} style={tw`pl-2 rounded-md`}>
                    <Text style={tw`text-white font-bold text-lg`}>Back</Text>
                </Pressable>
            </View>
            <ScrollView contentContainerStyle={tw`pl-5 mt-1`}>
                <Text style={[tw`text-white text-2xl font-bold mb-4`, { width: width * 0.9 }]}>
                    {article.title}
                </Text>

                <Text style={tw`text-gray-300 text-base mb-4`}>
                    {formatDate(article.publishedAt)}
                </Text>

                <Image 
                    source={{ uri: article.urlToImage }}
                    style={[tw`rounded-2xl mb-4`, { width: width * 0.92, height: height * 0.4 }]}
                />
                <Text style={tw`text-white text-base pr-3`}>
                    {article.description}
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
};

export default NewsScreen;
