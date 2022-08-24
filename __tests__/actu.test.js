import Actu from '../components/Actu';
import { render, waitFor } from '@testing-library/react';
import {fetchArticles} from '../services/articleService';


jest.mock("../services/articleService", ()=> {
    return {
        fetchArticles:jest.fn(),
        likeArticle:jest.fn(),
        unlikeArticle:jest.fn()
    }
});
jest.mock('../firebase',()=>  {
    return {
        db:jest.fn()
    }

})


it('should fetch articles', async ()=> {    
    render(<Actu />);
    await waitFor(()=> {expect(fetchArticles).toHaveBeenCalledTimes(1)})  

})