import React, { createContext, useContext, useState } from "react";

const VisitContext = createContext<any>(null);

export const VisitProvider = ({ children }: any) => {

const [visits,setVisits] = useState([
{
date:"Oct 24 2023",
time:"10:00 AM",
school:"Greenwood High",
district:"North District"
}
]);

/* NEW: current school for active visit */

const [currentSchool,setCurrentSchool] = useState<any>(null);

const addVisit = (visit:any)=>{
setVisits([...visits,visit])
}

return(

<VisitContext.Provider
value={{
visits,
addVisit,

/* NEW VALUES */

currentSchool,
setCurrentSchool
}}
>

{children}

</VisitContext.Provider>

)

}

export const useVisit = ()=>useContext(VisitContext)
export default VisitProvider;