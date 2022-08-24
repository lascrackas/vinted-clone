import {db} from '../firebase.js';
import { doc,query, updateDoc,collection,getDoc,increment, arrayUnion, arrayRemove, setDoc, getDocs } from "firebase/firestore";



export const  fetchArticles = async () => {
    const q = query(collection(db, "articles"));
    const querySnapshot = await getDocs(q);
    const articles =  querySnapshot.docs.map((doc)=>{return {...doc.data(),id:doc.id}});
    return articles;
}


export const likeArticle =  (articleId,userEmail) => {
    const docRef = doc(db, "articles", articleId);
      const userRef = doc(db,"users",userEmail);
      updateDoc(docRef, {
        likes:increment(1),
        likers:arrayUnion(userEmail)
      })
      return setDoc(userRef,{
        likedArticles:arrayUnion(articleId)
      },{merge:true});
}

export const unlikeArticle = (articleId,userEmail) => {
    const docRef = doc(db, "articles", articleId);
      const userRef = doc(db,"users",userEmail);
      updateDoc(docRef, {
        likes:increment(-1),
        likers:arrayRemove(userEmail)
      })
      return setDoc(userRef,{
        likedArticles:arrayRemove(articleId)
      },{merge:true});
}

export const getFavorites = async (userEmail) => {
    const user = await getDoc(doc(db,"users",userEmail));
    if(user.exists()){
        const likedArticlesRefs = user.data().likedArticles;
        const articles = [];
        await Promise.all(
            likedArticlesRefs.map((articleId)=> {
                return getDoc(doc(db,'articles',articleId)).then((article)=> {
                    articles.push({...article.data(),id:article.id})
                })
            })
        )
        return articles;
    }
}