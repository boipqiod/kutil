export enum appServiceName {
    focusmanager = 'focusmanager',
}

export type appServiceMessage<T> = {
    appName: appServiceName,
    payload: T
}
