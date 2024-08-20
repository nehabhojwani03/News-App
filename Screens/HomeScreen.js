import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StatusBar, Image, FlatList, useWindowDimensions, TouchableOpacity } from 'react-native';
import NavBar from "../Components/NavBar";
import tw from 'twrnc';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';


const HomeScreen = () => {
    const [articles, setArticles] = useState([]);
    const navigation = useNavigation();
    const { width, height } = useWindowDimensions(); // Get screen dimensions
    const topics = ['technology', 'sports', 'health'];
    const apiKey = '738b3d303b3f43aa9084640849a3b7fe';

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get('https://newsapi.org/v2/everything', {
                    params: { q: topics },
                    headers: { Authorization: `Bearer ${apiKey}` }
                });
                setArticles(response.data.articles.slice(0, 50)); // Get the first 50 articles
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };

        fetchArticles();
    }, []);

    const truncateDescription = (description) => {
        if (!description) {
            return ''; // Return an empty string if the description is null or undefined
        }
        const words = description.split(' ');
        return words.length > 200 ? words.slice(0, 200).join(' ') + '...' : description;
    };

    const renderArticle = ({ item }) => {
        const handleGestureEvent = ({ nativeEvent }) => {
            if (nativeEvent.translationX < -100) { // Threshold for swipe right
                navigation.navigate('News', { article: item });
            }
        };

        return (
            <PanGestureHandler onGestureEvent={handleGestureEvent}>
                <View style={[tw`border-b-[0.2] border-white w-full  flex-row justify-between`, { minHeight: height * 0.15 }]}>
                    <View style={[tw`flex-1 p-2`, { maxWidth: width * 0.65 }]}>
                        <Text style={[tw`text-white text-lg font-bold p-1`, { marginTop: height * 0.02 }]}>
                            {item.title}
                        </Text>
                        <Text style={tw`text-white text-sm p-1`}>
                            {truncateDescription(item.description)}
                        </Text>
                        <Text style={tw`text-white text-sm p-1`}>
                            Published By: {item.author}
                        </Text>
                    </View>
                    <View style={[tw`justify-center mt-5`, { height: height * 0.2, width: width * 0.3, marginRight: width * 0.02 }]}>
                <Image 
                    source={{ uri: item.urlToImage }}
                    style={[tw`rounded-2xl`, { height: '100%', width: '100%' }]}
                />
            </View>
                </View>
            </PanGestureHandler>
        );
    };

    return (
        <SafeAreaView style={[tw`bg-black flex-1`, { padding: width * 0.05 }]}>
            <StatusBar />
            <NavBar />
            <FlatList
                data={articles}
                renderItem={renderArticle}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={tw`p-4`}
            />
        </SafeAreaView>
    );
};

export default HomeScreen;
