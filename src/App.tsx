import { AppBar, Box, Link, Toolbar, Typography } from '@mui/material';
import { FC } from 'react';
import { Link as RouterLinks, Navigate, Route, Routes } from 'react-router-dom';
import ProductsList from './Pages/Products/ProductsList';
import Cart from './Pages/Cart/Cart';

export interface IAppProps {
}

const App:FC<IAppProps> = (props:IAppProps) => {
  return ( <>

    {/* NAV BAR */}
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar style={{width:200}}>
                <Link component={RouterLinks} to="prodotti" style={{color:'white'}} sx={{ flexGrow: 1}}>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
                        Prodotti
                    </Typography>
                </Link>
            
                <Link component={RouterLinks} to="carrello" style={{color:'white'}} sx={{ flexGrow: 1}}>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
                        Carrello
                    </Typography>
                </Link>
            </Toolbar>
        </AppBar>
    </Box>

    {/* CONTENT */}
    <Routes>
        <Route path="/"  element={<Navigate to='/prodotti' />}/>
        <Route path="/prodotti" element={<ProductsList></ProductsList>} />
        <Route path="/carrello" element={<Cart></Cart>} />
    </Routes>
  </>
  );
}

export default App;
