import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, RadioButton, Button } from "react-native-paper";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import useApi from "../services/hooks/useApi";
import { API_DELETE_GROW_TRACKER_CHILDID, API_POST_CHILDREN_ADD, API_POST_GROW_TRACKER_CHILDID } from "@env";
import { useToast } from "react-native-toast-notifications";
import { Text } from "react-native-ui-lib";
import { validateForm, ValidationRules } from "../utility/ValidationForm";

export function AddBabyForm() {
  const { fetchData: childCRUD, error: addChildError, loading: addChildLoading } = useApi();
  const { fetchData: trackingCRUD, error: addTrackingError, loading: addTrackingLoading } = useApi();
  const toast = useToast();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-CA"); // YYYY-MM-DD theo local timezone
  };

  const [baby, setBaby] = useState<Child>({
    id: "",
    name: "",
    gender: "male",
    birthDate: formatDate(new Date()),
    height: "",
    weight: "",
    headCircumference: "",
    measuredAt: formatDate(new Date())
  });


  const onChangeBirthDay = (event: any, selectedDate: any) => {
    if (selectedDate) {
      const localDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        12, 0, 0
      );
      handleSetBaby("birthDate", localDate.toISOString());
    }
  };

  const onChangeMeasureAt = (event: any, selectedMeasure: any) => {
    if (selectedMeasure) {
      const localDate = new Date(
        selectedMeasure.getFullYear(),
        selectedMeasure.getMonth(),
        selectedMeasure.getDate(),
        12, 0, 0
      );
      handleSetBaby("measuredAt", localDate.toISOString());
    }
  };


  const addNewChild = async () => {
    const validationRules: ValidationRules = {
      name: ["blank"],
      birthDate: ["blank"],
      height: ["blank", "number"],
      weight: ["blank", "number"],
      headCircumference: ["blank"],
      measuredAt: ["blank"]
    };

    const validationErrors = validateForm(baby, validationRules);
    setErrors(validationErrors);


    if (Object.keys(validationErrors).length > 0) return;

    try {
      var childFormData = new FormData();
      childFormData.append("name", baby.name);
      childFormData.append("birthDate", formatDate(new Date(baby.birthDate)));
      childFormData.append("gender", baby.gender);

      var responseChild = await childCRUD(API_POST_CHILDREN_ADD, "POST", childFormData, { "Content-Type": "multipart/form-data" });
      console.log(responseChild)
      if (responseChild.success) {
        var babyTrackingBody = {
          "height": baby.height,
          "weight": baby.weight,
          "headCircumference": baby.headCircumference,
          "measuredAt": formatDate(new Date(baby.measuredAt))
        }
        var responseTracking = await trackingCRUD(API_POST_GROW_TRACKER_CHILDID.replace("{childId}", responseChild.data.id), "POST", babyTrackingBody, { "Content-Type": "application/json" });
        console.log(responseTracking);
        if (responseTracking.success) {
          toast.show(responseChild.message, { type: "success" });
          setBaby({
            id: "",
            name: "",
            gender: "male",
            birthDate: new Date().toISOString(),
            height: "",
            weight: "",
            headCircumference: "",
            measuredAt: new Date().toISOString()
          })
        }
      }
    } catch (error: any) {
      childCRUD(API_DELETE_GROW_TRACKER_CHILDID.replace("{childId}", responseChild.data.id), "DELETE", null, { "Content-Type": "application/json" })
      console.log("Add baby error: " + error.message);
    }
  }

  const handleSetBaby = (field: keyof Child, value: string) => {
    const validationRules: ValidationRules = {
      name: ["blank"],
      birthDate: ["blank"],
      height: ["blank", "number"],
      weight: ["blank", "number"],
      headCircumference: ["blank"],
      measuredAt: ["blank"]
    };


    setBaby(prev => ({
      ...prev,
      [field]: value
    } as Child));

    const validationErrors = validateForm({ [field]: value }, { [field]: validationRules[field] });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: validationErrors[field] || "", // Nếu không có lỗi thì xóa lỗi
    }));
  }

  const showBirthDayPicker = () => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange: onChangeBirthDay,
      mode: "date",
      is24Hour: true,
      maximumDate: new Date()
    });
  };
  const showMeasureAtPicker = () => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange: onChangeMeasureAt,
      mode: "date",
      is24Hour: true,
      minimumDate: new Date(baby.birthDate),
      maximumDate: new Date()
    });
  };

  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center" }} text30BL>Add Baby</Text>
      <View style={styles.inputContainer}>
        <TextInput
          label="Name"
          error={!!errors.name}
          value={baby?.name}
          onChangeText={(text) => handleSetBaby("name", text)}
          mode="outlined"
        />
        {errors.name && <Text style={styles.inputError}>{errors.name}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          label="Birthday"
          value={formatDate(new Date(baby?.birthDate))}
          mode="outlined"
          editable={false}
          right={<TextInput.Icon icon="calendar" onPress={showBirthDayPicker} />}
        />
        {errors.birthDate && <Text style={styles.inputError}>{errors.birthDate}</Text>}
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", marginStart: 10,marginBottom:20}}>
        <Text text70BL>Gender</Text>
        <RadioButton.Group onValueChange={(text) => handleSetBaby("gender", text)} value={baby?.gender ?? "male"}>
          <View style={styles.radioContainer}>
            <RadioButton.Item label="Male" value="male" />
            <RadioButton.Item label="Female" value="female" />
          </View>
        </RadioButton.Group>
      </View>

      <View style={{ flexDirection: "row", marginBottom: 20 }}>
        <View style={{ flex: 1 }}>
          <TextInput
            onChangeText={(text) => handleSetBaby("height", text)}
            label="Height"
            error={!!errors.height}
            keyboardType="decimal-pad"
            mode="outlined"
            value={baby?.height}
          />
          {errors.height && <Text style={styles.inputError}>{errors.height}</Text>}
        </View>
        <View style={{ marginHorizontal: 5 }}></View>
        <View style={{ flex: 1 }}>
          <TextInput
            onChangeText={(text) => handleSetBaby("weight", text)}
            label="Weight"
            error={!!errors.weight}
            keyboardType="decimal-pad"
            mode="outlined"
            value={baby?.weight}
          />
          {errors.weight && <Text style={styles.inputError}>{errors.weight}</Text>}
        </View>
      </View>


      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) => handleSetBaby("headCircumference", text)}
          error={!!errors.headCircumference}
          label="Head Circumference"
          mode="outlined"
          value={baby?.headCircumference}
        />
        {errors.headCircumference && <Text style={styles.inputError}>{errors.headCircumference}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          label="Measured At"
          error={!!errors.measuredAt}
          mode="outlined"
          right={<TextInput.Icon icon="calendar" onPress={showMeasureAtPicker} />}
          value={formatDate(new Date(baby?.measuredAt))}
        />
        {errors.measuredAt && <Text style={styles.inputError}>{errors.measuredAt}</Text>}
      </View>

      <Button mode="contained" onPress={addNewChild} style={styles.button} >
        Add Baby
      </Button >
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputError: {
    textTransform: "capitalize",
    color: "red",
    marginVertical: 5,
    marginStart: 8,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    marginTop: 20,
    alignSelf: "center",
    width: "100%",
    borderRadius: 10,
  },
});
