import React from "react";
import { Modal, SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import WebView from "react-native-webview";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./IyzicoWebViewModal.style";

const IyzicoWebViewModal = ({
    visible,
    onClose,
    checkoutUrl,
    checkoutHtml,
    onNavigationStateChange,
}) => (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
        <SafeAreaView style={{ flex: 1 }}>
            <TouchableOpacity style={styles.webViewClose} onPress={onClose}>
                <Icon name="close" size={24} color="#333" />
                <Text style={styles.webViewCloseText}>Kapat</Text>
            </TouchableOpacity>
            <WebView
                source={checkoutUrl ? { uri: checkoutUrl } : {
                    html: `<!DOCTYPE html><html><head>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    </head><body>${checkoutHtml}</body></html>`,
                    baseUrl: "https://sandbox-api.iyzipay.com",
                }}
                onNavigationStateChange={onNavigationStateChange}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                mixedContentMode="always"
                originWhitelist={["*"]}
                onError={(e) => console.log("WebView error:", e.nativeEvent)}
            />
        </SafeAreaView>
    </Modal>
);

export default IyzicoWebViewModal;