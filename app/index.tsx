import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View } from "react-native";
import firestore from "@react-native-firebase/firestore";
import * as React from "react";
import { getFirebaseClient } from "./firebase-client";

type Student = {
  FirstName: string;
  LastName: string;
};

export default function Page() {
  const [students, setStudents] = React.useState([] as Student[]);

  React.useEffect(() => {
    async function getData() {
      try {
        const firebaseApp = await getFirebaseClient();
        const result = [] as Student[];
        const elements = await firestore(firebaseApp)
          .collection("Students")
          .get();
        elements.forEach((student) => result.push(student.data() as Student));
        setStudents(result);
      } catch (error) {
        console.error("Error getting Firestore", error);
      }
    }

    void getData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={students}
        renderItem={(info) => (
          <Text>{`${info.item.FirstName} ${info.item.LastName}`}</Text>
        )}
      />
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
