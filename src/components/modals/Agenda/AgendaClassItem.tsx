import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import { Avatar, Box, Card, CardContent, Tooltip, Typography, useTheme } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import React from "react";

import { hexWithOpacityToRgb } from "@/lib/utils/colorUtils";
import { ClassConfig } from "@/types/config";
import { RezervoClass } from "@/types/integration";

export type AgendaClass = {
    config: ClassConfig;
    _class: RezervoClass | undefined;
    markedForDeletion: boolean;
};

export default function AgendaClassItem({
    agendaClass,
    onSetToDelete,
    onInfo,
}: {
    agendaClass: AgendaClass;
    onSetToDelete: (toDelete: boolean) => void;
    onInfo: () => void;
}) {
    const theme = useTheme();

    const classColorRGB = (dark: boolean) =>
        agendaClass._class
            ? `rgb(${hexWithOpacityToRgb(
                  agendaClass._class.activity.color,
                  agendaClass.markedForDeletion ? 0.3 : 0.6,
                  dark ? 0 : 255,
              ).join(",")})`
            : agendaClass.markedForDeletion
            ? "#696969"
            : "#111";

    const displayName = agendaClass._class?.activity.name ?? agendaClass.config.display_name;

    function hoursAndMinutesToClockString(hours: number, minutes: number) {
        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    }

    const timeFrom = agendaClass._class?.startTime
        ? agendaClass._class.startTime.toFormat("HH:mm")
        : hoursAndMinutesToClockString(agendaClass.config.time.hour, agendaClass.config.time.minute);

    const timeTo = agendaClass._class?.endTime ? agendaClass._class.endTime.toFormat("HH:mm") : null;

    return (
        <Card
            sx={{
                position: "relative",
                borderLeft: `0.4rem solid ${classColorRGB(false)}`,
                backgroundColor: "white",
                '[data-mui-color-scheme="dark"] &': {
                    borderLeft: `0.4rem solid ${classColorRGB(true)}`,
                    backgroundColor: "#111",
                },
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background:
                        agendaClass._class === undefined
                            ? `repeating-linear-gradient(
                            -55deg,
                            ${theme.palette.background.default},
                            ${theme.palette.background.default} 10px,
                            ${theme.palette.background.paper} 10px,
                            ${theme.palette.background.paper} 20px)`
                            : undefined,
                }}
            >
                <CardContent
                    className={"unselectable"}
                    sx={{ paddingBottom: 2, opacity: agendaClass.markedForDeletion ? 0.3 : 1 }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                        }}
                    >
                        <Box>
                            <Typography sx={{ fontSize: "1.05rem" }}>{displayName}</Typography>
                            <Typography sx={{ fontSize: "0.85rem" }} variant="body2" color="text.secondary">
                                {`${timeFrom}${timeTo ? ` - ${timeTo}` : ""}`}
                            </Typography>
                            {agendaClass._class && (
                                <Typography sx={{ fontSize: "0.85rem" }} variant="body2" color="text.secondary">
                                    {agendaClass._class.location.studio}
                                </Typography>
                            )}
                            {agendaClass._class && (
                                <Typography sx={{ fontSize: "0.85rem" }} variant="body2" color="text.secondary">
                                    {agendaClass._class.instructors.join(", ")}
                                </Typography>
                            )}
                        </Box>
                        {agendaClass._class === undefined && (
                            <Tooltip title={"Spøkelsestime"}>
                                <Avatar
                                    alt={"Ghost class"}
                                    src={"/ghost.png"}
                                    sx={{
                                        width: 24,
                                        height: 24,
                                        marginLeft: 1,
                                    }}
                                />
                            </Tooltip>
                        )}
                    </Box>
                </CardContent>
                <Box sx={{ display: "flex", marginRight: 2 }}>
                    {agendaClass._class && (
                        <IconButton onClick={onInfo} size={"small"}>
                            <InfoOutlinedIcon />
                        </IconButton>
                    )}
                    {agendaClass.markedForDeletion ? (
                        <Tooltip title={"Angre sletting"}>
                            <IconButton onClick={() => onSetToDelete(false)} size={"small"}>
                                <RestoreFromTrashIcon />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <IconButton onClick={() => onSetToDelete(true)} size={"small"}>
                            <DeleteRoundedIcon />
                        </IconButton>
                    )}
                    {/*<IconButton onClick={onSettings} size={"small"}>*/}
                    {/*    <SettingsOutlinedIcon/>*/}
                    {/*</IconButton>*/}
                </Box>
            </Box>
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    width: "100%",
                    zIndex: -1,
                    backgroundColor: "white",
                    '[data-mui-color-scheme="dark"] &': {
                        backgroundColor: "#111",
                    },
                }}
            />
        </Card>
    );
}
