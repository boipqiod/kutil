// export class Audio{
//     private static shared: Audio
//     audioEle: HTMLAudioElement = document.createElement('audio')
//
//     constructor() {
//         if(Audio.shared) return Audio.shared
//         else {
//             document.body.append(this.audioEle)
//             this.audioEle.setAttribute('hidden', 'true')
//             Audio.shared = this
//         }
//     }
//
//     async play(sound: soundList){
//         switch (sound) {
//             case soundList.click:
//                 await this.click()
//                 return
//             case soundList.bell:
//                 await this.bell()
//                 return;
//         }
//     }
//
//     private async click(){
//         this.audioEle.src = `${this.baseUrl}/click.mp3`
//         this.audioEle.setAttribute('type', 'audio/mpeg')
//         await this.audioEle.play()
//     }
//     private async bell(){
//
//
//         this.audioEle.src = `${this.baseUrl}/bell.mp3`
//         this.audioEle.setAttribute('type', 'audio/mpeg')
//         await this.audioEle.play()
//     }
// }
const baseUrl = '../../public/assets/sound'

export enum soundList{
    click = `${baseUrl}/click.mp3`,
    bell = `${baseUrl}/bell.mp3`
}
