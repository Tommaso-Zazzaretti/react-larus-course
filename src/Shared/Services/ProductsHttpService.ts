import { IProduct } from "../../Models/Product";
import { IUser } from "../../Models/User";

export class ProductsHttpService {

    // Logic
    public getProductsHttpCallAsync = ():Promise<Array<IProduct>> => {
        // Simulate Backend Fetch Data Http Call ... NO rendering logic here
        const SIMULATE_HTTP_CALL_MSEC = 2*100; // 2 Sec
        return new Promise((resolve,reject)=>{
            const backendProducts:Array<IProduct> = Array<IProduct>(
                {
                    id:'0',
                    name:'NN Deep Tensor',
                    url: 'https://cdn.vectorstock.com/i/1000x1000/39/60/neural-net-neuron-network-vector-10723960.webp',
                    price: 1500,
                    users: new Array<IUser>(
                        {name: 'Marco'  , surname: 'Petrini' , rating: 5},
                        {name: 'Roberto', surname: 'Sannino' , rating: 5},
                        {name: 'Daniele', surname: 'Vendrame', rating: 5}
                    )
                },
                {
                    id:'1',
                    name:'Maglietta Inter',
                    url: 'https://www.picclickimg.com/xt0AAOSwJTRhUvAd/Maglia-INTER-2021-2022-maglietta-con-patch-scudetto.webp',
                    price: 98.99,
                    users: new Array<IUser>(
                        {name: 'Leonardo', surname: 'Marrancone', rating: 5},
                        {name: 'Rosario' , surname: 'Borgesi'   , rating: 5},
                        {name: 'Luca'    , surname: 'Marignati' , rating: 5},
                    )
                },
                {
                    id:'2',
                    name:'Ibanez Guitar',
                    url: 'https://cdn.shopify.com/s/files/1/0573/5386/3220/files/IBANEZ-RGR221PA--GIO---Aqua-Burst-2_1000x_5ee7151a-c390-464e-880b-b1d59b7b2458_480x480.jpg?v=1683603938',
                    price: 548.99,
                    users: new Array<IUser>(
                        {name: 'Tommaso', surname: 'Zazzaretti' , rating: 5}
                    )
                }
            ) 
            setTimeout(()=>{resolve(backendProducts)},SIMULATE_HTTP_CALL_MSEC);
        })
    }
}