import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import firestore from "@react-native-firebase/firestore";
import firebase from "@react-native-firebase/app";

import * as React from "react";

export default function App() {
  React.useEffect(() => {
    async function getData() {
      try {
        const firebaseApp = await firebase.initializeApp(
          {
            appId: "1:938589636143:android:94657a9d44b98c2d7668da",
            projectId: "react-native-firebase-b8de6",
            databaseURL: "-",
            apiKey: "-",
            messagingSenderId: "-",
            storageBucket: "-",
          },
          { name: "rn-firebase" }
        );
        const elements = await firestore(firebaseApp)
          .collection("CollectionTest")
          .get();
        console.log("BREAKPOINT elements", elements.size);
      } catch (error) {
        console.error("Error getting Firestore", error);
      }
    }

    void getData();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
