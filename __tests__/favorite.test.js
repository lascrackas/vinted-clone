import Favorite from '../components/Favorite';
import { render, waitFor } from '@testing-library/react';
import {getFavorites} from '../services/articleService';
import { SessionProvider } from 'next-auth/react';


jest.mock("../services/articleService", ()=> {
    return {
        getFavorites:jest.fn()
    }
});
jest.mock('../firebase',()=>  {
    return {
        db:jest.fn()
    }

})
const session = {
    user: {
      name: "mourad",
      email: "mouradaliouachene86@gmail.com",
      image: "image",
    },
    expires: Date.now()
  }


  describe("favorite component", ()=> {
  
    it('should fetch favorite articles',async()=> {
     render(<SessionProvider session={session}>
            <Favorite />
        </SessionProvider>
    )
      await waitFor(()=> {expect(getFavorites).toHaveBeenCalledTimes(1)})  
    })


    it('should fetch favorite articles',async()=> {
        getFavorites.mockClear();
        render(<SessionProvider session={session}>
               <Favorite />
           </SessionProvider>
       )
         await waitFor(()=> {expect(getFavorites).toHaveBeenCalledTimes(1)})  
       })


  })


