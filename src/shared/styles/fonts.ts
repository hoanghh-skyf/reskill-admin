import localFont from "next/font/local";

export const sinter = localFont({
  src: [
    {
      path: "../../../public/fonts/sinter/Sinter-Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../../public/fonts/sinter/Sinter-Thinitalic.otf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../../../public/fonts/sinter/Sinter-ExtraLight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../../public/fonts/sinter/Sinter-ExtraLightitalic.otf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../../../public/fonts/sinter/Sinter-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../../public/fonts/sinter/Sinter-Lightitalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../../public/fonts/sinter/Sinter-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/sinter/Sinter-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../../public/fonts/sinter/Sinter-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/sinter/Sinter-Mediumitalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../../public/fonts/sinter/Sinter-DemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../../public/fonts/sinter/Sinter-DemiBolditalic.otf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../../public/fonts/sinter/Sinter-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../../public/fonts/sinter/Sinter-Bolditalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../../public/fonts/sinter/Sinter-Black.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../../public/fonts/sinter/Sinter-Blackitalic.otf",
      weight: "900",
      style: "italic",
    },
    {
      path: "../../../public/fonts/sinter/Sinter-Ultra.otf",
      weight: "1000",
      style: "normal",
    },
    {
      path: "../../../public/fonts/sinter/Sinter-Ultraitalic.otf",
      weight: "1000",
      style: "italic",
    },
  ],
  variable: "--font-sinter",
  display: "swap",
  fallback: ["Inter", "sans-serif"],
});
