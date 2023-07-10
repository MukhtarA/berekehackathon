import React from 'react'

import { SocialsWrapperStyled, SocialStyled, LinkStyled } from './footer.style'

// import twitter from '../assets/twitter.svg'
// import youtube from '../assets/youtube.svg'
import facebook from '../assets/facebook.svg'
import telegram from '../assets/telegram.svg'
import vk from '../assets/vk.svg'
import instagram from '../assets/instagram.svg'

const socials = [
    {
        href: 'https://www.facebook.com/berekebank.kz',
        icon: facebook,
        id: 'fb'
    },
    {
        href: 'https://t.me/berekebank_kz',
        icon: telegram,
        id: 'telegram'
    },
    {
        href: 'https://vk.com/berekebank/',
        icon: vk,
        id: 'vk'
    },
    {
        href: 'https://instagram.com/berekebank/',
        icon: instagram,
        id: 'instagram'
    }
    // {
    //     href: 'https://twitter.com/sberbankkz?lang=ru/',
    //     icon: twitter,
    //     id: 'twitter'
    // },
    // {
    //     href: 'https://www.youtube.com/user/sberbankkz/',
    //     icon: youtube,
    //     id: 'youtube'
    // }
]

export default () => (
    <SocialsWrapperStyled>
        <SocialStyled>
            {socials.map((item) => (
                <LinkStyled
                    key={item.id}
                    title={item.id}
                    target=" _blank"
                    rel="noopener noreferrer"
                    href={item.href}
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: item.icon }}
                />
            ))}
        </SocialStyled>
    </SocialsWrapperStyled>
)
