import { AppBar, Box, Link, Toolbar, Typography } from '@mui/material';
import { FC } from 'react';
import { Link as RouterLinks, Navigate, Route, Routes } from 'react-router-dom';
import Products from './Pages/Products/Products';
import Payment from './Pages/Payments/Payment';
import Login from './Pages/Login/Login';

export interface IAppProps {
}

/*
    Casi d'uso:

        Esercizi di Refactoring:

            * Accorpare logica react in comune: 
                useDebounceHook
            * Rimuovere logica non pertinente (non di rendering):
                getProductsService
        
        User Stories

            * Centralizzare logica di Login 
                (Observer => Provider/Redux)

            * Scrivere componente Generica per le chip lists 
                (Generic FC method) 
*/

const App:FC<IAppProps> = (props:IAppProps) => {
  return ( <>

    {/* NAV BAR */}
    <Box sx={{ flexGrow: 1, height:'60px', maxHeight:'60px' }}>
        <AppBar position="static" style={{display:'flex', justifyContent:'space-between', alignItems:'center', flexDirection:'row'}}>
            <Toolbar style={{width:210, height:'60px', maxHeight:'60px !important'}}>

                <Link component={RouterLinks} to="prodotti" style={{color:'white'}} sx={{ flexGrow: 1}}>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
                        Prodotti
                    </Typography>
                </Link>
            
                <Link component={RouterLinks} to="pagamento" style={{color:'white'}} sx={{ flexGrow: 1}}>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
                        Pagamento
                    </Typography>
                </Link>

            </Toolbar>

            <Toolbar style={{width:'auto', height:'60px', maxHeight:'60px !important'}}>
                <Link component={RouterLinks} to="login" style={{color:'white'}} sx={{ flexGrow: 1}}>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
                        Login
                    </Typography>
                </Link>
            </Toolbar>
        </AppBar>
    </Box>

    {/* CONTENT */}
    <Routes>
        <Route path="/"  element={<Navigate to='/login' />}/>
        <Route path="/login" element={<Login></Login>} />
        <Route path="/prodotti"  element={<Products></Products>} />
        <Route path="/pagamento" element={<Payment></Payment>} />
    </Routes>
  </>
  );
}

export default App;
