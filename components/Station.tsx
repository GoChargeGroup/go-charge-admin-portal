import { Text, View } from "react-native"

const Station = ({ station }: { station: any }) => {
    return (
        <View className="p-4">
            <Text>{station.name}</Text>
        </View>
    )
};

export default Station;