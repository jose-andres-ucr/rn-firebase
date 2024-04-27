import { FlatList, StyleSheet, Text, View } from "react-native";
import firestore from "@react-native-firebase/firestore";
import * as React from "react";
import { getFirebaseClient } from "./firebase-client";
import { useQuery, useQueryClient } from "@tanstack/react-query";

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

const GET_STUDENTS_QUERY_KEY = ["get-students"] as const;

export default function Page() {
  const queryStudents = useQuery({
    queryKey: GET_STUDENTS_QUERY_KEY,
    queryFn: getStudents,
  });

  const queryClient = useQueryClient();

  React.useEffect(() => {
    const unsubscribe = firestore()
      .collection("Students")
      .onSnapshot((collectionSnapshot) => {
        queryClient.setQueryData(
          GET_STUDENTS_QUERY_KEY,
          collectionSnapshot.docs.map((value) => value.data())
        );
      });

    // Stop listening for updates when no longer required
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(student) => `${student.FirstName} ${student.LastName}`}
        style={styles.list}
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
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  list: {
    marginVertical: 80,
  },
});
