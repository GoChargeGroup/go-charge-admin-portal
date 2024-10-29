import { useEffect, useState } from "react";
import { approveStation, getUnapprovedStations } from '@/lib/adminService';
import Station from "@/components/Station";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, Button, Text, View } from "react-native";

const ApproveStatons = () => {
    const [unapprovedStations, setUnapprovedStations] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadUnapprovedStations();
    }, []);

    const loadUnapprovedStations = async() => {
        setLoading(true);
        try {
            const stations = await getUnapprovedStations();
            setUnapprovedStations(stations)
        } catch (err) {
            Alert.alert("Unable to fetch unapproved stations")
        }
        setLoading(false);
    };

    const handleApproveStation = async(station_id: string) => {
        try {
            await approveStation(station_id);
            await loadUnapprovedStations();
        } catch (err) {
            Alert.alert("Unable to approve station")
        }
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView className="h-full bg-customWhite">
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View className="w-full px-4 my-6 flex-1 items-center">
                        <Text>Unapproved Stations:</Text>
                        
                        <View className="flex flex-grid flex-wrap">
                            {unapprovedStations.map((station: any) => {
                                return (
                                    <View className="p-8 border-2 border-black">
                                        <Station station={station}/>

                                        <View className="flex">
                                            <Button
                                                onPress={() => {
                                                    handleApproveStation(station._id)
                                                }}
                                                title="Approve"
                                                color="green"
                                            />
                                            <Button
                                                title="Deny"
                                                color="red"
                                                disabled={true}
                                            />
                                        </View>
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
};

export default ApproveStatons;