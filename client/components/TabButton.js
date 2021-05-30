import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { COLORS, FONTS } from "../constants";

const TabButton = ({ containerStyle, label, selected, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                alignItems: 'center',
                ...containerStyle
            }}
            onPress={onPress}
        >

            {/* text */}

            <Text
                style={{
                    color: selected ? COLORS.primary : COLORS.gray,
                    ...FONTS.body2,
                    fontSize: 18
                }}
            >
                {label}
            </Text>

            {/* line */}

            <View
                style={{
                    marginTop: selected ? 3 : 4,
                    height: selected ? 4 : 2,
                    width: "100%",
                    backgroundColor: selected ? COLORS.primary : COLORS.gray
                }}
            />

        </TouchableOpacity>
    )
}

export default TabButton;