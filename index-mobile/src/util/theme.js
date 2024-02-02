const lightTheme = {
    background: '#F0F0F0', 
    text: '#262626', 
    subText: '#6D6D6D', 
    primary: '#394F7A', 
    secondary: '#CCCCCC', 
    buttonBackground: '#394F7A', 
    buttonText: '#FFFFFF', 
    inputBackground: '#FFFFFF', 
    inputBorder: '#CCCCCC',
    activeDot: 'black'
  };
  
  const darkTheme = {
    background: '#1B1B1B',
    text: '#F0F0F0',
    subText: '#A3A3A3', 
    primary: 'white', 
    secondary: '#333333', 
    buttonBackground: 'white',
    buttonText: 'black', 
    inputBackground: '#262626', 
    inputBorder: '#333333',
    activeDot: 'white'
  };
  

export default theme = mode => (mode === "light" ? lightTheme : darkTheme)


