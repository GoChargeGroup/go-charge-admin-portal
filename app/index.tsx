import { Link } from "expo-router";
import { Linking, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Home = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <Link href="/approve-stations">Approve Stations</Link>
            </View>
        </GestureHandlerRootView>
    )
}

export default Home;