import { FlatList, StyleSheet, Text, View } from "react-native";
import firestore from "@react-native-firebase/firestore";
import * as React from "react";
import { getFirebaseClient } from "./firebase-client";
import { useQuery } from "@tanstack/react-query";

type Student = {
  FirstName: string;
  LastName: string;
};

const getStudents = async () => {
  const firebaseApp = await getFirebaseClient();
  const elements = await firestore(firebaseApp).collection("Students").get();

  const result = [] as Student[];
  elements.forEach((student) => result.push(student.data() as Student));
  return result;
};

export default function Page() {
  const queryStudents = useQuery({
    queryKey: ["get-students"],
    queryFn: getStudents,
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={queryStudents.data}
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
