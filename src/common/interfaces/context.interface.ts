import { Scenes } from "telegraf";

export interface SessionContext {
    session: {
        username: string,
    };
};

export interface Context extends Scenes.SceneContext {}
