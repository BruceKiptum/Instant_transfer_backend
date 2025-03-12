import React from "react";
import { View, Button, Alert, Linking } from "react-native";

const SignUpWithDeriv = () => {
  const handleSignUp = () => {
    // Show a confirmation prompt using React Native's Alert API
    Alert.alert(
      "Sign Up with Deriv",
      "Do you want to sign up using your Deriv account?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            // Use your environment variables (or fallback values)
            const APP_ID = process.env.REACT_APP_DERIV_CLIENT_ID || '69608';
            const SCOPES = process.env.REACT_APP_DERIV_OAUTH_SCOPES || 'AdminReadPaymentsTrade';
            const REDIRECT_URI = process.env.REACT_APP_DERIV_OAUTH_REDIRECT_URL || 'https://8a77-41-139-236-251.ngrok-free.app/callback';
            
            // Construct the Deriv OAuth URL – note the use of the oauth endpoint
            const oauthUrl = `https://oauth.deriv.com/oauth2/authorize?app_id=${APP_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${SCOPES}`;
            
            // Open the OAuth URL using the Linking API
            Linking.openURL(oauthUrl).catch(err =>
              console.error("Failed to open URL:", err)
            );
          }
        }
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={{ alignItems: "center", marginTop: 50 }}>
      <Button title="Sign Up / Log In with Deriv" onPress={handleSignUp} />
    </View>
  );
};

export default SignUpWithDeriv;
