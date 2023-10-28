import { extendTheme } from "native-base";

/**
 * Trong cac component co the dung useTheme
 */

export const colorTheme = {
  primary: {
    50: "#F3FDFF",
    100: "#D0F5FE",
    200: "#B0EBF9",
    300: "#94DFF2",
    400: "#7AD1E7",
    500: "#63C2D9",
    600: "#50B0C8",
    700: "#2E8196",
    800: "#154D5B",
    900: "#041418",
  },
  muted: {
    50: "#FAFAFA",
    100: "#F5F5F5",
    200: "#E5E5E5",
    300: "#D4D4D4",
    400: "#A3A3A3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
  },
  button: {
    600: "#F5F5F5",
    800: "#E5E5E5",
  },
};

const appTheme = extendTheme({
  colors: colorTheme,
  fontConfig: {
    NunitoSans: {
      200: {
        normal: "NunitoSans_200ExtraLight",
        italic: "NunitoSans_200ExtraLight_Italic",
      },
      300: {
        normal: "NunitoSans_300Light",
        italic: "NunitoSans_300Light_Italic",
      },
      400: {
        normal: "NunitoSans_400Regular",
        italic: "NunitoSans_400Regular_Italic",
      },
      500: {
        normal: "NunitoSans_400Regular",
        italic: "NunitoSans_400Regular_Italic",
      },
      600: {
        normal: "NunitoSans_600SemiBold",
        italic: "NunitoSans_600SemiBold_Italic",
      },
      700: {
        normal: "NunitoSans_700Bold",
        italic: "NunitoSans_700Bold_Italic",
      },
      800: {
        normal: "NunitoSans_800ExtraBold",
        italic: "NunitoSans_800ExtraBold_Italic",
      },
      900: {
        normal: "NunitoSans_900Black",
        italic: "NunitoSans_900Black_Italic",
      },
    },
  },
  fonts: {
    heading: "NunitoSans",
    body: "NunitoSans",
    mono: "NunitoSans",
  },
  // components: {
  //   Button: {
  //     baseStyle: ({ size }) => ({
  //       rounded: size,
  //     }),
  //     variants: {
  //       outline: ({ colorScheme }: any) => {
  //         return {
  //           bg: "white",
  //           borderColor: `${colorScheme}.600`,
  //           _hover: {
  //             bg: `${colorScheme}.600`,
  //           },
  //           _pressed: {
  //             bg: `${colorScheme}.100`,
  //           },
  //           _text: {
  //             color: `${colorScheme}.600`,
  //           },
  //         };
  //       },
  //     },
  //   },
  // },
});
export type AppThemeType = typeof appTheme;
declare module "native-base" {
  interface ICustomTheme extends AppThemeType {}
}
export default appTheme;
