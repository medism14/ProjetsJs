import { Routes, Route } from 'react-router-dom';
import { Connexion, Inscription, Produit, ProduitAdd, ProduitEdit, Categorie, CategorieAdd, CategorieEdit } from './pages';
import { Footer, Header, NotFound, Loading } from "./components";
import { useEffect } from 'react';
import axios from 'axios';
import { loggedIn, actualUserSet } from './redux/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from './redux/features/htmlElementsSlice';

const App = () => {
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state) => state.user);
  const { loading } = useSelector(state => state.htmlElements);
  const info = useSelector((state) => state.user);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getCookie('access_token');

        if (token) {
          const response = await axios.get(`http://localhost:3000/auth/verifyToken/${token}`);

          if (response.status === 200) {
            const id = getCookie('id');

            if (id) {
                const userResponse = await axios.get(`http://localhost:3000/users/${id}`);
                dispatch(actualUserSet(userResponse.data));
            }
              dispatch(loggedIn(true));
          } else {
            dispatch(loggedIn(false));
          }
        } else {
          dispatch(loggedIn(false));
        }
        dispatch(setLoading(false));
      } catch (error) {
        console.error('Error fetching data:', error);
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, [dispatch]);

    if (loading) {
      return <div className="text-center"><Loading status="global"/></div>
    }

  return (
    <>
      <div className="min-w-full flex flex-col min-h-screen bg-[#989FCE] px-[40px] md:px-[80px] lg:px-[120px]">
            <Header 
              auth={isLoggedIn}
            />
          <Routes>
            {isLoggedIn ? (
              <>
                <Route path="/produits" element={<Produit />}></Route>
                <Route path="/categories" element={<Categorie />}></Route>

                {info.user.role == 0 && (
                  <>
                    <Route path="/produits/add" element={<ProduitAdd />}></Route>
                    <Route path="/produits/edit/:id" element={<ProduitEdit />}></Route>
                    <Route path="/categories/add" element={<CategorieAdd />}></Route>
                    <Route path="/categories/edit/:id" element={<CategorieEdit />}></Route>
                  </>
                )}
                
              </>
            ) : (
              <>
                <Route path="/" element={<Connexion />}></Route>
                <Route path="/inscription" element={<Inscription />}></Route>
              </>
            )}

            <Route path="*" element={<NotFound />}></Route>

          </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App;

