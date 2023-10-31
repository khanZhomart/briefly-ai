import { Scenes } from "telegraf";
import { HistoryMessage } from "./message.type";

export type SessionData = {
    history: HistoryMessage[],
    temp: {
        status: 'reading' | 'processing' | 'receiving' | 'ready',
        messageId: number,
    },
}

export type Session = {
    session: SessionData,
};

export type MessageDocument = {
    message: {
        document: {
            file_id: string,
            file_name: string,
            file_size: number,
            file_unique_id: string,
            mime_type: string,
        },
    },
}

export type Context = Session & Scenes.SceneContext

export type ContextDocument = Session & Scenes.SceneContext & MessageDocument
