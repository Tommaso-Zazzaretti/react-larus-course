import React, { FC, useEffect, useState } from 'react'
import { render, screen } from '@testing-library/react'

export interface IElement { "ID Nation": string, "ID Year": number, "Population": number }
export interface ComponentProps { }

const MyComponent:FC<ComponentProps> = (props:ComponentProps)=>{ 

    const [elements ,setElements ] = useState<Array<IElement>>([]);
    const [error,setError] = useState<string|undefined>(undefined);

    useEffect(()=>{
        fetch("https://datausa.io/api/data?drilldowns=Nation&measures=Population")
        .then(async (response:Response)=> (await response.json() as {data: Array<IElement> }).data)
        .then(elements=>setElements(elements)).catch((_)=> setError("Http call failed"))
    },[]);

    return <React.Fragment>
        {error!==undefined ? <p>{error}</p> : elements.map<JSX.Element>(e=>{
            const text = 'Year: '+e['ID Year']+" Population "+e['Population'];
            return <p key={text}>{text}</p>
        })}
    </React.Fragment> 
} 

test('Fetcher component test', async ()=>{
    render(<MyComponent/>)
    const elements = await screen.findAllByText((text)=>text==='Year: 2024 Population 2' || text==='Year: 2023 Population 1');
    expect<number>(elements.length).toBe<number>(2);
    const e1:HTMLElement|undefined = elements.find(e=>e.innerHTML==='Year: 2024 Population 2');
    const e2:HTMLElement|undefined = elements.find(e=>e.innerHTML==='Year: 2023 Population 1');
    expect(e1!==undefined).toBe(true); expect(e1).toBeInTheDocument();
    expect(e2!==undefined).toBe(true); expect(e2).toBeInTheDocument();
})




