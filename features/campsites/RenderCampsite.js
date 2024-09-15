import { StyleSheet, Text, View } from "react-native";
import { Card, Icon } from "react-native-elements";

const RenderCampsite = (props) => {
  const { campsite } = props;
  if (!campsite) {
    return <View />;
  }
  return (
    <Card containerStyle={styles.cardContainer}>
      <Card.Title>{campsite.name}</Card.Title>
      <Card.Divider />
      <Card.Image source={campsite.image}>
        <View style={{ margin: 10 }}>
          <Text>{campsite.description}</Text>
        </View>
      </Card.Image>
      <Text style={{ margin: 10 }}>{campsite.description}</Text>
      <Icon
        name={props.isFavorite ? "heart" : "heart-o"}
        type='font-awesome'
        color='#f50'
        raised
        reverse
        onPress={() =>
          props.isFavorite
            ? console.log("Already set as a favorite")
            : props.markFavorite()
        }
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 0,
    marginBottom: 20,
    margin: 0,
    backgroundColor: "#f7f7f7",
  },
});

export default RenderCampsite;
