import { useNavigation, CommonActions } from '@react-navigation/native';

export const useRedirect = () => {
    const navigation = useNavigation();

    const redirectToHome = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'HomeTabs' }]
            })
        );
    };

    const redirectToLogin = () => {
        navigation.navigate('Login');
    };

    const redirectToRegister = () => {
        navigation.navigate('Register');
    };

    const goBack = () => {
        navigation.goBack();
    };

    const redirectToProfileDetail = (user: User) => {
        navigation.navigate("ProfileDetail", { user });
    }

    const redirectToMemberShips = () => {
        navigation.navigate("MemberShips");
    }

    const redirectToBabyDetail = (baby: Child) => {
        navigation.navigate("BabyDetail", { baby });
    }

    return {
        redirectToHome,
        redirectToLogin,
        redirectToRegister,
        redirectToProfileDetail,
        redirectToMemberShips,
        redirectToBabyDetail,
        goBack,
    };
};
