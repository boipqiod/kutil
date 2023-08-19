export class FocusManagerSW {

    static get instance(): FocusManagerSW {
        if (FocusManagerSW.shared)
            return FocusManagerSW.shared
        else {
            FocusManagerSW.shared = new FocusManagerSW()
            return FocusManagerSW.shared
        }
    }

    private static shared: FocusManagerSW

    client: MessagePort | ServiceWorker | Client | undefined
    timer!: NodeJS.Timer

    private constructor() {}

    setClient = (client: MessagePort | ServiceWorker | Client) => {
        this.client = client
    }

    startSend = () => {
        this.timer = setInterval(() => {
            this.client.postMessage('tick')
        }, 1000)
    }

    endSend = () => {
        clearInterval(this.timer)
    }

}
