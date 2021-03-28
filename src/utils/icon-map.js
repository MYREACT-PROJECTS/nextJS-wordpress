import * as SvgIconComponent from '../icons'


export const  getIconComponentByName = (name)=>{
    const componentsMap={
        facebook:SvgIconComponent.facebook,
        instagram:SvgIconComponent.instagram,
        linkedin:SvgIconComponent.linkedin,
    }
   
    if(name in componentsMap) {
        const IconComponent= componentsMap[name]
        return <IconComponent />
        
    }
    else {
        return null
    }
}