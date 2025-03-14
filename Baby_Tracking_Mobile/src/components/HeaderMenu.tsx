import React, { useState } from "react";
import { Menu, Divider } from "react-native-paper";
import { Image, TouchableOpacity } from "react-native";

interface HeaderMenuProps {
    actions: { label: string; onPress: () => void }[];
}

const HeaderMenu: React.FC<HeaderMenuProps> = ({ actions }) => {
    const [visible, setVisible] = useState(false);
    return (
        <Menu
            visible={visible}
            onDismiss={() => setVisible(false)}
            anchor={
                <TouchableOpacity onPress={() => setVisible(true)}>
                    <Image
                        source={require("../assets/icons/menu.png")}
                        style={{ width: 25, height: 25, marginRight: 10, tintColor: "white" }} // Sửa tintColor
                    />
                </TouchableOpacity>
            }
            contentStyle={{ marginTop: 80 }}
        >
            {actions.map((action, index) => (
                <React.Fragment key={index}>
                    <Menu.Item
                        onPress={() => {
                            setVisible(false); // Đóng menu khi chọn một mục
                            action.onPress();
                        }}
                        title={action.label}
                    />
                    {index !== actions.length - 1 && <Divider />}
                </React.Fragment>
            ))}
        </Menu>
    );
};

export default HeaderMenu;
