import avatar0 from '../assets/defaultAvatars/0.png'
import avatar1 from '../assets/defaultAvatars/1.png'
import avatar2 from '../assets/defaultAvatars/2.png'
import avatar3 from '../assets/defaultAvatars/3.png'
import avatar4 from '../assets/defaultAvatars/4.png'
import avatar5 from '../assets/defaultAvatars/5.png'
import avatar6 from '../assets/defaultAvatars/6.png'
import avatar7 from '../assets/defaultAvatars/7.png'
import avatar8 from '../assets/defaultAvatars/8.png'
import avatar9 from '../assets/defaultAvatars/9.png'
import avatara from '../assets/defaultAvatars/a.png'
import avatarb from '../assets/defaultAvatars/b.png'
import avatarc from '../assets/defaultAvatars/c.png'
import avatard from '../assets/defaultAvatars/d.png'
import avatare from '../assets/defaultAvatars/e.png'
import avatarf from '../assets/defaultAvatars/f.png'

import logo0 from '../assets/defaultLogos/0.png'
import logo1 from '../assets/defaultLogos/1.png'
import logo2 from '../assets/defaultLogos/2.png'
import logo3 from '../assets/defaultLogos/3.png'
import logo4 from '../assets/defaultLogos/4.png'
import logo5 from '../assets/defaultLogos/5.png'
import logo6 from '../assets/defaultLogos/6.png'
import logo7 from '../assets/defaultLogos/7.png'
import logo8 from '../assets/defaultLogos/8.png'
import logo9 from '../assets/defaultLogos/9.png'
import logoa from '../assets/defaultLogos/a.png'
import logob from '../assets/defaultLogos/b.png'
import logoc from '../assets/defaultLogos/c.png'
import logod from '../assets/defaultLogos/d.png'
import logoe from '../assets/defaultLogos/e.png'
import logof from '../assets/defaultLogos/f.png'


const avatars = {
    "0": avatar0,
    "1": avatar1,
    "2": avatar2,
    "3": avatar3,
    "4": avatar4,
    "5": avatar5,
    "6": avatar6,
    "7": avatar7,
    "8": avatar8,
    "9": avatar9,
    "a": avatara,
    "b": avatarb,
    "c": avatarc,
    "d": avatard,
    "e": avatare,
    "f": avatarf,
}

const logos = {
    "0": logo0,
    "1": logo1,
    "2": logo2,
    "3": logo3,
    "4": logo4,
    "5": logo5,
    "6": logo6,
    "7": logo7,
    "8": logo8,
    "9": logo9,
    "a": logoa,
    "b": logob,
    "c": logoc,
    "d": logod,
    "e": logoe,
    "f": logof,
}

export const getDefAv = (uuid) => {
    return <img src={avatars[uuid.substr(0, 1)]} width={16} height={16}/>
}

export const getDefLg = (uuid) => {
    return <img src={logos[uuid.substr(0, 1)]} width={16} height={16}/>
}