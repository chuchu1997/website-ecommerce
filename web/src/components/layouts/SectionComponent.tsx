

interface SectionComponentInterface { 
    children:React.ReactNode
    className?:string;

}

const SectionComponent = ({children,className="my-[20px]",...props}:SectionComponentInterface)=>{
    return <section className = {` ${className} ${props}`}>{children}</section>
}

export default SectionComponent;
