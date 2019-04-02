import React from "react";
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  AsyncStorage,
  Keyboard,
} from "react-native";

const window = Dimensions.get("window");

export default class App extends React.Component {
  state = { text: "", height: window.height };
  async componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this.keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this.keyboardDidHide,
    );
    try {
      const text = (await AsyncStorage.getItem("NOTE")) || "";
      this.setState({ text });
    } catch (error) {
      console.log(error);
    }
  }
  keyboardDidShow = e => {
    this.setState({
      height: window.height - e.endCoordinates.height,
    });
  };
  keyboardDidHide = () => {
    this.setState({
      height: window.height,
    });
  };
  onChange = async text => {
    try {
      await AsyncStorage.setItem("NOTE", text);
      this.setState({ text });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{
            fontSize: 18,
            lineHeight: 25,
            color: "#333",
            width: window.width - 40,
            height: this.state.height - 80,
          }}
          multiline={true}
          onChangeText={this.onChange}
          value={this.state.text}
          autoFocus={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 40,
  },
});
