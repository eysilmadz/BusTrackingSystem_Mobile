import React, { useCallback, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { Extrapolation, interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');
const max_translate_y = -height;
const min_translate_y = -height / 6; //componentin alttan görülecek sınırı

const BottomSheet = ({children}) => {
    const navigation = useNavigation();
    const translationY = useSharedValue(0);

    const scrollTo = useCallback((destination) => {
        'worklet';
        translationY.value = withSpring(destination, { damping: 50 }); //ilk açıldığında animasyon
    }, [])

    const context = useSharedValue({ y: 0 });
    const gesture = Gesture.Pan().onStart(() => {
        context.value = { y: translationY.value };
    }).onUpdate((event) => {
        translationY.value = event.translationY + context.value.y;
        translationY.value = Math.max(translationY.value, max_translate_y);
        translationY.value = Math.min(translationY.value, min_translate_y);
    }).onEnd(() => {
        if (translationY.value > min_translate_y) {
            scrollTo(0); // Yukarı kaydırma
        } else if (translationY.value < max_translate_y) {
            scrollTo(max_translate_y); // Aşağı kaydırma
        }
    });

    useEffect(() => {
        scrollTo(-height / 3); //Başlangıç Pozisyonu
    }, [])


    const rBottomSheetStyle = useAnimatedStyle(() => {
        const borderRadius = interpolate(
            translationY.value,
            [max_translate_y + 50, max_translate_y],
            [25, 5],
            Extrapolation.CLAMP
        );
        return {
            borderRadius,
            transform: [{ translateY: translationY.value }],
        };
    });

    return (
        <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
                <View style={styles.line} />
                {children}
            </Animated.View>
        </GestureDetector>

    );
};

const styles = StyleSheet.create({
    bottomSheetContainer: {
        height: height,
        width: '100%',
        backgroundColor: 'white',
        position: 'absolute',
        top: height,
        borderRadius: 25
    },
    line: {
        width: 75,
        height: 4,
        backgroundColor: 'gray',
        alignSelf: 'center',
        marginVertical: 15,
        borderRadius: 2,
    }
});

export default BottomSheet;
