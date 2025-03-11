import React, { useState } from "react";
import { View } from "react-native-ui-lib";
import { TextInput, Button, Text, HelperText, RadioButton } from "react-native-paper";
import { Platform } from "react-native";

export default function AddBabyForm() {
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gender, setGender] = useState("male");

  const onChangeDate = (event: any, selectedDate: any) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) setBirthday(selectedDate);
  };

  return (
    <View padding-20>
      <Text variant="titleLarge">Add Baby</Text>

      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        mode="outlined"
      />
      <HelperText type="info">Enter baby's name</HelperText>

      <Button mode="outlined" onPress={() => setShowDatePicker(true)}>
        Select Birthday: {birthday.toDateString()}
      </Button>
      {showDatePicker && (
        <DateTimePicker
          value={birthday}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}

      <Text variant="bodyLarge" style={{ marginTop: 10 }}>Gender</Text>
      <RadioButton.Group onValueChange={setGender} value={gender}>
        <View row centerV>
          <RadioButton value="male" /><Text>Male</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
            <RadioButton value="female" /><Text>Female</Text>
          </View>
        </View>
      </RadioButton.Group>

      <Button mode="contained" style={{ marginTop: 20 }} onPress={() => console.log({ name, birthday, gender })}>
        Submit
      </Button>
    </View>
  );
}
