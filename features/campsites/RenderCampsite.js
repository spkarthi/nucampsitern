import { Text, View } from "react-native";
import { Card } from "react-native-elements";

const RenderCampsite = ({ campsite }) => {
  if (!campsite) {
    return <View />;
  }
  return (
    <Card containerStyle={{ padding: 0 }}>
      <Card.Title>{campsite.name}</Card.Title>
      <Card.Divider />
      <Card.Image source={campsite.image}>
        <View style={{ margin: 10 }}>
          <Text>{campsite.description}</Text>
        </View>
      </Card.Image>
      <Text style={{ margin: 10 }}>{campsite.description}</Text>
    </Card>
  );
};

export default RenderCampsite;
