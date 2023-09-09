import "@/styles/globals.css";
import "@/styles/animations.css";
import "@/components/schedule/class/ClassCard.css";

import { UserProvider } from "@auth0/nextjs-auth0/client";
import { CssBaseline, Experimental_CssVarsProvider as CssVarsProvider, experimental_extendTheme } from "@mui/material";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { TypeBackground } from "@mui/material/styles/createPalette";
import type { AppProps } from "next/app";
import React from "react";

declare module "@mui/material/styles/createPalette" {
    interface Palette {
        secondaryBackground: Partial<TypeBackground>;
    }

    interface PaletteOptions {
        secondaryBackground?: Partial<TypeBackground>;
    }
}

const theme = experimental_extendTheme({
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    light: "#6fbf73",
                    main: "#4caf50",
                    dark: "#357a38",
                    contrastText: "#000",
                },
                secondary: {
                    light: "#ff7961",
                    main: "#f44336",
                    dark: "#ba000d",
                    contrastText: "#fff",
                },
                background: {
                    default: "#fff",
                    paper: "#eee",
                },
                secondaryBackground: {
                    default: "#eee",
                    paper: "#ddd",
                },
            },
        },
        dark: {
            palette: {
                primary: {
                    light: "#6fbf73",
                    main: "#4caf50",
                    dark: "#357a38",
                    contrastText: "#fff",
                },
                secondary: {
                    light: "#ff7961",
                    main: "#f44336",
                    dark: "#ba000d",
                    contrastText: "#fff",
                },
                background: {
                    default: "#000",
                    paper: "#111",
                },
                secondaryBackground: {
                    default: "#212121",
                    paper: "#222",
                },
            },
        },
    },
});

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <CssVarsProvider theme={theme} defaultMode={"system"}>
            <CssBaseline enableColorScheme />
            <UserProvider>
                <Component {...pageProps} />
            </UserProvider>
        </CssVarsProvider>
    );
}

export default MyApp;
