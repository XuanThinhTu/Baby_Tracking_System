import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation"; // Thay đường dẫn đúng với dự án của bạn

export function useTypedRoute<T extends keyof RootStackParamList>(screenName: T) {
    return useRoute<RouteProp<RootStackParamList, T>>();
}
