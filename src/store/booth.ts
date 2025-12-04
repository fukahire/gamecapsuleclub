import { defineStore } from 'pinia'

export const useBooth = defineStore('booth', {
    state: () => ({
        boothList: [
            {
                img: new URL('@/assets/booth/boothimg_sprite.png', import.meta.url).href,
                boothNum: 'B01',
                boothName: '大會攤',
                boothCount: 2,
                author: '遊戲膠囊康輔社',
                area: '',
                url: 'https://fukahire.github.io/gamecapsuleclub',
                index: 0,
                event: 1,
            },
            {
                img: new URL('@/assets/booth/boothimg_sprite.png', import.meta.url).href,
                boothNum: 'B04',
                boothName: '軟體鬧鐘',
                boothCount: 1,
                author: '魚翅',
                area: '網路空間',
                url: 'https://plurk.com/fukahire',
                index: 2,
                event: 2,
            },
            {
                img: new URL('@/assets/booth/boothimg_sprite.png', import.meta.url).href,
                boothNum: 'B03',
                boothName: '逆轉裁判',
                boothCount: 1,
                author: '眼蟲',
                area: '裁判庭',
                url: 'https://plurk.com/fukahire',
                index: 3,
                event: 4,
            },
            
        ],
    })
})