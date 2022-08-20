const { render,screen } = require("@testing-library/react")
import Header from '../components/Header';
import '@testing-library/jest-dom'
import { RecoilRoot } from 'recoil';


test('should show login buttons when user is not logged in ',()=> {
    render(<RecoilRoot><Header /></RecoilRoot>)
    const LoginButtons = screen.getByTestId("login-buttons");
    expect(LoginButtons).toBeVisible();
})

test('should not show login buttons when user is logged in ',()=> {
    const user = {
        username:"mourad",
        image:"/img/logo.png",
        email:"mouradaliouachene86@gmail.com"
    }
    render(<RecoilRoot><Header user={user}/></RecoilRoot>)
    const LoginButtons = screen.queryByTestId("login-buttons");
    expect(LoginButtons).toBeNull();
})


test('should not show menu when user is not logged in ',()=> {
    render(<RecoilRoot><Header /></RecoilRoot>)
    const menu = screen.queryByTestId("menu");
    expect(menu).toBeNull();
})

test('should show menu when user is logged in ',()=> {
    const user = {
        username:"mourad",
        image:"/img/logo.png",
        email:"mouradaliouachene86@gmail.com"
    }
    render(<RecoilRoot><Header user={user}/></RecoilRoot>)
    const menu = screen.queryByTestId("menu");
    expect(menu).toBeVisible();
})
