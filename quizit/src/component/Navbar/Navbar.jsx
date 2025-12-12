import { Link } from "react-router-dom"
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { Login } from "../../pages/Home/Login/Login";
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from "react-router-dom";
import { useQuiz } from "../../context/quizContext";
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isQuizPage = pathname === '/quiz';
  const location = useLocation();
  const  { quizDispatch,searchQuery} = useQuiz()
  const isHomePage = location.pathname === '/'
  const handleHomeClick = () => {
    navigate("/");
  }
  const handleSearchChange = (e) => {
    quizDispatch({
       type: "SEARCH_QUERY", 
       payload: e.target.value
    })
  }
  const handleLogout = () => {
    logout();
    navigate('/auth/login'); 
    quizDispatch ({
      type:"QUIT"
    })
  }
  const authSection = token ? (
    <>
    <Box sx={{ flexGrow: 1 }} /> 
    {!isQuizPage && (
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <Button
          color="inherit" 
          startIcon={<LogoutIcon />} 
          onClick={handleLogout} 
          sx={{ textTransform: 'none' }} 
        >
          Logout
        </Button>
      </Box>
    )}
    </>
  ) : (
    <>
    <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <Button
          color="inherit" 
          component={Link} 
          to="/auth/login" 
          startIcon={<AccountCircle />} 
          sx={{ textTransform: 'none' }}
        >
          Login
        </Button>
      </Box>
    </>
  )
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            QuizIt 
          </Typography>
          {isHomePage && ( 
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleSearchChange}
              value={searchQuery || ""}
            />
          </Search>
          )}
          <Typography
            variant="h8"
            noWrap
            component="div"
            onClick={handleHomeClick}
            sx={{ display: { xs: 'none', sm: 'block' },cursor: 'pointer',padding: '8px 12px',borderRadius: '4px','&:hover':{backgroundColor: 'rgba(255, 255, 255, 0.1)',},transition: 'background-color 0.3s ease', }}
          >
            Home
          </Typography>
         {authSection}
        </Toolbar>
      </AppBar>
    </Box>
  );
}