export enum appServiceName {
    focusmanager = 'focusmanager',
}

export type appServiceMessage<T> = {
    command: appServiceName,
    type: string,
    payload: T
}

export type focusmanagerInit = {
    isAuto: boolean,
    isPush: boolean,
    focusTime: number,
    relaxTime: number,
}

export type focusmanagerDisplay = {
    isFocus: boolean,
    runningTime: number,
}
