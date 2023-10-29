import { Scenes } from "telegraf";
import { HistoryMessage } from "./message.type";

type Session = {
    session: {
        history: HistoryMessage[],
    };
};

export type Context = Session & Scenes.SceneContext
