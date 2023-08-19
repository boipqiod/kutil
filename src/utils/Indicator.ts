export class Indicator{

    static get instance(){
        if (!Indicator._instance) Indicator._instance = new Indicator()
        return Indicator._instance
    }
    private static _instance: Indicator
    private constructor() { }

    setIndicator = () =>{
        const loading = document.createElement('div')
        loading.id = 'indicator'
        loading.classList.add("indicator")
        document.body.appendChild(loading)
    }

    hideIndicator = () =>{
        document.getElementById('indicator')?.remove()
    }
}
