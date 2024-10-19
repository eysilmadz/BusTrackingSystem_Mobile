import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import styles from './ModalAlert.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ModalAlert = ({ setModalVisible, modalVisible, title, alert, buttons }) => {

    const hideAlert = () => {
        setModalVisible(false);
    };

    return (
        <SafeAreaView >
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={hideAlert}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Icon name="close" size={30} color="#222222" onPress={hideAlert} style={styles.icon} />
                        <View style={styles.alertContainer}>
                            <Text style={styles.title}>{title}</Text>
                            <Text style={styles.alert}>{alert}</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            {buttons.map((button, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={button.onPress}
                                    style={styles.button}
                                >
                                    <Text style={styles.buttonText}>{button.text}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

export default ModalAlert;
