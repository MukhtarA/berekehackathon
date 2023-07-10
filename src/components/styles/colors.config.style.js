import { memoize } from 'lodash'
/* Новая палитра. Использовать только эти цвета */
/* НЕ ДОБАВЛЯТЬ НОВЫХ! */

const HEX_RADIX = 16

const parseHex = (hex) => parseInt(hex, HEX_RADIX)

/* Calc rgba from hex value*/
export const hex2rgba = memoize((hex, alpha = 100) => {
    const cHex = hex.replace('#', '')
    const isShortHex = cHex.length === 3

    const r = parseHex(isShortHex ? `${cHex[0]}${cHex[0]}` : `${cHex[0]}${cHex[1]}`)
    const g = parseHex(isShortHex ? `${cHex[1]}${cHex[1]}` : `${cHex[2]}${cHex[3]}`)
    const b = parseHex(isShortHex ? `${cHex[2]}${cHex[2]}` : `${cHex[4]}${cHex[5]}`)

    if (Number.isInteger(alpha) && alpha > 0 && alpha <= 100) {
        return `rgba(${r}, ${g}, ${b}, ${alpha / 100})`
    } else if (alpha === 0) {
        return `rgba(${r}, ${g}, ${b}, ${alpha})`
    }

    return `rgb(${r}, ${g}, ${b})`
}, (hex, alpha = 100) => `${hex}_${alpha}`)

/* RED */

export const red9 = '#120809'
export const red85 = '#2E090D'
export const red8 = '#4A0D13'
export const red75 = '#6B1019'
export const red7 = '#9C1422'
export const red6 = '#E31227'
export const red5 = '#F31B31'
export const red4 = '#FF2E43'
export const red3 = '#FF4D5E'
export const red2 = '#FD96A0'
export const red15 = '#FDB5BC'
export const red1 = '#FECDD2'
export const red05 = '#FFE0E3'
export const red0 = '#FFF5F6'

/* ORANGE */

export const orange9 = '#100904'
export const orange85 = '#291408'
export const orange8 = '#3D1D0A'
export const orange75 = '#5C2709'
export const orange7 = '#85380C'
export const orange6 = '#D14D00'
export const orange5 = '#E35502'
export const orange4 = '#F55D05'
export const orange3 = '#FA6D20'
export const orange2 = '#FA9D6B'
export const orange15 = '#FBB793'
export const orange1 = '#FDD1B9'
export const orange05 = '#FEE1D2'
export const orange0 = '#FFF5F0'

/* AMBER */

export const amber9 = '#0F0A01'
export const amber85 = '#211807'
export const amber8 = '#332200'
export const amber75 = '#493203'
export const amber7 = '#694907'
export const amber6 = '#A16B00'
export const amber5 = '#AF7604'
export const amber4 = '#BB7F07'
export const amber3 = '#CC8800'
export const amber2 = '#F2A405'
export const amber15 = '#FCBC3D'
export const amber1 = '#FED685'
export const amber05 = '#FFE4AE'
export const amber0 = '#FFF7E6'

/* YELLOW */

export const yellow9 = '#0D0B03'
export const yellow85 = '#1F1903'
export const yellow8 = '#2B2408'
export const yellow75 = '#403507'
export const yellow7 = '#5E4D08'
export const yellow6 = '#8F7200'
export const yellow5 = '#997B06'
export const yellow4 = '#A68503'
export const yellow3 = '#B79201'
export const yellow2 = '#DBAF00'
export const yellow15 = '#F2C202'
export const yellow1 = '#FFD83D'
export const yellow05 = '#FFE88A'
export const yellow0 = '#FFF7D6'

/* SUNNY */

export const sunny9 = '#0C0B04'
export const sunny85 = '#1C1B03'
export const sunny8 = '#28260B'
export const sunny75 = '#39370F'
export const sunny7 = '#55510C'
export const sunny6 = '#7B7609'
export const sunny5 = '#847E0B'
export const sunny4 = '#918A0D'
export const sunny3 = '#A29A07'
export const sunny2 = '#BFB607'
export const sunny15 = '#D6CB00'
export const sunny1 = '#EBDF00'
export const sunny05 = '#FAED05'
export const sunny0 = '#FCFACA'

/* LIME */

export const lime9 = '#080A05'
export const lime85 = '#151C08'
export const lime8 = '#1E290A'
export const lime75 = '#2B3C0B'
export const lime7 = '#3C570A'
export const lime6 = '#567D0C'
export const lime5 = '#588604'
export const lime4 = '#629405'
export const lime3 = '#6FA706'
export const lime2 = '#81C600'
export const lime15 = '#96DD12'
export const lime1 = '#A8EF25'
export const lime05 = '#C5F768'
export const lime0 = '#EEFCD4'

/* HERBAL */

export const herbal9 = '#050A05'
export const herbal85 = '#071F07'
export const herbal8 = '#082B08'
export const herbal75 = '#084008'
export const herbal7 = '#055C05'
export const herbal6 = '#108210'
export const herbal5 = '#0B8C0B'
export const herbal4 = '#0C9C0C'
export const herbal3 = '#15B015'
export const herbal2 = '#15D015'
export const herbal15 = '#2EE82E'
export const herbal1 = '#5EF75E'
export const herbal05 = '#97FC97'
export const herbal0 = '#E0FFE0'

/* GREEN / SBER */

export const green9 = '#050A06'
export const green85 = '#071F0C'
export const green8 = '#0A2B10'
export const green75 = '#0A4014'
export const green7 = '#095C18'
export const green6 = '#0D8523'
export const green5 = '#148F2B'
export const green4 = '#21A038'
export const green3 = '#24B23E'
export const green2 = '#15D13B'
export const green15 = '#2AE853'
export const green1 = '#62F582'
export const green05 = '#92FCAB'
export const green0 = '#E0FFE9'

/* TEAL */

export const teal9 = '#040A08'
export const teal85 = '#041F17'
export const teal8 = '#072B21'
export const teal75 = '#093E2F'
export const teal7 = '#0E5944'
export const teal6 = '#197D61'
export const teal5 = '#0A8A66'
export const teal4 = '#05996F'
export const teal3 = '#00AC7B'
export const teal2 = '#0CCC96'
export const teal15 = '#1BE3A9'
export const teal1 = '#31F5BD'
export const teal05 = '#7EFCD9'
export const teal0 = '#DBFFF5'

/* AQUA */

export const aqua9 = '#040A0A'
export const aqua85 = '#0A1C1C'
export const aqua8 = '#0D2A2B'
export const aqua75 = '#0A3D3D'
export const aqua7 = '#0C585A'
export const aqua6 = '#007D80'
export const aqua5 = '#0C8688'
export const aqua4 = '#0C9597'
export const aqua3 = '#0DA8AB'
export const aqua2 = '#04C6C9'
export const aqua15 = '#00DDE0'
export const aqua1 = '#18EFF2'
export const aqua05 = '#82F8FA'
export const aqua0 = '#E6FCFC'

/* SKY BLUE */

export const skyBlue9 = '#020B0D'
export const skyBlue85 = '#061B21'
export const skyBlue8 = '#052933'
export const skyBlue75 = '#073C4B'
export const skyBlue7 = '#04566C'
export const skyBlue6 = '#007899'
export const skyBlue5 = '#0382A6'
export const skyBlue4 = '#0492B9'
export const skyBlue3 = '#00A4D1'
export const skyBlue2 = '#05C1F5'
export const skyBlue15 = '#4AD6FC'
export const skyBlue1 = '#8AE6FF'
export const skyBlue05 = '#B8F0FF'
export const skyBlue0 = '#E8FAFF'

/* BLUE */

export const blue9 = '#030A0E'
export const blue85 = '#0A1924'
export const blue8 = '#0C283B'
export const blue75 = '#0E3A58'
export const blue7 = '#0E5381'
export const blue6 = '#1274B5'
export const blue5 = '#067DCC'
export const blue4 = '#078BE4'
export const blue3 = '#129DFA'
export const blue2 = '#52BAFF'
export const blue15 = '#85CEFF'
export const blue1 = '#B0DFFF'
export const blue05 = '#CFECFF'
export const blue0 = '#EDF8FF'

/* ELECTRIC BLUE */

export const electricBlue9 = '#010712'
export const electricBlue85 = '#0A162B'
export const electricBlue8 = '#082254'
export const electricBlue75 = '#0C327A'
export const electricBlue7 = '#1549AB'
export const electricBlue6 = '#2969E3'
export const electricBlue5 = '#2A72F8'
export const electricBlue4 = '#3F81FD'
export const electricBlue3 = '#5993FF'
export const electricBlue2 = '#8BB2FC'
export const electricBlue15 = '#A9C7FE'
export const electricBlue1 = '#C7DAFF'
export const electricBlue05 = '#DEE9FF'
export const electricBlue0 = '#F2F7FF'


/* VIOLET */

export const violet9 = '#0B080D'
export const violet85 = '#200F2B'
export const violet8 = '#36154C'
export const violet75 = '#501A74'
export const violet7 = '#722BA1'
export const violet6 = '#A139E5'
export const violet5 = '#AD42F5'
export const violet4 = '#B559F3'
export const violet3 = '#C370FA'
export const violet2 = '#D39CF7'
export const violet15 = '#DEB7F7'
export const violet1 = '#EAD0FB'
export const violet05 = '#F4E3FF'
export const violet0 = '#FBF5FF'

/* PURPLE */

export const purple9 = '#0D050B'
export const purple85 = '#260C22'
export const purple8 = '#401639'
export const purple75 = '#5C1A51'
export const purple7 = '#8A2178'
export const purple6 = '#BF22A5'
export const purple5 = '#DB23BD'
export const purple4 = '#EB2ACB'
export const purple3 = '#FA4BDD'
export const purple2 = '#FF87EB'
export const purple15 = '#FFABF1'
export const purple1 = '#FFC9F6'
export const purple05 = '#FFE0FA'
export const purple0 = '#FFF0FC'

/* PINK */

export const pink9 = '#0D080A'
export const pink85 = '#2B0A17'
export const pink8 = '#4B0B25'
export const pink75 = '#6C0931'
export const pink7 = '#9B0D46'
export const pink6 = '#DB0D60'
export const pink5 = '#F00563'
export const pink4 = '#FF1F78'
export const pink3 = '#FF5297'
export const pink2 = '#FF8FBC'
export const pink15 = '#FCB1CF'
export const pink1 = '#FDCEE1'
export const pink05 = '#FDE3ED'
export const pink0 = '#FFF5F9'

/* GRAY */

export const gray9 = '#080808'
export const gray85 = '#171717'
export const gray8 = '#262626'
export const gray75 = '#363636'
export const gray7 = '#4E4E4E'
export const gray6 = '#707070'
export const gray5 = '#7A7A7A'
export const gray4 = '#858585'
export const gray3 = '#949494'
export const gray2 = '#B2B2B2'
export const gray15 = '#C7C7C7'
export const gray1 = '#DCDCDC'
export const gray05 = '#E8E8E8'
export const gray0 = '#F5F5F5'

/* GRAY ALPHA */

export const gray0A = hex2rgba(gray8, 0)
export const gray4A = hex2rgba(gray8, 4)
export const gray8A = hex2rgba(gray8, 8)
export const gray12A = hex2rgba(gray8, 12)
export const gray16A = hex2rgba(gray8, 16)
export const gray24A = hex2rgba(gray8, 24)
export const gray40A = hex2rgba(gray8, 40)
export const gray55A = hex2rgba(gray8, 55)
export const gray60A = hex2rgba(gray8, 60)
export const gray70A = hex2rgba(gray8, 70)

/* COOl GRAY */

export const coolGray9 = '#08090A'
export const coolGray85 = '#15181A'
export const coolGray8 = '#24282B'
export const coolGray75 = '#31373B'
export const coolGray7 = '#494F54'
export const coolGray6 = '#677178'
export const coolGray5 = '#727B82'
export const coolGray4 = '#7D868C'
export const coolGray3 = '#8C959C'
export const coolGray2 = '#A8B4BD'
export const coolGray15 = '#BEC9D1'
export const coolGray1 = '#D1DDE5'
export const coolGray05 = '#E4EBF0'
export const coolGray0 = '#F2F5F7'

/* GRAPHITE */
export const graphite9 = '#121212'
export const graphite8 = '#1e1e1e'
export const graphite7 = '#222222'
export const graphite6 = '#242424'
export const graphite5 = '#272727'
export const graphite4 = '#2c2c2c'
export const graphite3 = '#2e2e2e'
export const graphite2 = '#323232'
export const graphite1 = '#353535'
export const graphite0 = '#383838'

/* WHITE */
export const white = '#ffffff'

/* WHITE ALPHA */
export const white0A = hex2rgba(white, 0)
export const white4A = hex2rgba(white, 4)
export const white8A = hex2rgba(white, 8)
export const white12A = hex2rgba(white, 12)
export const white16A = hex2rgba(white, 16)
export const white24A = hex2rgba(white, 24)
export const white40A = hex2rgba(white, 40)
export const white55A = hex2rgba(white, 55)
export const white60A = hex2rgba(white, 60)
export const white70A = hex2rgba(white, 70)

/* BLACK */
export const black = '#000000'
