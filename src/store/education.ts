import { defineStore } from 'pinia'

export const useEducation = defineStore('education', {
    state: () => ({
        station: [
            {
                img: 'education/hikari.png',
                sprite: 'sprite/netto.png',
                name: '光熱斗&洛克人.exe',
                position: '電腦老師',
                description: '偶然來學園兼職的電腦老師光熱斗跟他的網路領航員洛克人.exe。即便成為老師仍然天天遲到，今天也會活力十足的教大家使用網路對戰清除病毒！',
                origin: '洛克人EXE系列',
                index: 0,
            },
            {
                img: 'education/example2.jpg',
                sprite: 'sprite/mitsurugi.png',
                name: '御劍怜侍',
                position: '辯論社客座講師',
                description: '享譽大名的檢察官，御劍怜侍。這次特別受邀來到學園，擔任辯論社的客座講師。雖然平常總是一副冷酷的樣子，但其實內心非常關心學生們的成長。',
                origin: '逆轉檢事系列',
                index: 1,
            }
            
        ],
        navlink: [
            {
                title: '比賽章程',
                link:'#theme'
            },
        ],
        date: [
          {
            txt:{
                date: '1/08 - ',
                start: '敬請期待',
                goon: '比賽公布',
                end: '比賽資訊公布',
            },
            start: Date.parse('08 Jan 2024 00:00:00'),
            end: Date.parse('09 Jan 2024 12:30:00'),
            url: '/picnic2',
          },
        ],
        member: [
          {
            title:'拍立得獎',
            luckysquid: '檸朦、帽子',
            image: 'prize/picnic-b/2A.jpg',
          },
        ]
    })
})