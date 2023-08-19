export enum appServiceName {
    focusmanager = 'focusmanager',
}

export type appServiceMessage<T> = {
    command: appServiceName,
    payload: T
}
